import { ReactElement, useEffect, useState } from "react";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import Head from "next/head";
import { ITransference } from "../../data";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Transference = () => {

  const router = useRouter();
  const { id } = router.query;
  const [transference, setTransference] = useState<ITransference>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const account = localStorage.getItem("accountId");
    const configTransference = {
      method: "get",
      url: `https://digitalmoney.ctd.academy/api/accounts/${account}/transactions/${id}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(configTransference)
      .then((response) => {
        setTransference(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const getParseDate = () => {
    const fechaOriginal = transference?.dated;
    if (fechaOriginal) {
      const fechaParseada = new Date(fechaOriginal);

      const dia = fechaParseada.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
      const hora = fechaParseada.toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric" });

      return `Creada el ${dia} a las ${hora} hs.`;
    }
  };


  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
      </Head>
      <Box
        sx={{
          width: "276px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 768px)": {
            display: "none",
          },
          "@media (max-width: 1301px)": {
            width: "221px"
          },
        }}></Box>
      <Box sx={{ display: "flex", width: "100%", padding: "50px", paddingLeft: "100px", backgroundColor: "#EEEAEA", justifyContent: "center", alignItems: "center", "@media (max-width: 768px)": { padding: "10px", paddingTop: "50px" } }}>
        <Card variant="outlined" sx={{ width: "100%", "@media (max-width: 768px)": { padding: "20px" } }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", borderBottom: "2px solid #EEEAEA", paddingBottom: "15px" }}>
            <Typography variant="h2" sx={{ display: "flex", alignItems: "center", gap: "5px", color: "#C1FD35" }}>
              <CheckCircleOutlineIcon fontSize="large"></CheckCircleOutlineIcon>
              Aprobada
            </Typography>
            <Typography variant="subtitle1" sx={{ "&:hover": { color: "#C1FD35", } }}>
              {getParseDate()}
            </Typography>
          </Box>
          <Divider variant="middle"></Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="h4" >{transference && transference?.amount <= 0 ? "Transferencia de dinero" : "Deposito de dinero"}</Typography>
            <Typography variant="h2" sx={{ color: "#C1FD35" }}>
              $ {transference?.amount} ARS
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle1">Descripción</Typography>
            <Typography variant="h1" sx={{ color: "#C1FD35" }}>
              {transference?.description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle1" >Número de operación</Typography>
            <Typography variant="subtitle1" sx={{ color: "#C1FD35" }}>
              0000000{transference?.id}
            </Typography>
          </Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/inicio" >
              <Button variant="secondary" size="large" sx={{ width: "360px", "@media (max-width:1200px)": { width: "100%", maxWidth: "100%" } }}>Ir al Inicio</Button>
            </Link>
            <Link href="/actividad" >
              <Button variant="primary" color="secondary" size="large" sx={{ width: "360px", "@media (max-width:1200px)": { width: "100%", maxWidth: "100%" } }}>Tu actividad</Button>
            </Link>
          </Box>

        </Card>

      </Box>
    </>
  );
};


Transference.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default Transference;
