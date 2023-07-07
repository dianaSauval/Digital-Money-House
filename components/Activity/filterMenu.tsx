import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CircleOutlined } from "@mui/icons-material";
import { RadioButtonChecked } from "@mui/icons-material";

const FilterMenu = (props: any) => {
  const {
    setPeriod,
    period,
    operation,
    setOperation,
    handleSubmitFilter,
    handleDeleteFilter,
    amount,
    setAmount,
  } = props;
  const [openPeriod, setOpenPeriod] = useState(false);
  const [openOperation, setOpenOperation] = useState(false);
  const [openAmount, setOpenAmount] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);

  const handleClick1 = () => {
    setOpenPeriod(!openPeriod);
    setOpenOperation(false);
    setOpenAmount(false);
  };
  const handleClick2 = () => {
    setOpenOperation(!openOperation);
    setOpenPeriod(false);
    setOpenAmount(false);
  };

  const handleClick3 = () => {
    setOpenAmount(!openAmount);
    setOpenPeriod(false);
    setOpenOperation(false);
  };

  const handleClickPeriod = (value: number) => {
    setPeriod(value);
    setFilterSelected(!filterSelected);
  };

  const handleClickOperation = (value: string) => {
    setOperation(value);
    setFilterSelected(!filterSelected);
  };

  const handleClickAmount = (num1: number, num2: number) => {
    setAmount([num1, num2]);
    setFilterSelected(!filterSelected);
  };

  const handleClickDeleteFilters = () => {
    setOperation("");
    setPeriod(-1);
    setAmount([]);
    setFilterSelected(false);
    handleDeleteFilter();
  };

  return (
    <Box>
      <List>
        <ListItemButton sx={{
          "&:hover": {
            borderRadius: "8px",
          },
        }} onClick={handleClick1}>
          <ListItemText primary="Período" />
          {openPeriod ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPeriod} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(0)}
            >
              {period === 0 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Hoy
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Hoy
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(1)}
            >
              {period === 1 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Ayer
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Ayer
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(7)}
            >
              {period === 7 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Última semana
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Última semana
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(14)}
            >
              {period === 14 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Últimos 15 días
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Últimos 15 días
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(30)}
            >
              {period === 30 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Último mes
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Último mes
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickPeriod(90)}
            >
              {period === 90 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Últimos 3 meses
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Últimos 3 meses
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{
          "&:hover": {
            borderRadius: "8px",
          },
        }} onClick={handleClick2}>
          <ListItemText primary="Operación" />
          {openOperation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOperation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickOperation("Deposit")}
            >
              {operation === "Deposit" ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Ingresos
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Ingresos
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickOperation("Transfer")}
            >
              {operation === "Transfer" ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Egresos
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Egresos
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton sx={{
          "&:hover": {
            borderRadius: "8px",
          },
        }} onClick={handleClick3}>
          <ListItemText primary="Monto" />
          {openAmount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAmount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickAmount(0, 1000)}
            >
              {amount[0] === 0 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Menos de 1000
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Menos de 1000
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickAmount(1000, 5000)}
            >
              {amount[0] === 1000 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Entre $1000 y $5000
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Entre $1000 y $5000
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickAmount(5000, 20000)}
            >
              {amount[0] === 5000 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Entre $5000 y $20000
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Entre $5000 y $20000
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickAmount(20000, 100000)}
            >
              {amount[0] === 20000 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Entre $20000 y $100000
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Entre $20000 y $100000
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => handleClickAmount(100000, 500000)}
            >
              {amount[0] === 100000 ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    Más de $100000
                  </Typography>
                  <RadioButtonChecked />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontWeight: "100px",
                    }}
                  >
                    Más de $100000
                  </Typography>
                  <CircleOutlined />
                </>
              )}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Button
        onClick={handleSubmitFilter}
        sx={{ marginBottom: "10px" }}
        variant="primary"
        color="secondary"
        size="large"
      >
        Aplicar
      </Button>
      <Button
        onClick={handleClickDeleteFilters}
        variant="secondary"
        color="primary"
        size="large"
      >
        Resetear Filtros
      </Button>
    </Box>
  );
};

export default FilterMenu;
