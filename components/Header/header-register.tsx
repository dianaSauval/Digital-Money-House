import Image from "next/image";
import logoDark from "../../utils/images/logoDark.svg";
import { Button, Box } from "@mui/material";
import Link from "next/link";

const HeaderRegister = () => {

  return (
    <Box
      sx={{
        backgroundColor: "var(--lime-green)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={logoDark} alt="logo" />
        </Link>
        <Box>
          <Link href="/iniciar-sesion/paso-1">
            <Button
              variant="primary"
              size="small"
              sx={{
                backgroundColor: "var(--dark-grey)",
                color: "var(--main-text-color)",
                "&:hover": {
                  backgroundColor: "var(--main-bg-color)",
                  color: "var(--lime-green)",
                },
              }}
            >
              Iniciar sesion
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderRegister;
