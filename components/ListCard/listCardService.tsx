import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import GenerateListCard from "./listCardComponent";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { FC } from "react";
import CheckedCards from "./checkedCard";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import DeleteCards from "./deleteCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListItemData } from "./IListCard";
import useAccount from "../../hooks/useAccount";
interface Props {
  deleteCard: boolean;
}

const ListCardsService: FC<Props> = (Props) => {
  const [listCard, setListCard] = useState<ListItemData[]>();
  const [idAccount, setIdAccount] = useState<number>(0);
  const [idCardSelect, setIdCardSelect] = useState<number>(0);
  const { userAccount, isLoading } = useAccount();

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
          setListCard(response.data);
          setIdCardSelect(
            response.data.length > 0 ? (response.data[0] as ListItemData).id : 0
          );
          handleSelect(
            response.data.length > 0
              ? (response.data[0] as ListItemData).id
              : 0,
            response.data.length > 0
              ? (response.data[0] as ListItemData).expiration_date
              : "01/2000"
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleDelete = async (
    card_id: number,
    idAccount: number,
    list: ListItemData[]
  ) => {
    try {
      const nuevaLista = list.filter((item) => item.id !== card_id);
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `https://digitalmoney.ctd.academy/api/accounts/${idAccount}/cards/${card_id}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      axios
        .delete(config.url, config)
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
      if (expiration_date.length)
        localStorage.setItem("expirationDate", expiration_date);
      localStorage.setItem("cardId", card_id.toString());
    } catch (error) {
      console.error("Ocurrió un error al checkear:", error);
    }
  };
  return (
    <Box
      sx={{
        overflow: "auto",
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px #0000004c",
      }}
    >
      <List sx={{ width: "100%" }}>
        <ListItem sx={{ padding: "20px" }}>
          <Typography variant="h4" sx={{}}>
            Paga con tu saldo
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ListItemAvatar>
            <CircleIcon color="secondary" fontSize="large" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body1">
                $ {userAccount.available_amount},00
              </Typography>
            }
          />
          <CheckedCards
            refreshlista={handleSelect}
            data={{
              account_id: 0,
              cod: 0,
              expiration_date: "01/3000",
              first_last_name: "",
              id: 9,
              number_id: 0,
            }}
            selectid={idCardSelect}
            list={[]}
          />
        </ListItem>
        <ListItem sx={{ padding: "20px" }}>
          <Typography variant="h4" sx={{}}>
            Tus tarjetas
          </Typography>
        </ListItem>
        {listCard?.map((item, index) => (
          <>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <CircleIcon color="secondary" fontSize="large" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    Terminada en {item.number_id.toString().slice(-4)}
                  </Typography>
                }
              />
              <CheckedCards
                refreshlista={handleSelect}
                data={item}
                selectid={idCardSelect}
                list={[]}
              />
            </ListItem>
            {index !== listCard.length - 1 && (
              <Divider variant="middle"></Divider>
            )}
          </>
        ))}
      </List>
    </Box>
  );
};

export default ListCardsService;
