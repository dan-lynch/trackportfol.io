import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';
import theme from 'theme';
import { ContextProvider } from 'context/AppContext';
import { GA_ID } from 'helpers/constants';

class MyApp extends App {

  componentDidMount() {
    const trackingId = GA_ID;
    ReactGA.initialize(trackingId);
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
      <Head>
        <title>trackportfol.io</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Easily track your investment portfolio. We currently support over 8,000 US stocks. Bonds, Commodities, International Stocks and Crypto coming soon." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="./manifest.json" />
      </Head>
      <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </ContextProvider>
    </React.Fragment>
    )
  }
}

export default MyApp