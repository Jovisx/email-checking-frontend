import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MultiDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="stylesheet" href="/static/styles/normalize.css" />
          <link rel="stylesheet" href="/static/styles/fonts.css" />
          <link rel="stylesheet" href="/static/styles/globals.css" />
          <link rel="stylesheet" href="/static/fonts/icomoon/style.css" />
          <link rel="stylesheet" href="/static/styles/grids.css" />
          <link rel="stylesheet" href="/static/styles/tables.css" />
          <link rel="stylesheet" href="/static/styles/perfect-scrollbar.css" />
          <link rel="stylesheet" href="/static/styles/ReactToastify.css" />
          <link rel="stylesheet" href="/static/styles/rc-tooltip.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MultiDocument;
