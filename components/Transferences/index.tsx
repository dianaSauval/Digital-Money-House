import Link from "next/link";
import { Search } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField, InputAdornment, Box, List, ListItem, Typography } from "@mui/material";
import { useStyles } from "../../material-theme";
import ListTranference from "./listTranference";

const Transferences = () => {
  const classes = useStyles();
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form style={{ width: "100%", borderRadius: "10px" }} onSubmit={handleSearch}>
        <TextField
          size="medium"
          sx={{ width: "100%", maxWidth: "100%", backgroundColor: "#FFF", }}
          className={classes.textFieldFilter}
          placeholder="Buscar en tu actividad"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ backgroundColor: "#FFF" }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Box sx={{ width: "100%", backgroundColor: "#FFF", borderRadius: "10px", boxShadow: "0px 4px 4px #0000004c", }}>
        <List sx={{ width: "100%", }}>
          <ListItem sx={{ padding: "20px" }}>
            <Typography variant="h4" sx={{}}>Tu actividad</Typography>
          </ListItem>
          <ListTranference></ListTranference>
          <ListItem sx={{ padding: "20px" }} >
            <Link href="/actividad" style={{ display: "flex", width: "100%", justifyContent: "space-between", color: "#000" }}>
              <Typography variant="h4" sx={{}}>Ver toda tu actividad</Typography>
              <ArrowForwardIcon></ArrowForwardIcon>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Transferences;