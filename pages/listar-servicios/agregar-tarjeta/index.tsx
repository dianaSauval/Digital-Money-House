import { Box } from "@mui/material";
import "react-credit-cards/es/styles-compiled.css";
import ArrowSubtitleMobile from "../../../components/ArrowSubtitleMobile";
import CreditCardService from "../../../components/CreditCard/creditCardService";
import { NextPageWithLayout } from "../../_app";
import { ReactElement } from "react";
import Layout from "../../../layout/layout";

import { useRouter } from "next/router";
import Head from "next/head";

interface PropsType {
  children?: ReactElement;
}

const addCardService: NextPageWithLayout<PropsType> = () => {
  const router = useRouter();
  const { listar } = router.query;
  const esListar = listar === "true";

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
          "@media (max-width: 768px)": {
            display: "none",
          },
          "@media (min-width: 768px)": {
            display: "block",
            maxWidth: "220px",
          },
          "@media (min-width: 1024px)": {
            display: "block",
            maxWidth: "275px",
          },
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          padding: "50px",
          "@media only screen and (max-width: 768px)": {
            padding: "20px",
            paddingTop: "60px",
          },
          backgroundColor: "#EEEAEA",
        }}
      >
        <ArrowSubtitleMobile title="Tarjetas"></ArrowSubtitleMobile>
        <Box
          sx={{
            display: "flex",
            borderRadius: "8px",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#fff",
            textAlign: "center",
            height: "100%",
            padding: "95px",
            "@media only screen and (max-width: 768px)": {
              width: "100%",
              padding: "0px",
              paddingTop: "150px",
              marginBottom: "30px",
            },
          }}
        >
          <CreditCardService listar={esListar} />
        </Box>
      </Box>
    </>
  );
};

addCardService.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};
export default addCardService;
