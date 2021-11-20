import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Sticker } from '../src/models';

const useStyles = makeStyles({
  label: {
    backgroundColor: '#5ac8fa',
    color: '#000000',
    padding: '12px',
    textTransform: 'uppercase',
    transform: 'rotate(-2deg)',
    fontFamily: 'Oswald, sans-serif'
  },
  filler: {
    backgroundColor: '#ffffff',
    height: '20px',
    marginTop: '-12px'
  }
});

export default function Overlay(props: { sticker: Sticker }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" className={classes.label}>
        <b>Hopp!</b> Ez {props.sticker.reason.text}
      </Typography>
      <div className={classes.filler}></div>
    </>
  );
}
