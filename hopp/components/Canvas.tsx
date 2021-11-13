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
  card: {
    position: 'relative',
    overflow: 'visible'
  },
  placeholder: {
    height: '170px',
    backgroundColor: '#fafafa'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px'
  },
  link: {
    textTransform: 'uppercase',
    color: '#616161',
    fontSize: '0.85em'
  }
});

export default function Canvas(props: { sticker: Sticker; loadingSource: boolean }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {(!props.sticker.source.image || props.loadingSource) && (
        <Box display="flex" alignItems="center" justifyContent="center" className={classes.placeholder}>
          <CircularProgress size="1em" />
        </Box>
      )}
      {props.sticker.source.image && !props.loadingSource && (
        <CardMedia style={{ height: 170 }} image={props.sticker.source.image} title={props.sticker.source.title} />
      )}
      <Fade in={props.sticker.reason.text !== ''}>
        <Box className={classes.overlay}>
          <Overlay sticker={props.sticker} />
        </Box>
      </Fade>
      {!props.loadingSource && (
        <CardContent>
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
