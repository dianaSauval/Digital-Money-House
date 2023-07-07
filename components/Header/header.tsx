import Image from "next/image";
import logoDark from "../../utils/images/logoDark.svg";
import { Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#C1FD35",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Link
          href={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={logoDark} alt="logo" />
        </Link>
        <Box>
          {router.pathname === "/iniciar-sesion/paso-1" ||
            router.pathname === "/iniciar-sesion/paso-2" &&
            <>
              <Link href="/iniciar-sesion/paso-1">
                <Button variant="primary">Ingresar</Button>
              </Link>
              <Link href="/crear-cuenta">
                <Button variant="secondary">Crear Cuenta</Button>
              </Link>
            </>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
