import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import Map from "../components/map/Map";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Alberto.next</title>
        <meta name="description" content="Turn based strategy game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map />
    </div>
  );
};

export default Home;
