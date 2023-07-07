import { Typography } from "@mui/material";
import Head from "next/head";
import FormRegister from "../../components/FormController/form-register";
import { NextPageWithLayout } from "../_app";
import { ReactElement, ReactNode } from "react";
import Layout from "../../layout/layout";
interface PropsType {
  children?: ReactNode;
}

const Register: NextPageWithLayout<PropsType> = () => {
  return (
    <>
      <Head>
        <title>Registro DMH</title>
        <meta name="description" content="Registro Digital Money House" />
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
          padding: "45px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "var(--main-text-color)",
            "@media only screen and (max-width: 768px)": {
              marginBottom: "35px",
            },
            "@media only screen and (min-width: 768px)": {
              marginBottom: "40px",
            },
          }}
        >
          Crear Cuenta
        </Typography>
        <FormRegister />
      </main>
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="register">{page}</Layout>;
};

export default Register;
