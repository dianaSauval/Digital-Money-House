import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactElement, ReactNode, useState } from "react";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import ControlledInput from "../../../components/FormController/controlled-input";
import { NextPageWithLayout } from "../../_app";
import { useUserContextPass } from "../../../provider/userProvider";
import Layout from "../../../layout/layout";
import { useUserContext } from "../../../context/userContext";

const schema = yup
  .object({
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
interface PropsType {
  children?: ReactNode;
}
const Password: NextPageWithLayout<PropsType> = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { user, setUser } = useUserContextPass();
  const { setUserInfo } = useUserContext();

  const onSubmit = async (data: FormData) => {
    try {
      setUser({ email: user.email, password: data.password });
      await axios
        .post("https://digitalmoney.ctd.academy/api/login", {
          email: user.email,
          password: data.password,
        })
        .then(function (response) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          document.cookie = `auth=${token}`;

          axios
            .request({
              method: "GET",
              url: "https://digitalmoney.ctd.academy/api/account",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              data: "",
            })
            .then((response) => {
              localStorage.setItem("userId", response.data.user_id);
              localStorage.setItem("accountId", response.data.id);
              const configInfo = {
                method: "get",
                url: `https://digitalmoney.ctd.academy/api/users/${localStorage.getItem(
                  "userId"
                )}`,
                headers: {
                  Authorization: localStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
              };
              axios
                .request(configInfo)
                .then((response) => {
                  setUserInfo(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          setErrorLogin(false);
          router.push("/inicio");

        });
    } catch (error) {
      console.error(error);
      setErrorLogin(true);
    }
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
          Ingresá tu contraseña
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
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
              name="password"
              control={control}
              type="password"
              label="Contraseña*"
              errorMessage={
                errorLogin
                  ? "Contraseña incorrecta. Vuelve a intentarlo"
                  : errors["password"]?.message
              }
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            </Box>
          </Box>
        </form>
      </main>
    </>
  );
};

Password.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="login">{page}</Layout>;
};

export default Password;
