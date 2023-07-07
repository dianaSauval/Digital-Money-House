/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../layout/layout";
import { NextPageWithLayout } from "../_app";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import ActivityItem from "../../components/Activity/activityItem";
import { useStyles } from "../../material-theme";
import { ITransference } from "../../types";
import { Search } from "@mui/icons-material";
import FilterMenu from "../../components/Activity/filterMenu";
import { Tune } from "@mui/icons-material";
import FilterModal from "../../components/Activity/FilterModal/FilterModal";
import ArrowSubtitleMobile from "../../components/ArrowSubtitleMobile";
import { useTransferencesContext } from "../../context/useTransferences";
import useTransferences from "../../hooks/useTransference";
interface PropsType {
  children?: ReactNode;
}

const Actividad: NextPageWithLayout<PropsType> = () => {
  const [activity, setActivity] = useState<ITransference[]>();
  const [search, setSearch] = useState("");
  const [operation, setOperation] = useState("");
  const [period, setPeriod] = useState(-1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>(0);
  const [offset, setOffset] = useState(1);
  const PAGINATION_LIMIT = 10;

  const { transferencesInfo, isLoadingTransferenceHook } = useTransferences();
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setOffset(value);
  };

  function sortByDate(array: ITransference[]) {
    return array?.sort(function (a: any, b: any) {
      return +new Date(b.dated) - +new Date(a.dated);
    });
  }
  function filterBySearch(array: ITransference[]) {
    return array.filter((activityOperation: ITransference) => {
      return activityOperation.description.toLowerCase().includes(search.toLowerCase());
    });
  }
  function filterByPeriod(array: ITransference[] | any) {
    const start = new Date();
    if (period <= 1) {
      return array.filter((activityOperation: ITransference) => {
        return (
          new Date(activityOperation.dated).getDate() ==
          start.getDate() - period
        );
      });
    } else if (period > 1) {
      return array.filter((activityOperation: ITransference) => {
        return (
          new Date(activityOperation.dated).getDate() >=
          start.getDate() - period
        );
      });
    }
  }

  function filterByOperationType(array: ITransference[] | any) {
    return array.filter((activityOperation: ITransference) => {
      return activityOperation.type === operation;
    });
  }

  function filterByAmount(array: ITransference[] | any) {
    if (amount[0] === 0) {
      return array.filter((activityOperation: ITransference) => {
        return (
          activityOperation.amount < 1000 && activityOperation.amount > -1000
        );
      });
    }
    if (amount[0] === 1000) {
      return array.filter((activityOperation: ITransference) => {
        return (
          (activityOperation.amount >= 1000 &&
            activityOperation.amount < 5000) ||
          (activityOperation.amount <= -1000 &&
            activityOperation.amount > -5000)
        );
      });
    }
    if (amount[0] === 5000) {
      return array.filter((activityOperation: ITransference) => {
        return (
          (activityOperation.amount >= 5000 &&
            activityOperation.amount < 20000) ||
          (activityOperation.amount <= -5000 &&
            activityOperation.amount > -20000)
        );
      });
    }
    if (amount[0] === 20000) {
      return array.filter((activityOperation: ITransference) => {
        return (
          (activityOperation.amount >= 20000 &&
            activityOperation.amount < 100000) ||
          (activityOperation.amount <= -20000 &&
            activityOperation.amount > -100000)
        );
      });
    }
    if (amount[0] === 100000) {
      return array.filter((activityOperation: ITransference) => {
        return (
          activityOperation.amount >= 100000 ||
          activityOperation.amount < -100000
        );
      });
    }
  }

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    let array;
    // eslint-disable-next-line no-constant-condition
    if (true) {
      array = sortByDate(transferencesInfo);
    }
    if (search != "") {
      array = filterBySearch(array);
    }
    setOffset(1);
    setActivity(array);
  }, [search, transferencesInfo]);

  const handleSubmitFilter = () => {
    let array;
    // eslint-disable-next-line no-constant-condition
    if (true) {
      array = sortByDate(transferencesInfo);
    }
    if (period != -1) {
      array = filterByPeriod(array);
    }
    if (operation != "") {
      array = filterByOperationType(array);
    }
    if (amount != 0) {
      array = filterByAmount(array);
    }
    setOffset(1);
    setActivity(array);
    setOpenModal(false);
  };

  const handleDeleteFilter = () => {
    let array;
    // eslint-disable-next-line no-constant-condition
    if (true) {
      array = sortByDate(transferencesInfo);
    }
    setActivity(array);
    setOpenModal(false);
  };

  const handleOpenModalFilter = () => {
    setOpenModal(!openModal);
    setPeriod(-1);
    setOperation("");
    setAmount([]);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "290px",
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
          width: "100%",
          paddingTop: "50px",
          paddingLeft: "80px",
          paddingRight: "50px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--light-grey)",
          paddingBottom: "30px",
          "@media (max-width: 768px)": {
            paddingLeft: "50px",
          },
        }}
      >
        <ArrowSubtitleMobile title="Inicio"></ArrowSubtitleMobile>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "21px",
              paddingBottom: "20px",
              "@media (max-width: 768px)": {
                paddingTop: "20px",
              },
            }}
          >
            <form
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
              onChange={handleSearch}
            >
              <TextField
                size="medium"
                sx={{
                  maxWidth: "100%",
                  backgroundColor: "#FFF",
                  height: "56px",
                  borderRadius: "10px",
                }}
                className={classes.textFieldFilter}
                placeholder="Buscar en tu actividad"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            <Button
              variant="primary"
              color="secondary"
              size="medium"
              sx={{
                height: "56px",
                display: "flex",
                padding: "20px",
                justifyContent: "space-around",
                width: "172px",
                "@media (max-width: 768px)": {
                  display: "none",
                },
              }}
              onClick={handleOpenModalFilter}
            >
              Filtrar
              <Tune />
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#FFF",
              borderRadius: "10px",
              boxShadow: "0px 4px 4px #0000004c",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "18px",
                justifyContent: "space-between",
                alignItems: "center",
                "@media (min-width: 768px)": {
                  display: "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "22px",
                }}
              >
                Tu Actividad
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  "&:hover": {
                    cursor: "pointer"
                  }
                }}
                onClick={handleOpenModalFilter}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    lineWeight: "100%",
                    textDecorationLine: "underline",
                  }}
                >
                  Filtrar
                </Typography>
                <Tune />
              </Box>
            </Box>
            <Divider
              sx={{
                "@media (min-width: 768px)": {
                  display: "none",
                },
              }}
              variant="middle"
            ></Divider>
            <List sx={{ width: "100%" }}>
              {activity && activity?.length > 0 ?
                activity?.map((activityItem, idx) => {
                  if (
                    idx >= (offset - 1) * PAGINATION_LIMIT &&
                    idx < PAGINATION_LIMIT * offset
                  ) {
                    return (
                      <React.Fragment key={idx}>
                        <ActivityItem key={idx} activityData={activityItem} />
                        {idx !== activity.length - 1 && (
                          <Divider variant="middle" />
                        )}
                      </React.Fragment>
                    );
                  }
                }) :
                <Typography variant="h2" sx={{
                  textAlign: "center",
                  pt: 2,
                  pb: 2,
                  color: "#616161",
                  textShadow: "#e0e0e0 1px 1px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: 2,
                }}>
                  - No se encontró ninguna actividad -

                </Typography>
              }
            </List>
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 0",
              }}
              color={"secondary"}
              count={
                activity !== undefined
                  ? Math.ceil(activity.length / PAGINATION_LIMIT)
                  : 0
              }
              onChange={handleChange}
            />
          </Box>
        </Box>
        <FilterModal
          children={
            <FilterMenu
              handleDeleteFilter={handleDeleteFilter}
              handleSubmitFilter={handleSubmitFilter}
              operation={operation}
              setOperation={setOperation}
              period={period}
              setPeriod={setPeriod}
              amount={amount}
              setAmount={setAmount}
            />
          }
          open={openModal}
          setOpen={setOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </Box>
    </>
  );
};
Actividad.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="home">{page}</Layout>;
};

export default Actividad;
