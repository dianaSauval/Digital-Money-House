import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";
import {ListItemText, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteCards from "./deleteCard";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckedCards from "./checkedCard";
import { ListItemData } from "./IListCard";

const GenerateListCard = (deleteCard: boolean) => {
  const [listCard, setListCard] = useState<ListItemData[]>();
  const [idAccount, setIdAccount] = useState<number>(0);
  const [idCardSelect, setIdCardSelect] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios("https://digitalmoney.ctd.academy/api/account", {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      setIdAccount(response.data?.id);
    });
  }, [idAccount]);

  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      const token = localStorage.getItem("token");
      const account = localStorage.getItem("accountId");
      const config = {
        method: "get",
        url: `https://digitalmoney.ctd.academy/api/accounts/${account}/cards`,
        headers: {
          Authorization: token,
        },
        data: "",
      };
      axios
        .request(config)
        .then((response) => {
          setListCard(
            response.data
          );
          setIdCardSelect(response.data.length > 0 ? (response.data[0] as ListItemData).id : 0);
          handleSelect(response.data.length > 0 ? (response.data[0] as ListItemData).id : 0,response.data.length > 0 ? (response.data[0] as ListItemData).expiration_date : "01/2000");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleDelete = async (card_id: number, idAccount: number, list: ListItemData[]) => {
    try {
      const nuevaLista = list.filter(item => item.id !== card_id);
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `https://digitalmoney.ctd.academy/api/accounts/${idAccount}/cards/${card_id}`,
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      };
      axios.delete(config.url, config)
        .then(() => {
          setListCard(nuevaLista);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Ocurrió un error al realizar la solicitud DELETE:", error);
    }
  };
  const handleSelect = async (card_id: number, expiration_date: string) => {
    try {
      setIdCardSelect(card_id);
      if(expiration_date.length)
        localStorage.setItem("expirationDate",expiration_date);
      localStorage.setItem("cardId", card_id.toString()); 
    } catch (error) {
      console.error("Ocurrió un error al checkear:", error);
    }
  };
  return listCard?.map((item) => (
    <>
      <ListItem sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <ListItemAvatar>
          <CircleIcon color="secondary" fontSize="large" />
        </ListItemAvatar>
        < ListItemText primary={
          <Typography variant="body1">
            Terminada en {item.number_id.toString().slice(-4)}
          </Typography>}
        />
        {deleteCard ?  
          <ListItemIcon >
            <DeleteCards refreshlista={handleDelete} list={listCard} data={item} />
          </ListItemIcon>
          : 
          <CheckedCards refreshlista={handleSelect} data={item} selectid={idCardSelect} list={[]} />
        }
      </ListItem>
      <Divider variant="middle"></Divider>
    </>
  ));
};

export default GenerateListCard;
