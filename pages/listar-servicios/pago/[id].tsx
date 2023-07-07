import { ReactElement, ReactNode } from "react";
import { Box } from "@mui/material";
import Layout from "../../../layout/layout";
import { NextPageWithLayout } from "../../_app";
import ArrowSubtitleMobile from "../../../components/ArrowSubtitleMobile";
import SelectCardService from "../../../components/ListCard/selectCardService";
import Head from "next/head";
interface PropsType {
  children?: ReactNode;
}

const ServiceCardList: NextPageWithLayout<PropsType> = () => {
  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
      </Head>
      <Box
        sx={{
          width: "276px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      ></Box>
      <Box
        sx={{
          height: "100%",
          width: "100vw",
          backgroundColor: "#EEEAEA",
          paddingLeft: "100px",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingRight: "50px",
          "@media (max-width: 767px)": {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        }}
      >
        <Box
          sx={{
            marginBottom: "1rem",
          }}
        >
          <ArrowSubtitleMobile title="Seleccionar Tarjetas" />
          <SelectCardService />
        </Box>
      </Box>
    </>
  );
};

ServiceCardList.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default ServiceCardList;
