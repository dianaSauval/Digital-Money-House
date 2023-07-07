import { Radio } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ListItemData } from "./IListCard";


interface Props {
  selectid: number
  data: ListItemData
  list: ListItemData[]
  refreshlista: (card_id: number, expiration_date: string) => void
}

const CheckedCards: FC<Props> = ({ selectid, data, refreshlista }: Props) => {
  const [idAccount, setIdAccount] = useState(0);
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

  return (
    <>
      <Radio
        border-color="default"
        color="secondary"
        checked={data.id === selectid}
        onChange={() => refreshlista(data.id, data.expiration_date)}
        value={data.id}
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      />
    </>
  );
};
export default CheckedCards;