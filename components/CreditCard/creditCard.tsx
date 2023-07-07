import { useEffect, useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import InputMask from "react-input-mask";
import { Button, Box, Alert } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import catchError from "../../services/creditCard/handle-credit-cards-errors";
import { useRouter } from "next/router";
interface PropsCard {
  listar: boolean;
}
const CreditCard = ({ listar }: PropsCard) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDisabled] = useState(false);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focused, setFocused] = useState(undefined);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    setState({
      number: number,
      name: name,
      expiry: expiry,
      cvc: cvc,
    });
  }, [number, name, expiry, cvc]);

  const handleInputFocus = ({ target }: any) => {
    setFocused(target.id);
  };

  const onSubmit = async () => {
    if (state.cvc === "" || state.name === "" || state.number === "") {
      setError("Por favor, complete todos los campos");
    } else {
      const token = localStorage.getItem("token");
      const account_id = localStorage.getItem("accountId");
      const numberWithoutSpaces = number.replace(/\s/g, "");
      const convertedNumber = parseInt(numberWithoutSpaces);
      console.log(convertedNumber);
      const infoData = {
        cod: parseInt(cvc),
        expiration_date: expiry,
        first_last_name: name,
        number_id: convertedNumber,
      };
      try {
        const config = {
          method: "post",
          url: `https://digitalmoney.ctd.academy/api/accounts/${account_id}/cards`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: infoData,
        };
        axios
          .request(config)
          .then((response) => {
            setSuccess(true);
            if (listar) {
              router.push("/listar-tarjetas");
            } else {
              router.push("/cargar-dinero/cargar-dinero-tarjeta");
            }
            return response;
          })
          .catch(function (error) {
            setSuccess(false);
            const errorMessage = catchError(error);
            setError(errorMessage);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Card
        locale={{
          valid: "MM/YYYY",
        }}
        placeholders={{
          name: "NOMBRE DEL TITULAR",
        }}
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focused}
      />
      {error !== "" && (
        <Alert
          severity="error"
          sx={{
            marginTop: "30px",
          }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{
            marginTop: "30px",
          }}
        >
          {"Se agrego la tarjeta"}
        </Alert>
      )}
      <form
        onSubmit={onSubmit}
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
            marginTop: "20px",
            display: "grid",
            "@media only screen and (max-width: 768px)": {
              gridRowGap: "20px",
              gridTemplateColumns: "minmax(50px, 300px)",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              "& .css-1yuncik-MuiFormLabel-root-MuiInputLabel-root": {
                transform: "translate(12px, 15px) scale(1)",
              },
              height: "100%",
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
          <InputMask
            style={{
              padding: "10px",
              border: "1px solid #D2FFEC",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
            mask="9999 9999 9999 9999"
            onChange={(e: any) => setNumber(e.target.value)}
            placeholder="Número de la tarjeta*"
            maskChar=" "
            name="numberCard"
            id="number"
            onFocusCapture={handleInputFocus}
            value={number}
          ></InputMask>
          <InputMask
            style={{
              padding: "10px",
              border: "1px solid #D2FFEC",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
            mask="99/9999"
            value={expiry}
            onChange={(e: any) => setExpiry(e.target.value)}
            maskChar=" "
            id="validateDate"
            name="validateDate"
            placeholder="Fecha de vencimiento*"
            onFocusCapture={handleInputFocus}
          ></InputMask>

          <InputMask
            style={{
              padding: "10px",
              border: "1px solid #D2FFEC",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
            mask=""
            id="name"
            name="name"
            placeholder="Nombre y apellido*"
            value={name}
            maskChar=" "
            onChange={(e) => setName(e.target.value)}
            onFocusCapture={handleInputFocus}
          />

          <InputMask
            style={{
              padding: "10px",
              border: "1px solid #D2FFEC",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
            mask="999"
            value={cvc}
            onChange={(e: any) => setCvc(e.target.value)}
            maskChar=" "
            name="cvc"
            id="cvc"
            placeholder="Código de seguridad*"
            onFocusCapture={handleInputFocus}
          ></InputMask>
          <Box
            sx={{
              "@media only screen and (min-width: 768px)": {
                gridColumn: "span 2",
                maxWidth: "100%",
              },
              "@media only screen and (min-width: 1024px)": {
                gridColumn: "2",
              },
            }}
          >
            <Link
              href="#"
              style={{
                width: "100%",
                textDecoration: "none",
              }}
            >
              <Button
                variant="secondary"
                color="secondary"
                size="large"
                fullWidth
                disabled={isDisabled}
                onClick={onSubmit}
                onFocusCapture={handleInputFocus}
              >
                Continuar
              </Button>
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default CreditCard;
