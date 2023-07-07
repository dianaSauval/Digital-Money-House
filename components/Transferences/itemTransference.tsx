import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { ITransference } from "../../data";

type Props = {
  transference: ITransference;

}

const ItemTranference = ({ transference }: Props) => {

  const parseDate = () => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fecha = new Date(transference.dated);
    const diaSemanaNumerico = fecha.getDay();
    return diasSemana[diaSemanaNumerico];
  };

  return (
    <Link href={`/transferencias/${transference.id}`}
      style={{ textDecoration: "none", color: "unset" }}>
      <ListItem alignItems="flex-start"
        sx={{ display: "flex", alignItems: "center", "&:hover": { backgroundColor: "#EEEAEA", }, }}>
        <ListItemAvatar>
          <Avatar alt="R" sx={{ backgroundColor: "#C1FD35", color: "#000" }} />
        </ListItemAvatar>
        <ListItemText
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          primary={transference.description}
        >
        </ListItemText>
        <ListItemText
          sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}
          primary={`$ ${transference.amount} ARS`}
          secondary={parseDate()}
        />
      </ListItem>
    </Link>
  );
};

export default ItemTranference;