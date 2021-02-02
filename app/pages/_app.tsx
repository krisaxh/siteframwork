import "../styles/globals.scss";
import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <link rel="icon" type="icon/png" href="/favicon-32x32.png" />
        <title>Graphine coin</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
