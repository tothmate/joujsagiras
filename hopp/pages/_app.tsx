import React from 'react';
import { AppProps } from 'next/app';
import { Box, Container } from '@material-ui/core';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box m={3}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </React.Fragment>
  );
}
