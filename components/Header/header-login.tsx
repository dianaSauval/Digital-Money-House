import Image from "next/image";
import Link from "next/link";
import logoDark from "../../utils/images/logoDark.svg";
import { Box } from "@mui/material";

const HeaderLogin = () => {

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
          padding: "15.5px 20px",
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
      </Box>
    </Box>
  );
};

export default HeaderLogin;
