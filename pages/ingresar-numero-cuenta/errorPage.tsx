import { Box } from "@mui/material";
import { ReactNode, ReactElement } from "react";
import Layout from "../../layout/layout";
import { NextPageWithLayout } from "../_app";
import AddMoneyOption from "../../components/AddMoneyQuantity/addMoneyQuantity";
import AddAccountNumber from "../../components/AddMoneyQuantity/addAccountNumber";
import ErrorInfoBox from "../../components/ChargeInfo/ErrorInfoBox";
import Head from "next/head";

interface PropsType {
  children?: ReactNode;
}
const ErrorPage: NextPageWithLayout<PropsType> = () => {
  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
      </Head>
      <Box
        sx={{
          width: "265px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 768px)": {
            display: "none",
          },
          "@media (max-width: 1301px)": {
            width: "221px",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "50px",
          width: "100%",
          backgroundColor: "#EEEAEA",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "50px",
          paddingRight: "50px",
          "@media only screen and (max-width: 1300px)": {
            marginLeft: "45px",
          },
          "@media only screen and (max-width: 768px)": {
            paddingRight: "20px",
            paddingLeft: "20px",
            marginLeft: "0px",
            paddingTop: "30px",
          },
        }}
      >
        <Box
          sx={{
            display: "none",
            "@media only screen and (max-width: 768px)": {
              width: "100%",
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            },
          }}
        ></Box>
        <ErrorInfoBox
          titleError={"Hubo un problema con tu pago"}
          textError={
            "El número de cuenta es inválido o no tienes facturas pendientes de pago."
          }
        />
      </Box>
    </>
  );
};
ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default ErrorPage;
