import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import ControlledInput from "../../../components/FormController/controlled-input";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPageWithLayout } from "../../_app";
import Link from "next/link";
import { useUserContextPass } from "../../../provider/userProvider";
import Layout from "../../../layout/layout";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Se requiere de un correo electronico")
      .email("Se solicita un correo electronico valido"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface PropsType {
  children?: ReactNode;
}

const Username: NextPageWithLayout<PropsType> = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/inicio");
    }
  }, []);

  const { setUser } = useUserContextPass();

  const onSubmit = (data: FormData) => {
    setUser({ email: data.email, password: "" });
    router.push({
      pathname: "/iniciar-sesion/paso-2",
    });
  };

  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="iniciar-sesion" content="Digital Money House" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          ¡Hola! Ingresá tu e-mail
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr",
              gridRowGap: "20px",
              "@media only screen and (max-width: 768px)": {
                gridRowGap: "20px",
                gridTemplateColumns: "minmax(50px, 300px)",
                "& .css-1yuncik-MuiFormLabel-root-MuiInputLabel-root": {
                  transform: "translate(12px, 15px) scale(1)",
                },
              },
              "@media only screen and (min-width: 768px)": {
                gridTemplateColumns: "minmax(50px, 360px)",
                "& .css-1yuncik-MuiFormLabel-root-MuiInputLabel-root": {
                  transform: "translate(12px, 20px) scale(1)",
                },
              },
            }}
          >
            <ControlledInput
              name="email"
              control={control}
              type="text"
              label="Correo electronico*"
              errorMessage={errors["email"]?.message}
              variant="filled"
            />
            <Button
              variant="primary"
              color="secondary"
              size="large"
              type="submit"
              sx={{
                marginTop: "10px",
              }}
            >
              Continuar
            </Button>
            <Link href="/registro">
              <Button variant="primary" size="large">
                Crear cuenta
              </Button>
            </Link>
          </Box>
        </form>
      </main>
    </>
  );
};

Username.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="login">{page}</Layout>;
};

export default Username;
