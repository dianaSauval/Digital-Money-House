import styles from "./lateralMenu.module.css";
import NavTree from "./navTree";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import close from "../../utils/images/close.svg";
import Image from "next/image";


const LateralMenu = (props: any) => {
  const { visibility, setVisibility } = props;
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
  });
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `https://digitalmoney.ctd.academy/api/users/${userId}`,
        headers: {
          Authorization: `${token}`,
        },
        data: "",
      };
      axios
        .request(config)
        .then((response) => {
          setUserData({
            name: response.data.firstname,
            lastName: response.data.lastname,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <>
      <Box
        className={`${styles.mobileBackground} ${visibility ? styles.visible : styles.invisible}`}
        onClick={() => { setVisibility(false); }}
      >
        <Box className={`${styles.top} ${visibility ? styles.animationFoward : styles.animationBack}`}>
          <Box>
            <button onClick={() => { setVisibility(false); }}><Image src={close} alt="logo" /></button>
          </Box>
          <Typography>Hola,</Typography>
          <Typography>{userData.name}  {userData.lastName}</Typography>
        </Box>
        <Box className={`${styles.container} ${styles.mobileContainer} ${visibility ? styles.animationFoward : styles.animationBack}`}>
          <NavTree />
        </Box>
      </Box>
      <Box className={styles.desktopBackground}>
        <Box className={styles.container}>
          <NavTree />
        </Box>
      </Box>
    </>
  );
};

export default LateralMenu;

