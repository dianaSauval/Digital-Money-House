import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = {
    title: string
}

const ArrowSubtitleMobile = ({title}:Props) => {
  return (
    <Box sx={ {display:"none", "@media (max-width: 768px)": {display:"flex", alignItems:"center", width:"100%"}}}>
      <ArrowForwardIcon></ArrowForwardIcon>
      <Typography variant="subtitle1" sx={{textDecoration:"underline"}}>{title}</Typography>
    </Box>
  );
};

export default ArrowSubtitleMobile;