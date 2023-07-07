import styles from "./addCard.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import axios from "axios";
import ListCards from "./listCard";
import { ListItemData } from "./IListCard";

const SelectCard = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isContinuar, setIsContinuar] = useState(false);
  const [isContinuarExpiredCard, setIsContinuarExpiredCard] = useState(false);
  const [width] = useDeviceSize();
  const [listCard, setListCard] = useState<ListItemData[]>([]);
  const isDelete = false;
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
      router.push("/agregar-tarjeta?listar='false'");
    } else {
      setOpen(true);
    }
  };
  const handleContinuarClick = () => {
    const carId = localStorage.getItem("cardId");
    setIsContinuarExpiredCard(false);
    setIsContinuar(false);
    if (carId && parseInt(carId) > 0) {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear();
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate)
        setVencimiento(expirationDate);
      let mesDeseado = 1;
      let anioDeseado = 1900;
      if (expirationDate !== null) {
        const [mesString, anioString] = expirationDate.split("/");
        mesDeseado = parseInt(mesString, 10);
        anioDeseado = parseInt(anioString, 10);
      }
      if (anioDeseado < anioActual
        || (anioDeseado === anioActual && mesDeseado < mesActual)) {
        setIsContinuarExpiredCard(true);

      }
      else {
        router.push("/cargar-dinero/ingresar-dinero");
      }
    }
    else {
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
          width:"100%",
          paddingTop: "10px",
        },
      }}
    >
      {width >= 768 ? (
        width <= 1024 ? (
          <Card
            sx={{
              minWidth: "100%",
              background: "#201F22",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "20px",
              "@media (max-width: 1024px)": {
                width:"100%",
                paddingTop: "10px",                
              },

            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "#C1FD35",
                  paddingLeft: "15px",
                }}
                variant="h6"
              >
                Seleccionar tarjeta
              </Typography>
            </CardContent>
            <Box sx={{
              marginBottom: "1rem",
            }} >
              <ListCards deleteCard={isDelete} />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "#C1FD35",
                }}
              >
                <Button
                  onClick={handleClick}
                  style={{
                    textTransform: "none",
                    color: "#C1FD35",
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
              </CardContent>

              <Button
                onClick={handleContinuarClick}
                variant="primary"
                color="secondary"
                size="large"
                type="submit"
                sx={{
                  "@media (max-width: 1024px)": {
                    paddingTop: "10px",
                    size: "large",
                    display: "flex",
                    alignItems:"stretch",
                    flexDirection: "colum",
                    maxWidth: "100%", 
                    width: "100%"
                  },
                }}>
                  Continuar
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
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
                  {vencimiento && `La tarjeta seleccionada está vencida: ${vencimiento}`}
                </MuiAlert>
              </Snackbar>
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{
              minWidth: "100%",
              background: "#201F22",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "20px",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "#C1FD35",
                  paddingLeft: "15px",
                }}
                variant="h6"
              >
                Seleccionar tarjeta
              </Typography>
            </CardContent>
            <Box sx={{
              marginBottom: "1rem",
            }} >
              <ListCards deleteCard={isDelete} />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  color: "#C1FD35",
                }}
              >
                <Button
                  onClick={handleClick}
                  style={{
                    textTransform: "none",
                    color: "#C1FD35",
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
              </CardContent>
              <Button
                onClick={handleContinuarClick}
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
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
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
                  {vencimiento && `La tarjeta seleccionada está vencida: ${vencimiento}`}
                </MuiAlert>
              </Snackbar>
            </CardContent>
          </Card>
        )
      ) : (
        <Card
          sx={{
            minWidth: "100%",
            background: "#201F22",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "20px",
            "@media (max-width: 768px)": {
              width:"100%",
              paddingTop: "10px",
            },
            
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "#C1FD35",
                paddingLeft: "15px",
              }}
              variant="h6"

            >
              Seleccionar tarjeta
            </Typography>
          </CardContent>
          <Box sx={{
            marginBottom: "1rem",
          }} >
            <ListCards deleteCard={isDelete} />
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                color: "#C1FD35",
              }}
            >
              <Button
                onClick={handleClick}
                style={{
                  textTransform: "none",
                  color: "#C1FD35",
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
            </CardContent>
            <Button
              onClick={handleContinuarClick}
              variant="primary"
              color="secondary"
              size="large"
              type="submit"
              sx={{
                maxWidth:"768px",
                marginTop: "10px",
                "@media (max-width: 1024px)": {
                  size: "large",
                  display: "flex",
                  alignItems:"stretch",
                  flexDirection: "colum",
                  maxWidth: "100%", 
                  width: "100%"
                },
              }}
            >
              Continuar
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
            >
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
                {vencimiento && `La tarjeta seleccionada está vencida: ${vencimiento}`}
              </MuiAlert>
            </Snackbar>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SelectCard;

