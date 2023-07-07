import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import ControlledInput from "../../components/FormController/controlled-input";
import { NextPageWithLayout } from "../_app";
import Layout from "../../layout/layout";

const schema = yup
  .object({
    password: yup
      .string()
      .required("La contraseña es requerida.")
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .max(20, "La contraseña no puede tener más de 20 caracteres.")
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/,
        "La contraseña debe contener al menos 1 caracter especial, una mayúscula y un número."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
      .required("La confirmación de contraseña es obligatoria."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
interface PropsType {
  children?: ReactNode;
}
const RecuperarClave: NextPageWithLayout<PropsType> = () => {
  //const [errorLogin, setErrorLogin] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    router.push("/recupero-exitoso");
    return;
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
          Modificar tu contraseña
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
              label="Ingresa nueva contraseña*"
              //errorMessage={errorLogin ? "" : errors["password"]?.message}
              errorMessage={errors["password"]?.message}
              variant="filled"
            />
            <ControlledInput
              name="confirmPassword"
              control={control}
              type="password"
              label="Repetir contraseña*"
              //errorMessage={errorLogin ? "" : errors["confirmPassword"]?.message}
              errorMessage={errors["confirmPassword"]?.message}
              variant="filled"
            />
            <Button
              variant="primary"
              color="secondary"
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{
                marginTop: "10px",
              }}
            >
              Recuperar contraseña
            </Button>
          </Box>
        </form>
      </main>
    </>
  );
};

RecuperarClave.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="login">{page}</Layout>;
};

export default RecuperarClave;
