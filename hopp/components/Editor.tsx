import React, { useCallback, useState } from "react";
import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  CircularProgress,
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

export default function Editor(props: { store: StickerStore }) {
  const router = useRouter();
  const [sticker, setSticker] = useState<Sticker>(emptySticker);
  const [loadingSource, setLoadingSource] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [urlCandidate, setUrlCandidate] = useState<string | undefined>(undefined);
  const [urlError, setUrlError] = useState(false);

  const reloadSource = useCallback(async (url: string) => {
    setLoadingSource(true);
    const response = await fetch(`api/fetch-opengraph-data?url=${url}`);
    if (response.ok) {
      const data = await response.json();
      const newSource = {
        url: url,
        title: data.title,
        date: getLocallizedDateString(DateTime.now()),
        image: data.image,
      };
      setSticker((sticker) => updateSticker(sticker, { source: newSource }));
      setUrlCandidate(undefined);
      setUrlError(false);
      setLoadingSource(false);
      setErrorMessage(undefined);
    } else {
      setUrlError(true);
      setErrorMessage("Nem sikerült betölteni.");
      setLoadingSource(false);
    }
  }, []);

  const handleUrlChanged = useCallback(
    (value: string) => {
      setUrlCandidate(value);
      if (isValidUrl(value)) {
        setUrlError(false);
        reloadSource(value);
      } else {
        setUrlError(true);
      }
    },
    [reloadSource]
  );

  const handleReasonChanged = useCallback((value: string) => {
    const newReason = getReasonBySlug(value);
    if (newReason !== undefined) {
      setSticker((sticker) => updateSticker(sticker, { reason: newReason }));
    }
  }, []);

  const handleExplanationChanged = useCallback((value: string) => {
    setSticker((sticker) => updateSticker(sticker, { explanation: value }));
  }, []);

  const handleStickerShared = useCallback(async () => {
    if (sticker.source.url !== "" && sticker.reason.slug !== "") {
      setSaving(true);

      const result = await props.store.save(sticker);
      result.match(
        (stickerId) => {
          const newSticker = updateSticker(sticker, { id: stickerId });
          setSticker(newSticker);

          if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
            fetch(getUrlForSticker(newSticker, GeneratorMode.Png));
          }

          router.push(getUrlForSticker(newSticker, GeneratorMode.Share), undefined, { shallow: true });
        },
        (error) => {
          setErrorMessage(`Sikertelen mentés, hiba: ${error?.message}`);
        }
      );

      setSaving(false);
    }
  }, [props.store, sticker, router]);

  const urlValue = urlCandidate || sticker.source.url;
  const isUrlLoaded = urlValue !== "" && !urlError;
  const isReasonSelected = sticker.reason.slug !== "";

  return (
    <Grid container spacing={3} justifyContent="center">
      <Head>
        <title>HOPP!</title>
      </Head>
      <Snackbar open={errorMessage !== undefined} autoHideDuration={6000} onClose={() => setErrorMessage(undefined)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Collapse in={true}>
          <Typography variant="h1" gutterBottom>
            Rossz újságírással találkoztál? Tedd szóvá!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Láttál egy cikket, amely nem felel meg a jó újságírás elvárásainak?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Jelentsd be, oszd meg Facebookon és hívd fel mások figyelmét is erre!
          </Typography>
          <TextField
            label="Másold be ide a cikk URL-jét"
            color="secondary"
            fullWidth
            value={urlValue}
            error={urlError}
            onChange={(e) => handleUrlChanged(e.target.value as string)}
            margin="normal"
          />
        </Collapse>
      </Grid>

      {isUrlLoaded && (
        <>
          <Grid item xs={12} sm={6}>
            <Canvas sticker={sticker} loadingSource={loadingSource} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="reason-selector-label" color="secondary">
                Mi a baj vele?
              </InputLabel>
              <Select
                value={sticker.reason.slug}
                onChange={(e) => handleReasonChanged(e.target.value as string)}
                labelId="reason-selector-label"
                label="Mi a baj vele?"
                color="secondary"
              >
                {reasons.map((r) => (
                  <MenuItem key={r.slug} value={r.slug}>
                    {capitalizeFirstLetter(r.text)}
                  </MenuItem>
                ))}
              </Select>
              {isReasonSelected && (
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
                  {!saving && (
                    <Button variant="contained" color="secondary" size="large" fullWidth onClick={handleStickerShared}>
                      Következő
                    </Button>
                  )}
                  {saving && <CircularProgress size="1em" color="secondary" sx={{ margin: "1em auto" }} />}
                </>
              )}
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
