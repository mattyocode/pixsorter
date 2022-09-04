import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { ImageBackground } from "../components/Layout";
import { Heading } from "../components/Heading";
import { ImageUI } from "../components/ImageUI";
import { Controls } from "../components/Controls";
import AlgoProvider from "../store/AlgoProvider";
import SortingProvider from "../store/SortingProvider";

const Home: NextPage = () => {
  return (
    <AlgoProvider>
      <SortingProvider>
        <Head>
          <title>PixSorter</title>
          <meta name="description" content="Sort images with algorithms" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <ImageBackground src="/img/background.jpg">
            <Heading
              title="PixSorter"
              subhead="Watch algorithms sort pixels."
            />
            <ImageUI />
            <Controls />
          </ImageBackground>
        </main>
      </SortingProvider>
    </AlgoProvider>
  );
};

export default Home;
