import React, { useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";
import Head from "next/head";
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
import { reasons, Sticker, StickerStore, GeneratorMode, emptySticker } from "../src/models";
import {
  getReasonBySlug,
  isValidUrl,
  updateSticker,
  getLocallizedDateString,
  getUrlForSticker,
  capitalizeFirstLetter,
} from "../src/helpers";
import Canvas from "./Canvas";
import Viewer from "./Viewer";
import Arrow from "./Arrow";
import { useRouter } from "next/router";

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
    } else {
      setStep(Step.URL_ERROR);
      setErrorMessage("Nem sikerült betölteni.");
    }
  }, [urlCandidate]);

  const handleReasonChanged = useCallback((value: string) => {
    const newReason = getReasonBySlug(value);
    if (newReason !== undefined) {
      setSticker((sticker) => updateSticker(sticker, { reason: newReason }));
      setStep(Step.REASON_SELECTED);
    }
  }, []);

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

        if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
          fetch(getUrlForSticker(newSticker, GeneratorMode.Png));
        }

        const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`;
        router.push(currentUrl, getUrlForSticker(newSticker, GeneratorMode.Share), { shallow: true });
        setStep(Step.SAVED);
      },
      (error) => {
        setStep(Step.SAVE_ERROR);
        setErrorMessage(`Sikertelen mentés, hiba: ${error?.message}`);
      }
    );
  }, [props.store, sticker, router]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as === `${router.basePath}${router.pathname}`) {
        setStep(Step.INITIAL);
        return false;
      }
      return true;
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>HOPP!</title>
      </Head>

      <Snackbar open={errorMessage !== undefined} autoHideDuration={6000} onClose={() => setErrorMessage(undefined)}>
        <Alert severity="error">{errorMessage}</Alert>
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
                Rossz újságírással találkoztál? Tedd szóvá!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Láttál egy cikket, amely nem felel meg a jó újságírás elvárásainak?
              </Typography>
              <Typography variant="body1" gutterBottom>
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
                Következő
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Collapse>

      <Collapse in={step >= Step.URL_LOADED && step < Step.SAVED}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStickerDone();
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              {step >= Step.URL_LOADED && <Canvas sticker={sticker} />}
            </Grid>
            <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
              <Arrow />
            </Grid>
            <Grid item xs={12} sm={5}>
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
                {step >= Step.REASON_SELECTED && (
                  <>
                    <TextField
                      label="Miért?"
                      multiline
                      rows={4}
                      margin="normal"
                      color="secondary"
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
                      Következő
                    </LoadingButton>
                  </>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Collapse>
      <Collapse in={step >= Step.SAVED}>{step >= Step.SAVED && <Viewer sticker={sticker}></Viewer>}</Collapse>
    </>
  );
}
