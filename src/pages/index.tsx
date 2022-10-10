import type { NextPage } from 'next';
import Head from 'next/head';
import Map from 'src/components/Map/Map';
import { Next } from 'src/components/Next';
import NextSpace from 'src/components/NextSpace';
import { TurnContextProvider } from 'src/hooks/Turn';
import { VillagesContextProvider } from 'src/hooks/Villages';
import styles from 'src/styles/Home.module.css';

const Controllers = ({ children }: any) => {
  return (
    <TurnContextProvider>
      <VillagesContextProvider>{children}</VillagesContextProvider>
    </TurnContextProvider>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alberto.next</title>
        <meta name="description" content="Turn based strategy game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Controllers>
        <NextSpace>
          <div className={styles.container}>
            <Map />
            <Next />
          </div>
        </NextSpace>
      </Controllers>
    </>
  );
};

export default Home;
