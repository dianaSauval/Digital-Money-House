import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--dark-grey)",
        zIndex: "2",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "var(--lime-green)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          "@media only screen and (max-width: 768px)": {
            justifyContent: "center",
          },
          "@media only screen and (min-width: 768px)": {
            paddingLeft: "20px",
            justifyContent: "left",
          },
        }}
      >
        © 2023 Digital Money House
      </Typography>
    </Box>
  );
};

export default Footer;
