import { Box, Typography, Grid, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import axios from "axios";
import useDeviceSize from "../../hooks/useDeviceSize";
import { IUser } from "../../types";

interface Props {
  dataKey: string;
  input: string;
  data: string;
  change: boolean;
  setLoading?: (param: any) => void;
}

const InfoDato = ({ setLoading, dataKey, input, data, change }: Props) => {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [infoData, setInfoData] = useState({});
  const [width] = useDeviceSize();

  useEffect(() => {
    if (edit) {
      const dataInputs = inputValue.split(" ");
      if (dataKey === "email") {
        setInfoData({
          email: inputValue,
        });
      } else if (dataKey === "firstname,lastname") {
        setInfoData({
          firstname: dataInputs[0],
          lastname: dataInputs[1],
        });
      } else if (dataKey === "password") {
        setInfoData({
          password: inputValue,
        });
      } else {
        setInfoData({
          phone: inputValue,
        });
      }
    }
  }, [edit, inputValue]);

  const onHandleSubmit = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const config = {
      method: "patch",
      url: `https://digitalmoney.ctd.academy/api/users/${userId}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: infoData,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading && setLoading(true);
        return response;

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "7px",
          paddingTop: "9px",
        }}
      >
        {width > 768 ? (
          width <= 1024 ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                }}
              >
                <Typography>{input}</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {edit ? (
                  <>
                    <Input
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      name="name"
                      defaultValue={data}
                      sx={{ width: "100%" }}
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        color: "rgba(0,0,0,0.5)",
                      }}
                      variant="subtitle2"
                    >
                      {data}
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {change ? (
                  edit ? (
                    <>
                      <DoneIcon
                        color="success"
                        onClick={() => {
                          handleEdit();
                          onHandleSubmit();
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                      <CancelIcon
                        color="warning"
                        onClick={() => {
                          handleEdit();
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <EditIcon
                        onClick={() => {
                          handleEdit();
                        }}
                        color="disabled"
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
              <Grid item xs={1} sm={4} md={4}>
                <Typography>{input}</Typography>
              </Grid>
              <Grid item xs={1} sm={4} md={4}>
                {edit ? (
                  <>
                    <Input
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      name="name"
                      defaultValue={data}
                      sx={{ width: "100%" }}
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        color: "rgba(0,0,0,0.5)",
                      }}
                      variant="subtitle2"
                    >
                      {data}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                item
                xs={1}
                sm={4}
                md={4}
              >
                {change ? (
                  edit ? (
                    <>
                      <DoneIcon
                        color="success"
                        onClick={() => {
                          setEdit(!edit);
                          onHandleSubmit();
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                      <CancelIcon
                        color="warning"
                        onClick={() => {
                          setEdit(!edit);
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <EditIcon
                        onClick={() => {
                          setEdit(!edit);
                        }}
                        color="disabled"
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography>{input}</Typography>
              {edit ? (
                <>
                  <Input
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    name="name"
                    defaultValue={data}
                    sx={{ width: "300px" }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      display: "flex",
                      color: "rgba(0,0,0,0.5)",
                    }}
                    variant="subtitle2"
                  >
                    {data}
                  </Typography>
                </>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100$",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
              }}
            >
              {change ? (
                edit ? (
                  <>
                    <DoneIcon
                      color="success"
                      onClick={() => {
                        setEdit(!edit);
                        onHandleSubmit();
                      }}
                    />
                    <CancelIcon
                      color="warning"
                      onClick={() => {
                        setEdit(!edit);
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <EditIcon
                      onClick={() => {
                        setEdit(!edit);
                      }}
                      color="disabled"
                    />
                  </>
                )
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <hr />
    </>
  );
};

export default InfoDato;
