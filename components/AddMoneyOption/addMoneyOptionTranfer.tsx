import styles from "../ListCard/addCard.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import useDeviceSize from "../../hooks/useDeviceSize";
import router from "next/router";
const AddMoneyOptionTransfer = () => {
  const [width] = useDeviceSize();
  const handleClick = () => {
    router.push( "/cargar-dinero/cargar-dinero-transferencia");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        "@media (max-width: 768px)": {
          paddingTop: "10px",
        },
      }}
    >
      {width > 768 ? (
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
            }}
          >
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
                  <Image
                    src="/assets/icon_user.png"
                    alt="Icono"
                    sizes='24px'
                    width={36}
                    height={36}
                  />
                  <Typography
                    sx={{
                      paddingLeft: "10px",
                    }}
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Transferencia bancaria
                  </Typography>
                </Button>
              </CardContent>
              <Button
                onClick={handleClick}
                style={{
                  textTransform: "none",
                  color: "#C1FD35",
                }}
              >
                <Typography
                  sx={{
                    color: "#C1FD35",
                  }}
                  variant="h6"
                  style={{ textTransform: "none" }}
                >
                  <ArrowForwardIcon sx={{ fontSize: "24px" }} />
                </Typography>
              </Button>
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
                  <Image
                    src="/assets/icon_user.png"
                    alt="Icono"
                    sizes='24px'
                    width={36}
                    height={36}
                  />
                  <Typography
                    sx={{
                      paddingLeft: "10px",
                    }}
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Transferencia bancaria
                  </Typography>
                </Button>
              </CardContent>
              <Button
                onClick={handleClick}
                style={{
                  textTransform: "none",
                  color: "#C1FD35",
                }}
              >
                <Typography
                  sx={{
                    color: "#C1FD35",
                  }}
                  variant="h6"
                  style={{ textTransform: "none" }}
                >
                  <ArrowForwardIcon sx={{ fontSize: "24px" }} />
                </Typography>
              </Button>
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
          }}
        >
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
                <Image
                  src="/assets/icon_user.png"
                  alt="Icono"
                  sizes='24px'
                  width={36}
                  height={36}
                />
                <Typography
                  sx={{
                    paddingLeft: "10px",
                    align:"justify",
                    textAlign: "left", 
                  }}
                  variant="h6"
                  style={{ textTransform: "none" }}
                >
                  Transferencia bancaria
                </Typography>
              </Button>
            </CardContent>
            <Button
              onClick={handleClick}
              style={{
                textTransform: "none",
                color: "#C1FD35",
              }}
            >
              <Typography
                sx={{
                  color: "#C1FD35",
                }}
                variant="h6"
                style={{ textTransform: "none" }}
              >
                <ArrowForwardIcon sx={{ fontSize: "24px" }} />
              </Typography>
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AddMoneyOptionTransfer;


