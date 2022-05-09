import { useEffect } from 'react';
import { polyfill } from 'seamless-scroll-polyfill';

import "../styles/global.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    polyfill();
  },[])

  return <Component {...pageProps} />;
}

export default MyApp;
