import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Sticker } from '../src/models';
import { Textfit } from 'react-textfit';

const useStyles = makeStyles({
  overlay: {
    backgroundColor: '#45474c',
    color: '#fafafa',
    borderRadius: '30px',
    width: '210px',
    height: '170px',
    padding: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontFamily: 'Roboto, sans-serif'
  }
});

export default function Overlay(props: { sticker: Sticker }) {
  const classes = useStyles();
  return (
    <Box className={classes.overlay} boxShadow={1}>
      <Textfit mode="single">hopp!</Textfit>
      <Textfit mode="single">ez jól hangzik, csak</Textfit>
      <Textfit mode="single">{props.sticker.reason.text}</Textfit>
    </Box>
  );
}
