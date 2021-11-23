import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Box,
  CircularProgress,
  makeStyles,
  Fade
} from '@material-ui/core';
import { Sticker } from '../src/models';
import Overlay from './Overlay';

const useStyles = makeStyles({
  placeholder: {
    height: '200px',
    backgroundColor: '#fafafa'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: '-3px',
    right: '-3px'
  },
  link: {
    textTransform: 'uppercase',
    color: '#616161',
    fontSize: '0.85em'
  },
  cardMedia: {
    height: '200px',
    filter: (props: { hasOverlay: boolean }) => (props.hasOverlay ? 'grayscale(60%)' : 'none')
  },
  cardContent: {
    padding: '6px 12px',
    '&:last-child': {
      paddingBottom: '6px'
    }
  }
});

export default function Canvas(props: { sticker: Sticker; loadingSource: boolean }) {
  const hasOverlay = props.sticker.reason.text !== '';
  const classes = useStyles({ hasOverlay });
  return (
    <Card>
      {(!props.sticker.source.image || props.loadingSource) && (
        <Box display="flex" alignItems="center" justifyContent="center" className={classes.placeholder}>
          <CircularProgress size="1em" />
        </Box>
      )}
      <div style={{ position: 'relative' }}>
        {props.sticker.source.image && !props.loadingSource && (
          <CardMedia
            className={classes.cardMedia}
            image={props.sticker.source.image}
            title={props.sticker.source.title}
          />
        )}
        <Fade in={hasOverlay}>
          <Box className={classes.overlay}>
            <Overlay sticker={props.sticker} />
          </Box>
        </Fade>
      </div>
      {!props.loadingSource && (
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" component="h2" noWrap>
            <Link href={props.sticker.source.url} className={classes.link}>
              {new URL(props.sticker.source.url).hostname}
            </Link>
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h3">
            {props.sticker.source.title}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
