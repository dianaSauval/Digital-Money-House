import styles from "./lateralMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";
import axios from "axios";

const NavTree = (props: any) => {
  const { setLogged } = props;

  const router = useRouter();
  const { id } = router.query;

  const active = (path: Array<string>) => {
    return (path.includes(router.pathname) ? styles.active : "");
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios("https://digitalmoney.ctd.academy/api/logout", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
    localStorage.removeItem("userId");
    localStorage.removeItem("cardId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("ServiceName");
    setLogged ? setLogged(false) : "";
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };


  return (
    <Box className={styles.links}>
      <Link className={active(["/inicio"])} href="/inicio">Inicio</Link>
      <Link className={active(["/actividad", "/transferencias/[id]"])} href="/actividad">Actividad</Link>
      <Link className={active(["/perfil"])} href="/perfil">Tu Perfil</Link>
      <Link className={active(["/cargar-dinero", "/cargar-dinero/cargar-dinero-transferencia", "/cargar-dinero/cargar-dinero-tarjeta", "/cargar-dinero/ingresar-dinero", "/cargar-dinero/confirmar-info", "/cargar-dinero/exitosa-carga"])} href="/cargar-dinero">Cargar Dinero</Link>
      <Link className={active(["/listar-servicios", "/agregar-tarjeta", "pago/pago-realizado", "ingresar-numero-cuenta", "/ingresar-numero-cuenta/[id]", "/listar-servicios/pago/[id]", "/listar-servicios/pago/pago-realizado"])} href="/listar-servicios">Pagar Servicios</Link>
      <Link className={active(["/listar-tarjetas", "/agregar-tarjeta"])} href="/listar-tarjetas">Tarjetas</Link>
      <Link style={{
        margin: 0
      }} href="/">
        <Button sx={{
          p: 0,
          margin: 0,
          display: "flex",
          justifyContent: "flex-start",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }} onClick={() => { logout(); }}>Cerrar sesión</Button>
      </Link>
    </Box>
  );
};

export default NavTree;