import { Button,Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ListItemData } from "./IListCard";


interface Props {
  data: ListItemData
  list: ListItemData[]
  refreshlista: (card_id: number, idAccount: number,list: ListItemData[]  ) => void
}

const DeleteCards :  FC<Props> = ({ data, list, refreshlista }: Props) => {
  const [idAccount, setIdAccount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  const handleDelete = (card_id: number,idAccount: number, list: ListItemData[]) => {
    setOpen(false);
    refreshlista(card_id,idAccount,list);
  };  
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
      <Button
        id="BotonEliminar"
        variant="primary"
        color="secondary"
        size="large"
        type="submit"
        sx={{
          marginTop: "none",
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none"
        }}
        onClick={handleOpen}              
      >Eliminar</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas eliminar está tarjeta?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => handleDelete(data.id,idAccount,list)}    color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
         
    </>             
  );
};

export default DeleteCards;