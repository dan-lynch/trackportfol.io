import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'theme';
import { ContextProvider } from 'context/AppContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  // jssStyles = document.querySelector('#jss-server-side');
  // if (jssStyles: any) {
  //   jssStyles.parentElement!.removeChild(jssStyles);
  // }

  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
      <Head>
        <title>trackportfol.io</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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