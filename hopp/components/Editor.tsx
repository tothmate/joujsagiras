import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { basePath } from "../next.config";
import {
  capitalizeFirstLetter,
  getDescriptiveTitle,
  getLocallizedDateString,
  getLanguageFromSlug,
  getUrlForSticker,
  isValidUrl,
  track,
  updateSticker
} from "../src/helpers";
import { emptySticker, GeneratorMode, Reason, Sticker, StickerStore } from "../src/models";
import Arrow from "./Arrow";
import Preview from "./Preview";
import ShareBox from "./ShareBox";

enum Step {
  INITIAL = 1,
  URL_LOADING,
  URL_ERROR,
  URL_LOADED,
  REASON_SELECTED,
  SAVING,
  SAVE_ERROR,
  SAVED,
}

export default function Editor(props: { store: StickerStore }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [reasons, setReasons] = useState<Reason[]>([]);
  const [sticker, setSticker] = useState<Sticker>(emptySticker);
  const [step, setStep] = useState<Step>(Step.INITIAL);
  const [urlCandidate, setUrlCandidate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleUrlSubmitted = useCallback(async () => {
    setStep(Step.URL_LOADING);
    if (!isValidUrl(urlCandidate)) {
      setStep(Step.URL_ERROR);
      return;
    }

    const response = await fetch(`${basePath}/api/fetch-opengraph-data?url=${urlCandidate}`);
    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.image && !isValidUrl(data.image) ? new URL(urlCandidate).origin + data.image : data.image;

      const newSource = {
        url: urlCandidate,
        title: data.title,
        date: getLocallizedDateString(DateTime.now()),
        image: imageUrl,
      };
      setSticker((sticker) => updateSticker(sticker, { source: newSource }));
      setStep(Step.URL_LOADED);
      setErrorMessage(undefined);
      track("submit-url", "click");
    } else {
      setStep(Step.URL_ERROR);
      setErrorMessage(t("error.url-load"));
      track("submit-url", "error");
    }
  }, [urlCandidate, t]);

  const handleReasonChanged = useCallback(
    (value: string) => {
      const newReason = reasons.find((r) => value === r.slug);
      if (newReason !== undefined) {
        setSticker((sticker) =>
          updateSticker(sticker, {
            reason: newReason,
            explanation:
              sticker.explanation == sticker.reason.defaultExplanation
                ? newReason.defaultExplanation
                : sticker.explanation,
          })
        );
        setStep(Step.REASON_SELECTED);
        track("select-reason", "click");
      }
    },
    [reasons]
  );

  const handleExplanationChanged = useCallback((value: string) => {
    setSticker((sticker) => updateSticker(sticker, { explanation: value }));
  }, []);

  const handleStickerDone = useCallback(async () => {
    setStep(Step.SAVING);
    const result = await props.store.save(sticker);
    result.match(
      (stickerId) => {
        const newSticker = updateSticker(sticker, { id: stickerId });
        setSticker(newSticker);
        setStep(Step.SAVED);
        fetch(getUrlForSticker(newSticker, GeneratorMode.Jpg));
        fetch(getUrlForSticker(newSticker, GeneratorMode.Share));
        track("save-sticker", "click");
      },
      (error) => {
        setStep(Step.SAVE_ERROR);
        setErrorMessage(t("error.save", { error: error?.message }));
        track("save-sticker", "error");
      }
    );
  }, [props.store, sticker, t]);

  useEffect(() => {
    if (step === Step.SAVED) {
      history.pushState({}, "", getUrlForSticker(sticker, GeneratorMode.Share));
    }
  }, [step, sticker]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as === `${router.basePath}${router.pathname}`) {
        setStep(Step.INITIAL);
        return false;
      }
      return true;
    });
  }, [router]);

  useEffect(() => {
    const loadReasons = async () => {
      const result = await props.store.loadReasons(i18n.language);
      result.match(
        (reasons) => {
          setReasons(reasons);
        },
        (error) => {
          setErrorMessage(t("error.load", { error: error?.message }));
          track("load-reasons", "error");
        }
      );
    };
    loadReasons();
  }, [i18n.language, props.store, t]);

  useEffect(() => {
    if (router.query["url"]) {
      setUrlCandidate(router.query["url"] as string);
      router.replace(router.route);
      handleUrlSubmitted();
    }
  }, [handleUrlSubmitted, router, router.query]);

  return (
    <>
      <Head>
        <title>{getDescriptiveTitle(sticker.reason.text, getLanguageFromSlug(sticker.reason.slug))}</title>
      </Head>

      <Snackbar open={errorMessage !== undefined} autoHideDuration={6000} onClose={() => setErrorMessage(undefined)}>
        <Alert severity="error">HOPP! {errorMessage}</Alert>
      </Snackbar>

      <Collapse in={step < Step.URL_LOADED}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUrlSubmitted();
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h1" gutterBottom>
                {t("step1.title")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("step1.description1")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("step1.description2")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                label={t("step1.url-placeholder")}
                color="secondary"
                fullWidth
                error={step === Step.URL_ERROR}
                value={urlCandidate}
                onChange={(e) => setUrlCandidate(e.target.value as string)}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <LoadingButton
                type="submit"
                loading={step === Step.URL_LOADING}
                variant="contained"
                color="primary"
                fullWidth
              >
                {t("step1.next")}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Collapse>

      <Collapse in={step >= Step.URL_LOADED}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            {step >= Step.URL_LOADED && <Preview sticker={sticker} useCanvas />}
          </Grid>
          <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
            <Arrow />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Collapse in={step < Step.SAVED}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStickerDone();
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="reason-selector-label" color="secondary">
                    {t("step2.whatswrong")}
                  </InputLabel>
                  <Select
                    labelId="reason-selector-label"
                    label={t("step2.whatswrong")}
                    color="secondary"
                    value={sticker.reason.slug}
                    onChange={(e) => handleReasonChanged(e.target.value as string)}
                  >
                    {reasons.map((r) => (
                      <MenuItem key={r.slug} value={r.slug}>
                        {capitalizeFirstLetter(r.text)}
                      </MenuItem>
                    ))}
                  </Select>
                  <Collapse in={step >= Step.REASON_SELECTED && step < Step.SAVED}>
                    <TextField
                      label={t("step2.why")}
                      multiline
                      rows={4}
                      margin="normal"
                      color="secondary"
                      fullWidth
                      value={sticker.explanation}
                      onChange={(e) => handleExplanationChanged(e.target.value as string)}
                    />
                    <LoadingButton
                      type="submit"
                      loading={step === Step.SAVING}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {t("step2.submit")}
                    </LoadingButton>
                  </Collapse>
                </FormControl>
              </form>
            </Collapse>
            <Collapse in={step === Step.SAVED}>
              <ShareBox sticker={sticker} />
            </Collapse>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
