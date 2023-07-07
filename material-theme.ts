import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    header: true;
    xxl: true
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    quaternary: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    quaternary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    button2: true;
    button3: true;
    error: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#201F22",
    },
    secondary: {
      main: "#C1FD35",
    },
    tertiary: {
      main: "#EEEAEA",
    },
    quaternary: {
      main: "#3A393E",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    h1: {
      fontSize: "24pt",
      fontWeight: "700",
    },
    h2: {
      fontSize: "20pt",
      fontWeight: "700",
    },
    h3: {
      fontSize: "16pt",
      fontWeight: "700",
    },
    h4: {
      fontSize: "14pt",
      fontWeight: "700",
    },
    subtitle1: {
      fontSize: "14pt",
      fontWeight: "500",
    },
    subtitle2: {
      fontSize: "12pt",
      fontWeight: "500",
    },
    button: {
      fontSize: "14pt",
      fontWeight: "700",
      textTransform: "capitalize",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "error" },
          style: {
            fontWeight: "400",
            color: "#EE3838",
            fontStyle: "italic",
            display: "block",
            position: "absolute",
            left: "0",
            "@media only screen and (max-width: 768px)": {
              fontSize: "12px",
            },
            "@media only screen and (min-width: 768px)": {
              fontSize: "15px",
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            color: "#C1FD35",
            backgroundColor: "#201F22",
            border: "solid 1px #C1FD35",
            boxShadow: "0px 4px 4px #0000004c",
            "&:hover": {
              backgroundColor: "#403e44",
            },
          },
        },
        {
          props: { variant: "primary", size: "medium" },
          style: {
            width: "140px",
            height: "40px",
          },
        },
        {
          props: { variant: "primary", color: "secondary" },
          style: {
            color: "#201F22",
            backgroundColor: "#C1FD35",
            border: "solid 1px #C1FD35",
            boxShadow: "0px 4px 4px #0000004c",
            "&:hover": {
              backgroundColor: "#a3d52e",
              borderColor: "#a3d52e",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            color: "#201F22",
            backgroundColor: "#CECECE",
            border: "solid 1px #CECECE",
            boxShadow: "0px 4px 4px #0000004c",
            "&:hover": {
              backgroundColor: "#bababa",
              borderColor: "#bababa",
            },
          },
        },
        {
          props: { variant: "secondary", size: "medium" },
          style: {
            width: "140px",
            height: "40px",
          },
        },
        {
          props: { size: "small" },
          style: {
            borderRadius: "5px",
            height: "40px",
            padding: "0px 10px",
            "@media only screen and (max-width: 768px)": {
              fontSize: "14px",
            },
          },
        },
        {
          props: { size: "large" },
          style: {
            borderRadius: "10px",
            width: "100%",
            "@media only screen and (max-width: 768px)": {
              height: "50px",
              maxWidth: "300px",
            },
            "@media only screen and (min-width: 768px)": {
              height: "64px",
              maxWidth: "360px",
            },
          },
        },
        {
          props: { variant: "xxl" },
          style: {
            color: "#201F22",
            backgroundColor: "#C1FD35",
            border: "solid 1px #C1FD35",
            boxShadow: "0px 4px 4px #0000004c",
            padding: "20px",
            "&:hover": {
              backgroundColor: "#a3d52e",
              borderColor: "#a3d52e",
            },
          },
        }
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#201F22",
            color: "#EEEAEA",
            padding: "30px 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "self-start",
            gap: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px #0000004c"
          }
        }
      ]
    },
  },
});

export const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; palette: { primary: { main: any; }; }; }) => ({
  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1),
      boxShadow: "0px 4px 4px #0000004c",
      backgroundColor: "#f1f1f1",
      "& fieldset": {
        borderColor: "#dddddd",
      },
      "&:hover fieldset": {
        borderColor: "#aaaaaa",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInputBase-input": {
      padding: theme.spacing(1),
    },
    "& .MuiInputAdornment-root": {
      marginRight: theme.spacing(1),
      color: "#888888",
    },
  },
  textFieldFilter: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: "56px",
      boxShadow: "0px 4px 4px #0000004c",
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
      width: "100%",
      borderRadius: "8px",
      backgroundColor: "white",
    },
  }
}));
