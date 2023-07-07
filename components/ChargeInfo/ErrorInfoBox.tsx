import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useRouter } from "next/router";

type Props = {
  titleError: string;
  textError: string;
};

const ErrorInfoBox = ({ titleError, textError }: Props) => {
  const router = useRouter();

  const handlerClick = () => {
    router.push("/listar-servicios");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "grey",
          width: "100%",
          marginLeft: "79px",
          marginRight: "79px",
          background: "#201F22",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            paddingTop: "20px",
            "@media (max-width: 767px)": {
              paddingTop: "40px",
            },
          }}
        >
          <Box sx={{ paddingTop: "20px", paddingBottom: "10px" }}>
            <Box
              sx={{
                paddingTop: "10px",
                paddingBottom: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <CancelOutlinedIcon
                sx={{
                  color: "red",
                  fontSize: "45px",
                }}
              />
              <Typography sx={{ color: "white" }} variant="h2">
                {titleError}
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "#3A393E",
                  height: "2px",
                  width: "90%",
                }}
                variant="middle"
              ></Divider>
              <Box
                sx={{
                  textAlign: "center",
                  width: "40%",
                  "@media (max-width: 768px)": {
                    width: "80%",
                  },
                }}
              >
                <Typography sx={{ color: "white" }}>{textError}</Typography>
              </Box>
            </Box>
          </Box>
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
          onClick={handlerClick}
        >
          Volver a intentarlo
        </Button>
      </Box>
    </>
  );
};

export default ErrorInfoBox;
