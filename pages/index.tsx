import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import Map from "../src/components/Map/Map";
import { VillagesContextProvider } from "../hooks/Villages";
import { TurnContextProvider } from "../hooks/Turn";
import { Next } from "../src/components/Next";

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
        <SpaceNext>
          <Map />
          <Next />
        </SpaceNext>
      </Controllers>
    </div>
  );
};

export default Home;
