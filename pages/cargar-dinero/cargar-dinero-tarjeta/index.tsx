import { ReactElement, ReactNode } from "react";
import { Box } from "@mui/material";
import Layout from "../../../layout/layout";
import { NextPageWithLayout } from "../../_app";
import ArrowSubtitleMobile from "../../../components/ArrowSubtitleMobile";
import SelectCard from "../../../components/ListCard/selectCard";
interface PropsType {
  children?: ReactNode;
}


const CardTransaction: NextPageWithLayout<PropsType> = () => {

  return (
    <>
      <Box
        sx={{
          width: "276px",
          height: "100%",
          backgroundColor: "#C1FD35",
          "@media (max-width: 767px)": {
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
        "@media (max-width: 767px)": {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      }}
      >

        <Box sx={{
          marginBottom: "1rem",
        }}
        >
          <ArrowSubtitleMobile title="Seleccionar Tarjetas" />
          <SelectCard />
        </Box>


      </Box>
    </>
  );
};

CardTransaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default CardTransaction;