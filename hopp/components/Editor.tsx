import React, { useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
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
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Sticker, StickerStore, GeneratorMode, emptySticker, Reason } from "../src/models";
import {
  isValidUrl,
  updateSticker,
  getLocallizedDateString,
  getUrlForSticker,
  capitalizeFirstLetter,
  track,
  getDescriptiveTitle,
} from "../src/helpers";
import Preview from "./Preview";
import Arrow from "./Arrow";
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

    const response = await fetch(`api/fetch-opengraph-data?url=${urlCandidate}`);
    if (response.ok) {
      const data = await response.json();
      const newSource = {
        url: urlCandidate,
        title: data.title,
        date: getLocallizedDateString(DateTime.now()),
        image: data.image,
      };
      setSticker((sticker) => updateSticker(sticker, { source: newSource }));
      setStep(Step.URL_LOADED);
      setErrorMessage(undefined);
      track("submit-url", "click");
    } else {
      setStep(Step.URL_ERROR);
      setErrorMessage("Nem sikerült betölteni az URL-t");
      track("submit-url", "error");
    }
  }, [urlCandidate]);

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
        fetch(getUrlForSticker(newSticker, GeneratorMode.Png));
        fetch(getUrlForSticker(newSticker, GeneratorMode.Share));
        track("save-sticker", "click");
      },
      (error) => {
        setStep(Step.SAVE_ERROR);
        setErrorMessage(`Sikertelen mentés, hiba: ${error?.message}`);
        track("save-sticker", "error");
      }
    );
  }, [props.store, sticker]);

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
      const result = await props.store.loadReasons();
      result.match(
        (reasons) => {
          setReasons(reasons);
        },
        (error) => {
          setErrorMessage(`Sikertelen betöltés, hiba: ${error?.message}`);
          track("load-reasons", "error");
        }
      );
    };
    loadReasons();
  }, [props.store]);

  return (
    <>
      <Head>
        <title>{getDescriptiveTitle(sticker.reason.text)}</title>
      </Head>

      <Snackbar open={errorMessage !== undefined} autoHideDuration={6000} onClose={() => setErrorMessage(undefined)}>
        <Alert severity="error">Hopp! {errorMessage}</Alert>
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
                Rossz újságírással találkoztál? Tedd&nbsp;szóvá!
              </Typography>
              <Typography variant="body2" gutterBottom>
                Láttál egy cikket, amely nem felel meg a jó újságírás elvárásainak?
              </Typography>
              <Typography variant="body2" gutterBottom>
                Jelentsd be, oszd meg Facebookon és hívd fel mások figyelmét is erre!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                label="Másold be ide a cikk URL-jét"
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
                Tovább
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
                    Mi a baj vele?
                  </InputLabel>
                  <Select
                    labelId="reason-selector-label"
                    label="Mi a baj vele?"
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
                      label="Miért? (opcionális)"
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
                      Szóvá teszem!
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
