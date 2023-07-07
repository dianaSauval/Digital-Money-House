import { Box } from "@mui/material";
import { ReactElement } from "react";
import Layout from "../../layout/layout";
import ArrowSubtitleMobile from "../../components/ArrowSubtitleMobile";
import Services from "../../components/Services";
import Head from "next/head";
const ListService = () => {
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
          "@media (max-width: 1301px)": {
            width: "221px",
          },
        }}
      ></Box>
      <Box sx={{ display: "flex", width: "100%", backgroundColor: "#EEEAEA" }}>
        <Box
          sx={{
            width: "100%",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px",
            paddingLeft: "100px",
            "@media (max-width: 768px)": {
              padding: "10px",
              paddingTop: "50px",
            },
          }}
        >
          <ArrowSubtitleMobile title="Pagar servicios"></ArrowSubtitleMobile>
          <Services></Services>
        </Box>
      </Box>
    </>
  );
};

ListService.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default ListService;
