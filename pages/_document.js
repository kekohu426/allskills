import Document, { Html, Head, Main, NextScript } from "next/document";

const GA_ID = "G-MBC75WRZ65";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = ctx.pathname && ctx.pathname.startsWith("/en") ? "en" : "zh";
    return { ...initialProps, locale };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />

          {/* SEO Meta Tags */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta httpEquiv="X-Robots-Tag" content="index, follow" />

          {/* Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
