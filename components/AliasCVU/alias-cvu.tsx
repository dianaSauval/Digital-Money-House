import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";

interface AliasCVUProps {
  userAccount: any,
  isLoading?: any
}

const AliasCVU = ({ userAccount, isLoading }: AliasCVUProps) => {
  const [checkCopyAlias, setCheckCopyAlias] = useState(false);
  const [checkCopyCVU, setCheckCopyCVU] = useState(false);

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    isLoading &&
      console.log("account desde alias", userAccount?.cvu);
  }, [userAccount]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--main-bg-color)",
          color: "var(--main-text-color)",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

          "@media (max-width: 768px)": {
            padding: "18px 45px 18px 25px",
            gap: "18px",
          },
          "@media (min-width: 768px)": {
            padding: "40px 45px 40px 35px",
            gap: "18px",
          },
          "@media (min-width: 1024px)": {
            padding: "40px 45px 18px 35px",
            gap: "18px",
          },
        }}
      >
        <Typography>
          Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "var(--lime-green)",
              }}
            >
              CVU
            </Typography>
            <Typography>{userAccount?.cvu}</Typography>
          </Box>
          {checkCopyCVU && (
            <CheckIcon
              sx={{
                color: "var(--lime-green)",
                fontSize: "35px",
              }}
            />
          )}
          {!checkCopyCVU && (
            <ContentCopyIcon
              onClick={() => {
                copyContent(userAccount?.cvu);
                setCheckCopyCVU(true);
                setTimeout(() => {
                  setCheckCopyCVU(false);
                }, 1000);
              }}
              sx={{
                color: "var(--lime-green)",
                fontSize: "35px",
                cursor: "pointer",
              }}
            />
          )}
        </Box>
        <Divider
          sx={{
            backgroundColor: "var(--lime-green)",
            height: "2px",
            width: "100%",
            "@media (max-width: 768px)": {
              display: "block",
            },
            "@media (min-width: 768px)": {
              display: "none",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "var(--lime-green)",
              }}
            >
              Alias
            </Typography>
            <Typography>{userAccount?.alias}</Typography>
          </Box>
          {checkCopyAlias && (
            <CheckIcon
              sx={{
                color: "var(--lime-green)",
                fontSize: "35px",
              }}
            />
          )}
          {!checkCopyAlias && (
            <ContentCopyIcon
              onClick={() => {
                copyContent(userAccount?.alias);
                setCheckCopyAlias(true);
                setTimeout(() => {
                  setCheckCopyAlias(false);
                }, 1000);
              }}
              sx={{
                color: "var(--lime-green)",
                fontSize: "35px",
                cursor: "pointer",
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AliasCVU;
