import { ReactElement, ReactNode } from "react";
import { Box } from "@mui/material";
import { NextPageWithLayout } from "../../_app";
import Layout from "../../../layout/layout";
import AddMoneyOption from "../../../components/AddMoneyQuantity/addMoneyQuantity";
interface PropsType {
  children?: ReactNode;
}
const AddMoneyTransaction: NextPageWithLayout<PropsType> = () => {

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
          "@media (min-width: 768px)": {
            display: "block",
            maxWidth: "220px",
          },
          "@media (min-width: 1024px)": {
            display: "block",
            maxWidth: "275px",
          },
        }}
      ></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          gap: "20px",
          backgroundColor: "var(--light-grey)",
          "@media (max-width: 768px)": {
            padding: "20px",
            paddingTop: "50px",
          },
          "@media (min-width: 768px)": {
            padding: "50px",
            paddingLeft: "100px",
          },
        }}
      >
        <AddMoneyOption />
      </Box>
    </>
  );
};

AddMoneyTransaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default AddMoneyTransaction;