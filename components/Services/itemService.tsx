import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { IService } from "../../types";
import { OndemandVideo } from "@mui/icons-material";

type Props = {
  service: IService;
};

const ItemService = ({ service }: Props) => {
  return (
    <Link
      href={`/ingresar-numero-cuenta/${service.id}`}
      style={{ textDecoration: "none", color: "unset" }}
    >
      <ListItem
        alignItems="flex-start"
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover": { backgroundColor: "#C1FD35" },
        }}
      >
        <ListItemAvatar>
          <OndemandVideo sx={{ color: "var(--dark-grey)" }} />
        </ListItemAvatar>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          primary={service.name}
        >
        </ListItemText>
        <Button sx={{ transition: "none", "&:hover": { backgroundColor: "#C1FD35", }, }}>Seleccionar</Button>
      </ListItem>
    </Link>
  );
};

export default ItemService;
