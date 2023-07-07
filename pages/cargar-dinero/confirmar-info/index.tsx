import { Box, Button, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import Head from "next/head";
import CheckInfoBox from "../../../components/ChargeInfo/CheckInfoBox";
import ArrowSubtitleMobile from "../../../components/ArrowSubtitleMobile";
import { useAccountContext } from "../../../context/accountContext";
import axios from "axios";
import Link from "next/link";
import useAccount from "../../../hooks/useAccount";

const CheckInfo = () => {
  const { userAccount, isLoading } = useAccount();
  const [isLoadingCard, setisLoadingCard] = useState(true);
  const [moneyToCharge, setMoneyToCharge] = useState<string | null>("");
  const [cardInfo, setCardInfo] = useState({
    account_id: "",
    cod: 0,
    expiration_date: "",
    first_last_name: "",
    id: 0,
    number_id: 0,
  });

  useEffect(() => {
    if (localStorage.getItem("moneyToCharge") !== null) {
      setMoneyToCharge(localStorage.getItem("moneyToCharge"));
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");
    const cardId = localStorage.getItem("cardId");

    const fetchData = async () => {
      try {
        const configCard = {
          method: "get",
          url: `https://digitalmoney.ctd.academy/api/accounts/${accountId}/cards/${cardId}`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.request(configCard);
        setCardInfo(response.data);
      } catch (err) {
        return err;
      }
      setisLoadingCard(false);
    };
    if (isLoadingCard) {
      fetchData();
    }
  });

  const handleContinuarClick = () => {
    handleChargeMoney();
    localStorage.removeItem("cardId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("moneyToCharge");
  };

  const handleChargeMoney = () => {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");

    if (token === null || moneyToCharge === null) {
      return;
    }
    const currentDate = new Date();

    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Agregar ceros iniciales si es necesario
    const day = currentDate.getUTCDate().toString().padStart(2, "0");
    const hours = currentDate.getUTCHours().toString().padStart(2, "0");
    const minutes = currentDate.getUTCMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getUTCSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;


    const infoData = {
      amount: parseInt(moneyToCharge),
      dated: formattedDate,
      destination: userAccount?.cvu,
      origin: `${cardInfo?.account_id}`,
    };
    console.log(infoData);
    const postChargeMoney = async () => {
      try {
        const configCard = {
          method: "post",
          url: `https://digitalmoney.ctd.academy/api/accounts/${accountId}/deposits`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: infoData
        };
        const response = await axios.request(configCard);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    postChargeMoney();
    return "hola";
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
          "@media (max-width: 767px)": {
            display: "none",
          },
          "@media (max-width: 1301px)": {
            width: "221px"
          },
        }}
      />
      {userAccount ?
        <Box sx={{
          display: "flex",
          paddingTop: "64px",
          alignItems: "center",
          paddingLeft: "80px",
          paddingRight: "30px",
          width: "100%",
          backgroundColor: "#EEEAEA",
          flexDirection: "column",
          "@media (max-width: 767px)": {
            paddingTop: "40px",
            justifyContent: "flex-start",
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        }}>
          <Box sx={{
            display: "none",
            "@media only screen and (max-width: 767px)": {
              width: "100%",
              paddingBottom: "20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }
          }}>
            <ArrowSubtitleMobile title={"Cargar dinero"} />
          </Box>
          <CheckInfoBox handleChargeMoney={handleChargeMoney} isLoading={isLoading} userAccount={userAccount} />
          <Box sx={{
            display: "none",
            "@media (max-width: 767px)": {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              paddingTop: "20px",
              paddingBottom: "20px"
            },
          }}>
            <Link href={{
              pathname: "exitosa-carga"
            }}>
              <Button variant="primary" color="secondary"
                sx={{
                  width: "165px",
                  height: "50px",
                }}
                onClick={handleContinuarClick}
              >
                <Typography variant="button">
                  Continuar
                </Typography>
              </Button>
            </Link>
          </Box>
        </Box>
        : ""}
    </>
  );
};

CheckInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default CheckInfo;