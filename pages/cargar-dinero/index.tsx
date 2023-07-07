import { ReactElement, ReactNode } from "react";
import { Box } from "@mui/material";
import { NextPageWithLayout } from "../_app";
import ArrowSubtitleMobile from "../../components/ArrowSubtitleMobile";
import AddMoneyOptionTransfer from "../../components/AddMoneyOption/addMoneyOptionTranfer";
import AddMoneyOptionCard from "../../components/AddMoneyOption/addMoneyOptionCard";
import Layout from "../../layout/layout";

interface PropsType {
  children?: ReactNode;
}

const SelectTransaction: NextPageWithLayout<PropsType> = () => {
  return (
    <>
      <Box
        sx={{
          width: "276px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 768px)": {
            display: "none",
          },
        }}
      ></Box>
      <Box sx={{
        height: "100%",
        width: "100vw",
        backgroundColor: "#EEEAEA",
        paddingLeft: "100px",
        paddingTop: "50px",
        paddingBottom: "50px",
        paddingRight: "50px",
        "@media (max-width: 768px)": {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      }}
      >
        <Box sx={{
          marginBottom: "1rem",
        }}
        >
          <ArrowSubtitleMobile title="Cargar dinero" />
          <AddMoneyOptionTransfer />
        </Box>
        <Box sx={{
          marginBottom: "1rem",
        }}
        >
          <AddMoneyOptionCard />
        </Box>
      </Box>
    </>
  );
};


SelectTransaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};


export default SelectTransaction;