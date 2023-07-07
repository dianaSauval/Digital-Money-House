import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import HeaderLogin from "../components/Header/header-login";
import HeaderRegister from "../components/Header/header-register";
import Footer from "../components/Footer/footer";
import LateralMenu from "../components/LateralMenu/lateralMenu";
import { useUserData } from "../context/createContext";
import { useRouter } from "next/router";
import HeaderHome from "../components/Header/header-home";

type LayoutVariant = "home" | "login" | "register";

interface Props extends PropsWithChildren<any> {
  variant: LayoutVariant;
}

const Layout: FC<Props> = ({ variant, children }: Props) => {
  const [visibility, setVisibility] = useState(false);
  const [headerDisplayed, setHeaderDisplayed] = useState(<HeaderHome />);
  const router = useRouter();
  useEffect(() => {
    if (variant === "home") {
      setHeaderDisplayed(
        <>
          <Box sx={{
            width: "100%",
            heigth: "450px",
            paddingBottom: "50px",
            backgroundColor: "blue"
          }}>
          </Box>
          <HeaderHome setVisibility={setVisibility} />
          {router.pathname != "/" && <LateralMenu visibility={visibility} setVisibility={setVisibility} />}
        </>
      );
    } else if (variant === "login") {
      setHeaderDisplayed(<HeaderLogin />);
    } else if (variant === "register") {
      setHeaderDisplayed(<HeaderRegister />);
    }
  }, [variant, visibility, router.pathname]);


  return (
    <>
      <Stack direction="column" height="100%">

        {headerDisplayed}

        <Box display="flex" flexGrow={1} justifyContent="center">
          {children}
        </Box>
        <Footer />
      </Stack>
    </>
  );
};
export async function getServerSideProps() {
  // Obtener las credenciales almacenadas en el Local Storage
  const credentials = null;
  if (!credentials) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {}, 
  };
}  
export default Layout;