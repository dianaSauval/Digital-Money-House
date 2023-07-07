import { Box } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { NextPageWithLayout } from "../../../_app";
import ArrowSubtitleMobile from "../../../../components/ArrowSubtitleMobile";
import AlertChargeBox from "../../../../components/ChargeInfo/AlertChargeBox";
import SuccessChargeBox from "../../../../components/ChargeInfo/SuccessChargeBox";
import Layout from "../../../../layout/layout";
import ErrorInfoBox from "../../../../components/ChargeInfo/ErrorInfoBox";
import useAccount from "../../../../hooks/useAccount";
import axios from "axios";
import { useAccountContext } from "../../../../context/accountContext";

const PaymentMade: NextPageWithLayout<any> = () => {
  const { userAccount } = useAccount();
  const { accountInfo } = useAccountContext();
  const [isLoad, setIsLoad] = useState(true);
  const [moneyToCharge, setMoneyToCharge] = useState<string | null>("");
  const [serviceName, setServiceName] = useState<string | null>("");


  const [cardInfo, setCardInfo] = useState({
    account_id: "",
    cod: 0,
    expiration_date: "",
    first_last_name: "",
    id: 0,
    number_id: 0,
  });
  const [titleError, setTitleError] = useState<string>("");
  const [textError, setTextError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");

    const cardId =  localStorage.getItem("cardId") && localStorage.getItem("cardId");



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
      setIsLoad(false);
    };
    if (cardId)
    {
      if (isLoad) {
        fetchData();
      }
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("moneyToCharge") && localStorage.getItem("moneyToCharge") !== null) {
      setMoneyToCharge(localStorage.getItem("moneyToCharge"));

    }
    if (typeof window !== "undefined" && localStorage.getItem("ServiceName") && localStorage.getItem("ServiceName") !== null) {
      setServiceName(localStorage.getItem("ServiceName"));
    }

    if (moneyToCharge !== null) {
      if (parseInt(moneyToCharge) > parseInt(userAccount.available_amount)) {
        setTitleError("Hubo un problema con tu pago");
        setTextError(
          "Puede deberse a fondos insuficientes. Comunicate con la entidad emisora de la tarjeta"
        );
      }
    }
    console.log("moneyToCharge: " + moneyToCharge);

  }, [moneyToCharge]);



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
      account_id: `${cardInfo?.account_id}`,
      type: "Transfer",
      description: "Transferiu para Servicio",
      origin: accountInfo?.cvu,
      destination: `${serviceName}`,
      amount: - parseInt(moneyToCharge),
      dated: formattedDate
    };
    console.log("infoData: ");
    console.log(infoData);
    const postChargeMoney = async () => {
      try {
        const configCard = {
          method: "post",
          url: `https://digitalmoney.ctd.academy/api/accounts/${accountId}/transferences`,
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
  };

  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
      </Head>
      <Box
        sx={{
          width: "265px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 768px)": {
            display: "none",
          },
          "@media (max-width: 1301px)": {
            width: "221px",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "50px",
          width: "100%",
          backgroundColor: "#EEEAEA",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "50px",
          paddingRight: "50px",
          "@media only screen and (max-width: 1300px)": {
            marginLeft: "45px",
          },
          "@media only screen and (max-width: 768px)": {
            paddingRight: "20px",
            paddingLeft: "20px",
            marginLeft: "0px",
            paddingTop: "30px",
          },
        }}
      >
        <Box
          sx={{
            display: "none",
            "@media only screen and (max-width: 768px)": {
              width: "100%",
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            },
          }}
        >
          <ArrowSubtitleMobile title={"Cargar dinero"} />
        </Box>
        {titleError !== "" ? (
          <ErrorInfoBox titleError={titleError} textError={textError} />
        ) : (
          <>
            <AlertChargeBox />
            <SuccessChargeBox info={cardInfo} money={moneyToCharge} handleChargeMoney={handleChargeMoney} />
          </>
        )}

      </Box>
    </>
  );
};

PaymentMade.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default PaymentMade;
