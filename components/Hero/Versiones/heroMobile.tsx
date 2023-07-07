import styles from "./heroMobile.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHero from "../../CardHero/cardHero";

const HeroMobile = () => {

  return (
    <Grid className={styles.grid}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "60px",
        width: "100%",
        height: "100%",
      }}>
      <Box sx={{
        whiteSpace: "pre-line",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        paddingLeft: "20px",
        paddingBottom: "200px",
        paddingYTp: "84px",
      }}>
        <Typography sx={{
          width: "100%",
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "48px",
          lineHeight: "50px",
          color: "#FFFFFF"
        }}>
          De ahora<br />
          en adelante,<br />
          hacés más<br />
          con tu dinero
        </Typography>
        <hr style={{
          marginTop: "20px",
          marginBottom: "17px",
          width: "25px",
          height: "0px",
          border: "4px solid #C1FD35",
        }} />
        <Typography sx={{
          width: "100%",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "34px",
          lineHeight: "50px",
          color: "#C1FD35",
        }}>
          Tu nueva<br />
          <span style={{ fontWeight: "bold" }}>billetera virtual</span>
        </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        flexDirection: "column",
        zIndex: "100",
        marginBottom: "-310px",
        width: "100%",
      }}>
        <CardHero
          title={"Transferí dinero"}
          description={"Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"}
        />
        <CardHero
          title={"Pago de servicios"}
          description={"Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel"}
        />
      </Box>
      <Box sx={{
        width: "100%",
        bottom: "0",
        height: "329px",
        backgroundColor: "#C1FD35",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "30px 30px 0px 0px",
      }}>
      </Box>
    </Grid>
  );
};

export default HeroMobile;
