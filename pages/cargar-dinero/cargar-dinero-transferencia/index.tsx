import { ReactElement, ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";
import { NextPageWithLayout } from "../../_app";
import AliasCVU from "../../../components/AliasCVU/alias-cvu";
import Layout from "../../../layout/layout";
import { useAccountContext } from "../../../context/accountContext";
import useAccount from "../../../hooks/useAccount";
interface PropsType {
  children?: ReactNode;
}

const TransferenceTransaction: NextPageWithLayout<PropsType> = () => {
  const { userAccount, isLoading } = useAccount();
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
      {userAccount?.cvu !== "" ? <Box
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
        <AliasCVU isLoading={isLoading} userAccount={userAccount} />
      </Box> :
        <Box sx={{
          width: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}>
          <CircularProgress />
        </Box>
      }
    </>
  );
};

TransferenceTransaction.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default TransferenceTransaction;