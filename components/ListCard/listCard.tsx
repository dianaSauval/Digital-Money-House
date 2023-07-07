import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import GenerateListCard from "./listCardComponent";
import { ListItem } from "@mui/material";
import { FC } from "react";
interface Props {
  deleteCard: boolean
}


const ListCards :  FC<Props> = (Props) => {
  const listItems = GenerateListCard(Props.deleteCard);
  return (
    <Box sx={{ overflow: "auto", width: "100%", backgroundColor: "#FFF", borderRadius: "10px", boxShadow: "0px 4px 4px #0000004c", }}>
      <List sx={{ width: "100%", }}>
        <ListItem sx={{ padding: "20px" }}>
          <Typography variant="h4" sx={{}}>Tus tarjetas</Typography>
        </ListItem>
        {listItems}
      </List>
    </Box>
  );
};

export default ListCards;
