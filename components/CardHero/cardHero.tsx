import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
interface PropsType {
  title: string;
  description: string;
}
const CardHero = ({ title, description }: PropsType) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "30px",
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingRight: "53px",
        width: "500px",
        height: "246px",
        background: "#FFFFFF",
        borderRadius: "30px",
        "@media (max-width: 768px)": {
          width: "90%",
          height: "224px",
          paddingTop: "10px",
          paddingRight: "0px",
          paddingLeft: "0px"
        },
        "@media  (min-width 769px) and (max-width 1024px)": {
          width: "597px",
          height: "224px",
          paddingRight: "31px",
          paddingTop: "10px"
        }
      }}>
      <CardContent sx={{
        margin: "0",
        padding: "0",
        "@media (max-width:768px)": {
          paddingTop: "1px",
          paddingBottom: "3px",
          paddingLeft: "20px",
          paddingRight: "9px",
        }
      }}>
        <Typography gutterBottom component="div"
          sx={{
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "40px",
            "@media (max-width:768px)": {
              fontSize: "28px"
            }
          }}>
          {title}
        </Typography>
        <hr style={{
          width: "100%",
          border: "1px solid #C1FD35",
          marginTop: "12px",
          marginBottom: "12px"
        }} />
        <Typography sx={{
          fontFamily: "Open Sans",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "20px",
          lineHeight: "27px",
          "@media (max-width:768px)": {
            fontSize: "16px"
          }
        }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardHero;
