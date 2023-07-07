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

const schema = yup
  .object({
    authToken: yup.string().min(6),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
interface PropsType {
  children?: ReactNode;
}

const Token: NextPageWithLayout<PropsType> = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { user } = useUserContextPass();
  const onSubmit = async (data: FormData) => {
    try {
      await axios
        .get("/api/confirmation", {
          params: {
            email: user.email,
          },
        })
        .then((response) => {
          if (response.data.codigo == data.authToken) {
            axios
              .put("/api/confirmation", {
                params: {
                  email: user.email,
                },
              })
              .then((response) => {
                axios
                  .post("https://digitalmoney.ctd.academy/api/users", {
                    dni: parseInt(response.data.user.dni),
                    email: response.data.user.email,
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    password: response.data.user.password,
                    phone: response.data.user.phone,
                  })
                  .then(() => {
                    axios
                      .post("https://digitalmoney.ctd.academy/api/login", {
                        email: response.data.user.email,
                        password: response.data.user.password,
                      })
                      .then(function (response) {
                        localStorage.setItem("token", response.data.token);
                        document.cookie = `auth=${response.data.token}`;
                        axios
                          .request({
                            method: "GET",
                            url: "https://digitalmoney.ctd.academy/api/account",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: response.data.token,
                            },
                            data: "",
                          })
                          .then((response) => {
                            localStorage.setItem(
                              "userId",
                              response.data.user_id
                            );
                          });

                        router.push("/inicio");
                      });
                  });
              });
          } else {
            console.error("token incorrecto");
            setErrorLogin(true);
          }
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
          Ingresá tu token
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
              name="authToken"
              control={control}
              type="text"
              label="Token*"
              defaultValue=""
              variant="filled"
              errorMessage={
                errorLogin
                  ? "Token incorrecto. Vuelve a intentarlo"
                  : errors["authToken"]?.message
              }
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
          </Box>
        </form>
      </main>
    </>
  );
};

Token.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="login">{page}</Layout>;
};

export default Token;
