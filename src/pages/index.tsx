import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { ImageBackground } from "../components/Layout";
import { Heading } from "../components/Heading";
import { ImageUI } from "../components/ImageUI";
import { Controls } from "../components/Controls";
import { Footer } from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";
import AlgoProvider from "../store/AlgoProvider";
import SortingProvider from "../store/SortingProvider";
import UIProvider from "../store/UIProvider";

const Home: NextPage = () => {
  return (
    <ErrorBoundary>
      <AlgoProvider>
        <SortingProvider>
          <UIProvider>
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
                <Footer>
                  &#128075;{" "}
                  <a href="https://www.mattoliver.dev/#contact">mattyocode</a>
                </Footer>
              </ImageBackground>
            </main>
          </UIProvider>
        </SortingProvider>
      </AlgoProvider>
    </ErrorBoundary>
  );
};

export default Home;
