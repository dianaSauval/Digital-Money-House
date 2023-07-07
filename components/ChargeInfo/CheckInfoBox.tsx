import { Box, Button, Typography } from "@mui/material";
import editIconChargeMoney from "../../utils/icons/editIconChargeMoney.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAccount from "../../hooks/useAccount";

const CheckInfoBox = ({ accountInfo, handleChargeMoney }: any) => {

  const { userAccount, isLoading } = useAccount();
  const [moneyToCharge, setMoneyToCharge] = useState<string | null>("");
  const handleContinuarClick = () => {
    handleChargeMoney();
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("moneyToCharge") &&
      localStorage.getItem("moneyToCharge") !== null
    ) {
      setMoneyToCharge(localStorage.getItem("moneyToCharge"));
    }
    console.log(accountInfo);

  }, [userAccount]);

  const router = useRouter();

  return (
    <Box sx={{
      backgroundColor: "grey",
      width: "100%",
      marginLeft: "79px",
      marginRight: "79px",
      background: "#201F22",
      borderRadius: "8px",
    }}>
      <Box sx={{
        paddingLeft: "64px",
        paddingTop: "40px",
        "@media (max-width: 767px)": {
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "22px",
        },
      }}>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#C1FD35",
            }}>
            Revisá que está todo bien
          </Typography>
        </Box>
        <Box sx={{ paddingTop: "20px", paddingBottom: "10px" }}>

          <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center"
          }}>
            <Typography sx={{ color: "white", paddingBottom: "10px" }} variant="subtitle2">
              Vas a transferir
            </Typography>
            <Link
              href={{
                pathname: "/cargar-dinero/ingresar-dinero"
              }}>

              <Image
                src={editIconChargeMoney}
                width={30}
                height={30}
                style={{ marginBottom: "10px", cursor: "pointer" }}
                alt="Editar Monto"
              />
            </Link>
          </Box>
          <Typography sx={{ color: "white" }} variant="subtitle2">
            $ {moneyToCharge}
          </Typography>
        </Box>
        <Box sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Typography sx={{ color: "white", paddingBottom: "10px" }} variant="subtitle2">
            Para
          </Typography>
          <Typography sx={{ color: "white" }}
            variant="h2">
            Cuenta Propia
          </Typography>
        </Box>
        <Box sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Typography sx={{ color: "white", paddingBottom: "10px" }}>
            Brubank
          </Typography>
          {userAccount && <Typography sx={{ color: "white" }} variant="subtitle2">
            CVU: {userAccount?.cvu}
          </Typography>}
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "45px",
        paddingBottom: "45px",
        marginTop: "-40px",
        "@media (max-width: 1100px)": {
          marginTop: "0px",
          width: "100%",
          justifyContent: "center",
          paddingRight: "35px",
          paddingLeft: "35px",
          paddingTop: "30px"
        },
        "@media (max-width: 767px)": {
          display: "none",
          paddingTop: "0px"
        },
      }}>
        <Link href={{
          pathname: "exitosa-carga"
        }}>
          <Button variant="primary" color="secondary"
            sx={{
              height: "65px",
              "@media (max-width: 1100px)": {
                width: "100%"
              }
            }}
            onClick={handleContinuarClick}>
            <Typography variant="button">
              Continuar
            </Typography>
          </Button>
        </Link>
      </Box>
    </Box >
  );
};

export default CheckInfoBox;