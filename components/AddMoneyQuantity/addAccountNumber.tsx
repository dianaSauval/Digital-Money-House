import {
  Box,
  Typography,
  Button,
  TextField,
  Input,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const AddAccountNumber = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [validationError, setValidationError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const serviceId = useRouter().query.id as string;
  const validationSchema = Yup.object().shape({
    number: Yup.string()
      .test("notEmpty", "*Este campo es requerido", (value: any) => {
        return value && value.trim() !== "";
      })
      .test("validNumber", "*Ingrese solo números", (value) => {
        if (value && value !== "") {
          return !isNaN(parseFloat(value));
        }
        return true;
      })
      .test("noLetters", "*No ingrese letras ni espacios", (value) => {
        if (value && value !== "") {
          const transformedValue = value.replace(",", "."); // Reemplazar coma por punto
          return /^\d*\.?\d*$/.test(transformedValue);
        }
        return true;
      })
      .test("firstNotAreTwo", "*No ingrese el primer 2", (value: any) => {
        return value && value[0] != 2;
      })
      .test("elevenNumbers", "*Ingrese once números", (value: any) => {
        return value && value.length == 11;
      })
      .required("*Ingrese solo numeros"),
  });

  useEffect(() => {
    if (inputValue === "") {
      setButtonDisabled(true);
    }
  }, [inputValue]);

  const handleChange = (e: any) => {
    setInputValue(`${e.target.value}`);
    if (inputValue === "") {
      setButtonDisabled(true);
    }
    validationSchema
      .validate({ number: e.target.value })
      .then(() => {
        setButtonDisabled(false);
        setValidationError("");
      })
      .catch((error) => {
        setButtonDisabled(true);
        setValidationError(error.message);
      });
  };

  const handleBlur = () => {
    validationSchema
      .validate({ number: inputValue })
      .then(() => {
        setValidationError("");
      })
      .catch((error) => {
        setValidationError(error.message);
      });
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate({ number: inputValue })
      .then(() => {
        if (inputValue.slice(9) == "00") {
          router.push(`/listar-servicios/pago/${serviceId}`);
        } else router.push("/ingresar-numero-cuenta/errorPage");
      })
      .catch((error) => {
        router.push("/ingresar-numero-cuenta/errorPage");
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--main-bg-color)",
        color: "var(--main-text-color)",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

        "@media (max-width: 768px)": {
          padding: "18px 45px 18px 25px",
          gap: "18px",
        },
        "@media (min-width: 768px)": {
          padding: "40px 45px 40px 35px",
          gap: "18px",
        },
        "@media (min-width: 1024px)": {
          padding: "40px 45px 18px 35px",
          gap: "18px",
        },

        "@media (max-width: 1024px)": {
          display: "flex",
          alignItems: "center",
          flexDirection: "colum",
          width: "100%",
        },
      }}
    >
      <FormControl
        onSubmit={handleClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "colum",
          alignContent: "flex-start",
          width: "100%",
          "@media (max-width: 768px)": {
            display: "flex",
            alignItems: "center",
            flexDirection: "colum",
          },
          "@media (max-width: 1024px)": {
            display: "flex",
            alignItems: "center",
            flexDirection: "colum",
          },
        }}
      >
        <Box
          sx={{
            "@media (max-width: 1024px)": {
              width: "100%",
              paddingTop: "10px",
              alignItems: "center",
            },
            "@media (max-width: 768px)": {
              alignItems: "center",
            },
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#C1FD35",
                paddingBottom: "25px",
                "@media (max-width: 1024px)": {
                  textAlign: "center",
                },
              }}
              variant="h1"
            >
              Número de cuenta sin el primer 2
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                alignContent: "flex-start",
                "@media (max-width: 1024px)": {
                  alignItems: "stretch",
                  flexDirection: "column",
                },
              }}
            >
              <Input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                //variant="filled"
                size="medium"
                placeholder=""
                /*
                InputProps={{
                  disableUnderline: true,
                }}
                */
                margin={"none"}
                sx={{
                  // width: "50%",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  paddingLeft: "8px",
                  paddingRight: "60px",
                  textAlign: "center",
                }}
              />
              <Typography
                sx={{ width: "100", paddingLeft: "20px", color: "#C1FD35" }}
                variant="h6"
              >
                {validationError}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "25px",
              paddingTop: "15px",
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "colum",
              "@media (max-width: 1024px)": {
                width: "100%",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "colum",
                maxWidth: "100%",
              },
            }}
          >
            <Button
              disabled={buttonDisabled}
              variant="primary"
              color="secondary"
              size="large"
              type="submit"
              sx={{
                width: "100%",
                paddingTop: "10px",
                textTransform: "none",
                borderColor: "transparent", // Desactivar el color del borde
                backgroundColor: buttonDisabled ? "#CECECE" : "#C1FD35", // Cambiar el color del botón según la visibilidad del error
                "&:hover": {
                  backgroundColor: buttonDisabled ? "#CECECE" : "#C1FD35", // Cambiar el color del botón según la visibilidad del error,
                  "@media (max-width: 1024px)": {
                    display: "flex",
                    alignItems: "stretch",
                    flexDirection: "colum",
                    maxWidth: "100%",
                    width: "100%",
                  },
                },
              }}
              onClick={handleClick}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default AddAccountNumber;
