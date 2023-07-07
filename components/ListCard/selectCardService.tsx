import styles from "./addCard.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import axios from "axios";
import ListCardsService from "./listCardService";
import { ListItemData } from "./IListCard";
import Link from "next/link";
import { useServices } from "../../hooks/useServices";

const SelectCardService = () => {

  const router = useRouter();
  const serviceId = useRouter().query.id as string;
  const [open, setOpen] = useState(false);
  const [isContinuar, setIsContinuar] = useState(false);
  const [isContinuarExpiredCard, setIsContinuarExpiredCard] = useState(false);
  const [listCard, setListCard] = useState<ListItemData[]>([]);
  const [search, setSearch] = useState("");
  const [moneyToCharge, setMoneyToCharge] = useState(0);
  const isDelete = false;
  const [services] = useServices({ search });

  const actualServices = services.filter(
    (item) => item.id == parseInt(serviceId)
  );

  useEffect(() => {
    setMoneyToCharge(getRandomInt(0, 10000));
  }, []);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


  const [vencimiento, setVencimiento] = useState("01/2000");
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      const token = localStorage.getItem("token");
      const account = localStorage.getItem("accountId");
      const config = {
        method: "get",
        url: `https://digitalmoney.ctd.academy/api/accounts/${account}/cards`,
        headers: {
          Authorization: token,
        },
        data: "",
      };
      axios
        .request(config)
        .then((response) => {
          setListCard(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleClick = () => {
    setIsContinuar(false);
    if (listCard?.length < 10) {
      router.push(
        "/listar-servicios/agregar-tarjeta?listar='false'&id=" + serviceId
      );
    } else {
      setOpen(true);
    }
  };
  const handleContinuarClick = () => {
    localStorage.setItem("ServiceName", `${actualServices[0]?.name}`);
    localStorage.setItem("moneyToCharge", moneyToCharge.toString());
    const carId = localStorage.getItem("cardId");
    setIsContinuarExpiredCard(false);
    setIsContinuar(false);
    if (carId && parseInt(carId) > 0) {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear();
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate) setVencimiento(expirationDate);
      let mesDeseado = 1;
      let anioDeseado = 1900;
      if (expirationDate !== null) {
        const [mesString, anioString] = expirationDate.split("/");
        mesDeseado = parseInt(mesString, 10);
        anioDeseado = parseInt(anioString, 10);
      }
      if (
        anioDeseado < anioActual ||
        (anioDeseado === anioActual && mesDeseado < mesActual)
      ) {
        setIsContinuarExpiredCard(true);
      } else {
        //router.push(`/listar-servicios/pago/${serviceId}`);
        router.push("/listar-servicios/pago/pago-realizado");
      }
    } else {
      setIsContinuar(true);

    }
  };
  const handleClose = () => {
    setOpen(false);
    setIsContinuar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        "@media (max-width: 1024px)": {
          width: "100%",
          paddingTop: "10px",
        },
      }}
    >
      <Box
        sx={{
          minWidth: "100%",
          backgroundColor: "#EEEAEA",
          boxShadow: "none",
          borderRadius: "10px",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "var(--main-bg-color)",
            borderRadius: "8px",
            padding: "25px 50px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--main-accent-color)",
              }}
            >
              {actualServices[0]?.name}
            </Typography>

            <Typography
              sx={{ cursor: "pointer", textDecoration: "underline white", fontSize: "16px", fontWeight: "600", color: "white" }}
            >
              Ver detalles del pago
            </Typography>
          </Box>
          <Divider
            sx={{
              width: "100%",
              border: "1px solid rgba(58, 57, 62, 1)",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "white",
              }}
            >
              Total a pagar
            </Typography>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "700", color: "white" }}
            >
              ${moneyToCharge}
            </Typography>
          </Box>
        </Box>
        <ListCardsService deleteCard={isDelete} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            onClick={handleClick}
            style={{
              textTransform: "none",
              color: "#201f22",
            }}
          >
            <AddCircleOutlineIcon
              className={styles.icon}
              sx={{ fontSize: "24px" }}
            />
            <Typography
              sx={{
                paddingLeft: "10px",
              }}
              variant="h6"
              style={{ textTransform: "none" }}
            >
              Nueva tarjeta
            </Typography>
          </Button>
          <Button
            onClick={handleContinuarClick}
            sx={{
              "@media only screen and (max-width: 768px)": {
                maxWidth: "165px",
                width: "100%",
                height: "50px",
                color: "#201F22",
                backgroundColor: "#C1FD35",
                border: "solid 1px #C1FD35",
                boxShadow: "0px 4px 4px #0000004c",
                "&:hover": {
                  backgroundColor: "#a3d52e",
                  borderColor: "#a3d52e",
                },
              },
              "@media only screen and (min-width: 768px)": {
                maxWidth: "200px",
                width: "100%",
                height: "64px",
                color: "#201F22",
                backgroundColor: "#C1FD35",
                border: "solid 1px #C1FD35",
                boxShadow: "0px 4px 4px #0000004c",
                "&:hover": {
                  backgroundColor: "#a3d52e",
                  borderColor: "#a3d52e",
                },
              },
            }}
          >
            Pagar
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert
              onClose={handleClose}
              severity="warning"
              elevation={6}
              variant="filled"
            >
              No se pueden Agregar mas de 10 Tarjetas
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={isContinuar}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <MuiAlert
              onClose={handleClose}
              severity="warning"
              elevation={6}
              variant="filled"
            >
              Debe Seleccionar una tarjeta para Continuar
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={isContinuarExpiredCard}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <MuiAlert
              onClose={handleClose}
              severity="warning"
              elevation={6}
              variant="filled"
            >
              {vencimiento &&
                `La tarjeta seleccionada está vencida: ${vencimiento}`}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectCardService;
