import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import Head from 'next/head';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>V.League</title>
        <meta name="description" content="V.League" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
