import type { NextPage } from "next";
import Head from "next/head";

import { ImageBackground } from "../components/Layout";
import { Heading } from "../components/Heading";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>PixSorter</title>
        <meta name="description" content="Sort images with algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageBackground src="/img/background.jpg">
        <Heading title="PixSorter" subhead="Watch alogrithms sort pixels." />
      </ImageBackground>
    </div>
  );
};

export default Home;
