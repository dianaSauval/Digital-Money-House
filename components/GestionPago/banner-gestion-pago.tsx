import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BannerGestionPago = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "var(--lime-green)",
        width: "100%",
        height: "100%",
        maxHeight: "116px",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "0.2s",
        "&:active": {
          transform: "scale(0.99)",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          padding: "30px",
        }}
      >
        Gestion de pagos
      </Typography>
      <ArrowForwardIcon
        sx={{
          marginRight: "50px",
          fontSize: "35px",
        }}
      />
    </Box>
  );
};

export default BannerGestionPago;
