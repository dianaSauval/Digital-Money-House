import { Box, Button, Typography } from "@mui/material";
import ControlledInput from "./controlled-input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import sendConfirmationEmail from "../../lib/mail";
import { useState } from "react";

const schema = yup
  .object({
    firstName: yup.string().required("El nombre es requerido."),
    lastName: yup.string().required("El apellido es requerido."),
    dni: yup.string().required("El DNI es requerido."),
    email: yup
      .string()
      .email("Ingrese un correo electrónico válido.")
      .required("El correo electrónico es obligatorio."),
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
    phone: yup.string().required("El Telefono es requerido."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const FormRegister = () => {
  const [accountExists, setAccountExists] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await sendConfirmationEmail(data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          "@media only screen and (max-width: 768px)": {
            gridRowGap: "20px",
            gridTemplateColumns: "minmax(50px, 300px)",
            gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            "& .css-1yuncik-MuiFormLabel-root-MuiInputLabel-root": {
              transform: "translate(12px, 15px) scale(1)",
            },
          },
          "@media only screen and (min-width: 768px)": {
            gridColumnGap: "57px",
            gridRowGap: "40px",
            gridTemplateColumns: "minmax(50px, 330px) minmax(50px, 330px)",
            gridTemplateRows: "1fr 1fr 1fr 1fr",
            "& .css-1yuncik-MuiFormLabel-root-MuiInputLabel-root": {
              transform: "translate(12px, 20px) scale(1)",
            },
          },
          "@media only screen and (min-width: 1024px)": {
            gridColumnGap: "62px",
            gridTemplateColumns: "minmax(50px, 360px) minmax(50px, 360px)",
          },
        }}
      >
        <ControlledInput
          name="firstName"
          control={control}
          type="text"
          label="Nombre*"
          errorMessage={errors["firstName"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="lastName"
          control={control}
          type="text"
          label="Apellido*"
          errorMessage={errors["lastName"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="dni"
          control={control}
          type="text"
          label="DNI*"
          errorMessage={errors["dni"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="email"
          control={control}
          type="text"
          label="Correo electronico*"
          errorMessage={errors["email"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="password"
          control={control}
          type="password"
          label="Contraseña*"
          errorMessage={errors["password"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="confirmPassword"
          control={control}
          type="password"
          label="Confirmar contraseña*"
          errorMessage={errors["confirmPassword"]?.message}
          variant="filled"
          size="medium"
        />
        <ControlledInput
          name="phone"
          control={control}
          type="tel"
          label="Telefono*"
          errorMessage={errors["phone"]?.message}
          variant="filled"
          size="medium"
        />
        <Button
          variant="primary"
          color="secondary"
          size="large"
          type="submit"
          disabled={isSubmitting}
          sx={{
            "@media only screen and (max-width: 768px)": {
              marginTop: "10px",
            },
            "@media only screen and (min-width: 768px)": {
              marginTop: "0px",
            },
          }}
        >
          Crear Cuenta
        </Button>
      </Box>
      {accountExists && (
        <Typography
          variant="subtitle2"
          sx={{ color: "rgb(255, 0, 0)", marginTop: "25px" }}
        >
          Esta cuenta ya existe
        </Typography>
      )}
    </form>
  );
};

export default FormRegister;
