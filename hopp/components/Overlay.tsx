import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Sticker } from '../src/models';

const useStyles = makeStyles({
  firstLabel: {
    backgroundColor: '#ffcc02',
    fontWeight: 'bold',
    color: '#000000',
    padding: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transform: 'rotate(-10deg)',
    display: 'inline-block',
    fontFamily: 'Oswald, sans-serif'
  },
  secondLabel: {
    backgroundColor: '#5ac8fa',
    marginLeft: '60px',
    color: '#000000',
    padding: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transform: 'rotate(-10deg)',
    display: 'inline-block',
    fontFamily: 'Oswald, sans-serif'
  }
});

export default function Overlay(props: { sticker: Sticker }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.firstLabel}>
        hopp!
      </Typography>
      <Typography variant="h4" className={classes.secondLabel}>
        Ez {props.sticker.reason.text}
      </Typography>
    </>
  );
}
