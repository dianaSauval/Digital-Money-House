import { Box, Button } from "@mui/material";
import { ReactElement, useEffect } from "react";
import Layout from "../../layout/layout";
import AvailableAmount from "../../components/AvailableAmount";
import Transferences from "../../components/Transferences";
import Head from "next/head";
import ArrowSubtitleMobile from "../../components/ArrowSubtitleMobile";
import Link from "next/link";
import { useRouter } from "next/router";

const Inicio = () => {

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });

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
            width: "221px"
          },
        }}
      ></Box>
      <Box sx={{ display: "flex", width: "100%", backgroundColor: "#EEEAEA" }}>
        <Box sx={{ width: "100%", gap: "10px", display: "flex", flexDirection: "column", alignItems: "center", padding: "50px", paddingLeft: "100px", "@media (max-width: 768px)": { padding: "10px", paddingTop: "50px" } }}>
          <ArrowSubtitleMobile title="Inicio"></ArrowSubtitleMobile>
          <AvailableAmount></AvailableAmount>
          <Box sx={{ display: "flex", width: "100%", gap: "10px", "@media (max-width: 768px)": { flexDirection: "column" } }}>
            <Link style={{ width: "100%" }} href="/cargar-dinero">
              <Button sx={{ width: "100%", "@media (max-width: 768px)": { width: "100%" } }} variant="xxl">Cargar Dinero</Button>
            </Link>
            <Link style={{ width: "100%" }} href="/listar-servicios">
              <Button sx={{ width: "100%", "@media (max-width: 768px)": { width: "100%" } }} variant="xxl">Pago de Servicios</Button>
            </Link>
          </Box>
          <Transferences></Transferences>
        </Box>
      </Box>
    </>
  );
};

Inicio.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default Inicio;