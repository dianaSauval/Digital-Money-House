import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICard } from "../../types";

const CheckInfoBox = ({ money, info, handleChargeMoney }: any) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [card, setCard] = useState<ICard>();
  const [typeCard, setTypeCard] = useState<string>("");
  const [serviceName, setServiceName] = useState<string | null>("");
  const [carId, setCardId] = useState<string | null>("");
  const [idAccount, setIdAccount] = useState<string | null>("");

  useEffect(() => {
    if (carId !== null && idAccount !== null) {
      if (carId === "9") {
        setTypeCard("Desde cuenta terminada en ");
      }
      getCard(parseInt(carId), parseInt(idAccount));
    }
  }, []);

  useEffect(() => {
    if ((
      typeof window !== "undefined" &&
      localStorage.getItem("ServiceName") &&
      localStorage.getItem("ServiceName") !== null
    )) {
      setServiceName(localStorage.getItem("ServiceName"));
    }

    if ((
      typeof window !== "undefined" &&
      localStorage.getItem("cardId") &&
      localStorage.getItem("cardId") !== null
    )) {
      setCardId(localStorage.getItem("cardId"));
    }
    if ((
      typeof window !== "undefined" &&
      localStorage.getItem("accountId") &&
      localStorage.getItem("accountId") !== null
    )) {
      setIdAccount(localStorage.getItem("accountId"));
    }
    if (router.pathname === "/listar-servicios/pago/pago-realizado") {
      if (carId === "9") {
        return setText("Cuenta Propia");
      } else {
        return setText("Tarjeta");
      }

    } else {
      return setText("Brubank");
    }

  }, [router.pathname, text, card]);

  const handleClick = () => {
    handleChargeMoney && handleChargeMoney();
  };

  const getTypeCard = (num: number) => {
    if (num === 4) {
      setTypeCard("Visa");
    } else if (num === 5) {
      setTypeCard("MasterCard");
    } else if (num === 3) {
      setTypeCard("American Express");
    } else {
      setTypeCard("Terminada en");
    }
  };

  const getCard = async (card_id: number, idAccount: number) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `https://digitalmoney.ctd.academy/api/accounts/${idAccount}/cards/${card_id}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      axios
        .get(config.url, config)
        .then((response) => {
          console.log("tarjeta: ");
          console.log(response);
          setCard(response?.data);
          console.log("primer numero: ");
          console.log(response?.data?.number_id?.toString().slice(0, 1));
          getTypeCard(
            parseInt(response?.data?.number_id?.toString().slice(0, 1))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Ocurrió un error al realizar la solicitud:", error);
    }
  };

  const currentDate = new Date();

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthName = monthNames[currentDate.getUTCMonth()];

  const year = currentDate.getUTCFullYear();
  const day = currentDate.getUTCDate().toString().padStart(2, "0");
  const hours = currentDate.getUTCHours().toString().padStart(2, "0");
  const minutes = currentDate.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} de ${monthName} ${year} a ${hours}:${minutes} hs.`;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "grey",
          width: "100%",
          background: "#201F22",
          borderRadius: "8px",
          paddingLeft: "64px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <Box>
          <Typography sx={{ color: "white" }} variant="subtitle2">
            {formattedDate}
          </Typography>
          <Typography sx={{ color: "#C1FD35" }} variant="subtitle2">
            $ {money}
          </Typography>
        </Box>
        <Box sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Typography sx={{ color: "white" }} variant="subtitle2">
            Para
          </Typography>
          {serviceName !== "" ? (
            <Typography sx={{ color: "#C1FD35" }} variant="h2">
              {serviceName}
            </Typography>
          ) : (
            <Typography sx={{ color: "#C1FD35" }} variant="h2">
              Cuenta Propia
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Typography sx={{ color: "white" }}>{text}</Typography>
          {router.pathname === "/listar-servicios/pago/pago-realizado" ? (
            <Typography sx={{ color: "white" }} variant="subtitle2">
              {typeCard !== "Desde cuenta terminada en "
                ? `${typeCard} ************${info?.number_id
                  .toString()
                  .slice(-4)}`
                : `${typeCard} ${info?.cvu.slice(-4)}`}
            </Typography>
          ) : info && (
            <Typography sx={{ color: "white" }} variant="subtitle2">
              CVU: {info?.cvu}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          gap: "20px",
          paddingTop: "10px",
          "@media only screen and (max-width: 1098px)": {
            justifyContent: "center",
          },
          "@media only screen and (max-width: 768px)": {
            flexDirection: "column-reverse",
            paddingBottom: "30px",
          },
        }}
      >
        <Link href="/inicio">
          <Button
            variant="primary"
            sx={{
              textTransform: "none",
              backgroundColor: "#CECECE",
              borderColor: "#CECECE",
              color: "black",
              width: "233px",
              height: "65px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#a5a5a5",
                borderColor: "#a5a5a5",
              },
              "@media only screen and (max-width: 1098px)": {
                width: "243px",
              },
              "@media only screen and (max-width: 768px)": {
                width: "100%",
              },
            }}
            onClick={handleClick}
          >
            Ir al Inicio
          </Button>
        </Link>
        <Button
          variant="primary"
          color="secondary"
          sx={{
            width: "233px",
            height: "65px",
            fontSize: "16px",
            "@media only screen and (max-width: 1098px)": {
              width: "243px",
            },
            "@media only screen and (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          Descargar comprobante
        </Button>
      </Box>
    </Box>
  );
};

export default CheckInfoBox;
