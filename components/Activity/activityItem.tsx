import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
const ActivityItem = (props: any) => {
  const { activityData } = props;

  const parseDate = () => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fecha = new Date(activityData.dated);
    const diaSemanaNumerico = fecha.getDay();
    return diasSemana[diaSemanaNumerico];
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ display: "flex", alignItems: "center", "&:hover": { backgroundColor: "#EEEAEA" } }}
      >
        <ListItemAvatar>
          <Avatar alt="R" sx={{ backgroundColor: "#C1FD35", color: "#000" }} />
        </ListItemAvatar>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          primary={activityData?.description}
        ></ListItemText>
        <ListItemText
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          primary={`$ ${activityData?.amount}`}
          secondary={activityData?.dated}
        />
      </ListItem>
    </>
  );
};

export default ActivityItem;
