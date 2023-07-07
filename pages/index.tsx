import Head from "next/head";
import { Hero } from "../components/Hero/hero";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../layout/layout";
interface PropsType {
  children?: ReactElement;
}

const Home: NextPageWithLayout<PropsType> = () => {

  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          padding: "0px",
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#201F22",
        }}
      >
        <Hero />
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default Home;
