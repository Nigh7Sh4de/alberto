import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import Map from "../components/Map";
import { VillagesContextProvider } from "../hooks/Villages";
import { TurnContextProvider } from "../hooks/Turn";
import { Next } from "../components/Next";

const Controllers = ({ children }: any) => {
  return (
    <TurnContextProvider>
      <VillagesContextProvider>{children}</VillagesContextProvider>
    </TurnContextProvider>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Alberto.next</title>
        <meta name="description" content="Turn based strategy game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Controllers>
        <Map />
        <Next />
      </Controllers>
    </div>
  );
};

export default Home;
