import React, { useCallback, useState } from 'react';
import { DateTime } from 'luxon';
import Head from 'next/head';
import {
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { reasons, Sticker, StickerStore, GeneratorMode, emptySticker } from '../src/models';
import {
  getReasonBySlug,
  isValidUrl,
  updateSticker,
  getLocallizedDateString,
  getUrlForSticker,
  capitalizeFirstLetter
} from '../src/helpers';
import ShareBox from './ShareBox';
import Viewer from './Viewer';

const useStyles = makeStyles({
  unsavedPreview: {
    border: '6px dashed #f1f1f1'
  }
});

export default function Editor(props: { store: StickerStore }) {
  const classes = useStyles();
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
        image: data.image
      };
      setSticker((sticker) => updateSticker(sticker, { source: newSource }));
      setUrlCandidate(undefined);
      setUrlError(false);
      setLoadingSource(false);
      setErrorMessage(undefined);
    } else {
      setUrlError(true);
      setErrorMessage('Nem sikerült betölteni.');
      setLoadingSource(false);
    }
  }, []);

  const handleUrlChange = useCallback(
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

  const handleReasonChange = useCallback((value: string) => {
    const newReason = getReasonBySlug(value);
    if (newReason !== undefined) {
      setSticker((sticker) => updateSticker(sticker, { reason: newReason }));
    }
  }, []);

  const handleExplanationChange = useCallback((value: string) => {
    setSticker((sticker) => updateSticker(sticker, { explanation: value }));
  }, []);

  const handleStickerShared = useCallback(async () => {
    if (sticker.source.url !== '' && sticker.reason.slug !== '') {
      setSaving(true);

      const result = await props.store.save(sticker);
      result.match(
        (stickerId) => {
          const newSticker = updateSticker(sticker, { id: stickerId });
          setSticker(newSticker);

          if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
            fetch(getUrlForSticker(newSticker, GeneratorMode.Png));
          }
        },
        (error) => {
          setErrorMessage(`Sikertelen mentés, hiba: ${error?.message}`);
        }
      );

      setSaving(false);
    }
  }, [props.store, sticker]);

  const handleBackClicked = useCallback(() => {
    setSticker((sticker) => updateSticker(sticker, { id: '' }));
  }, []);

  const urlValue = urlCandidate || sticker.source.url;
  const isUrlLoaded = urlValue !== '' && !urlError;
  const isSaved = sticker.id !== '';
  const isReasonSelected = sticker.reason.slug !== '';

  const showReasonSelector = isUrlLoaded;
  const showPreview = showReasonSelector;
  const showShareButton = showPreview && !isSaved && isReasonSelected;
  const showShareBox = showPreview && isSaved;
  const showBackButton = showShareBox;

  return (
    <Grid container spacing={3} justifyContent="center">
      <Head>
        <title>Hopp!</title>
      </Head>
      <Snackbar open={errorMessage !== undefined} autoHideDuration={6000} onClose={() => setErrorMessage(undefined)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Collapse in={!isSaved}>
          <TextField
            label="Ide másold be a cikk URL-jét"
            fullWidth
            variant="outlined"
            value={urlValue}
            error={urlError}
            onChange={(e) => handleUrlChange(e.target.value as string)}
          />
        </Collapse>
      </Grid>
      {showReasonSelector && (
        <Grid item xs={12} sm={6}>
          <Collapse in={!isSaved}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="reason-selector-label">Mi a baj vele?</InputLabel>
              <Select
                value={sticker.reason.slug}
                onChange={(e) => handleReasonChange(e.target.value as string)}
                labelId="reason-selector-label"
                label="Mi a baj vele?"
              >
                {reasons.map((r) => (
                  <MenuItem key={r.slug} value={r.slug}>
                    {capitalizeFirstLetter(r.text)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Collapse>
        </Grid>
      )}
      {showPreview && (
        <Grid item xs={12} className={isSaved ? '' : classes.unsavedPreview}>
          <Viewer
            sticker={sticker}
            loadingSource={loadingSource}
            canEditExplanation={!saving && !isSaved}
            onExplanationChange={handleExplanationChange}
          />
        </Grid>
      )}
      {showShareButton && (
        <Grid item xs={6} sm={3}>
          {!saving && (
            <Button variant="contained" color="primary" fullWidth onClick={handleStickerShared}>
              Megosztom
            </Button>
          )}
          {saving && <CircularProgress size="1em" />}
        </Grid>
      )}
      {showShareBox && (
        <Grid item xs={12}>
          <ShareBox sticker={sticker} />
        </Grid>
      )}
      {showBackButton && (
        <Grid item xs={6} sm={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleBackClicked}>
            Szerkesztés
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
