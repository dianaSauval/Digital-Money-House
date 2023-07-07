import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import Layout from "../../layout/layout";
import { NextPageWithLayout } from "../_app";
interface PropsType {
  children?: ReactNode;
}

const SuccessRegister: NextPageWithLayout<PropsType> = () => {
  return (
    <>
      <Head>
        <title>Recupero Pendiente</title>
        <meta
          name="description"
          content="Registro exitoso Digital Money House"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main
        style={{
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "var(--main-bg-color)",
          padding: "25px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            marginBottom: "40px",
            color: "#FFFF",
          }}
        >
          ¡E-mail enviado!
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            "@media only screen and (max-width: 768px)": {
              width: "80%",
            },
            "@media only screen and (min-width: 768px)": {
              width: "60%",
            },
            "@media only screen and (min-width: 1366px)": {
              width: "35%",
            },
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: "#C1FD35",
              fontSize: "100px",
              fontWeight: "200",
              marginBottom: "30px",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: "40px",
              color: "#FFFF",
            }}
          >
            ¡Hemos enviado un correo electrónico para que puedas modificar tu contraseña!
          </Typography>
        </Box>
        <Link
          href="/"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <Button variant="primary" color="secondary" size="large" fullWidth>
            Continuar
          </Button>
        </Link>
      </main>
    </>
  );
};

SuccessRegister.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="login">{page}</Layout>;
};

export default SuccessRegister;
