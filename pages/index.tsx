import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { ImageBackground } from "../components/Layout";
import { Heading } from "../components/Heading";
import { ImageUI } from "../components/ImageUI";
import { SidewaysSelector } from "../components/SidewaysSelector";
import { Algorithm } from "../global";
import { bubbleSort } from "../helpers/bubble-sort";

import styles from "../styles/Home.module.scss";

const algoOptions = [
  // { value: "quick", label: "Quick sort" },
  { value: "bubble", label: "Bubble sort", function: bubbleSort },
  { value: "insertion", label: "Insertion sort" },
  { value: "selection", label: "Selection sort" },
  // { value: "merge", label: "Merge sort" },
];

const Home: NextPage = () => {
  const [algoIdx, setAlgoIdx] = useState<number>(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>PixSorter</title>
        <meta name="description" content="Sort images with algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageBackground src="/img/background.jpg">
        <Heading title="PixSorter" subhead="Watch algorithms sort pixels." />
        <ImageUI algorithmToUse={algoOptions[algoIdx].value as Algorithm} />
        <SidewaysSelector
          field="Using"
          values={algoOptions}
          selectedIdx={algoIdx}
          setSelectedIdx={setAlgoIdx}
        />
      </ImageBackground>
    </div>
  );
};

export default Home;
