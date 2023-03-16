import React, { ReactElement, useState } from "react";
import BackBtn from "../../components/backBtn";
import Header from "alias/components/header";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Layout } from "alias/components/layout";

const addPackage = (): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = (): void => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  };
  const handleSubtract = (): void => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <Box>
        <Header />
        <BackBtn back="/gestion/managePackage" />
        <Typography sx={{ ml: "20px", mb: "0.5vh", fontSize: "1em", fontWeight: 800 }}>Argregar paquetes</Typography>
      </Box>
      <Box className="addPackageData">
        <TextField
          id="standard-basic"
          label="Dirección"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { color: "#f5bd09" },
          }}
        />
        <TextField
          id="standard-basic"
          label="Nombre de quien recibe"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { color: "#f5bd09" },
          }}
        />
        <TextField
          id="standard-basic"
          label="Peso (Kg)"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { color: "#f5bd09" },
          }}
        />
        <TextField
          id="standard-basic"
          label="Fecha en la que debe ser repartido"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { color: "#f5bd09" },
          }}
        />
      </Box>
      <Typography sx={{ ml: "20px", mb: "0.5vh", fontSize: "0.8em", color: "#f5bd09" }}>Cantidad</Typography>
      <Box className="quantity">
        <IconButton onClick={handleSubtract}>-</IconButton>
        <Typography sx={{ m: "0 12px" }}>{quantity}</Typography>
        <IconButton onClick={handleAdd}>+</IconButton>
      </Box>
      <Button variant="contained" sx={{ m: "0 5vw", mt: 2, width: "90vw" }}>
        <strong>Agregar</strong>
      </Button>
    </>
  );
};
addPackage.getLayout = function getLayout(page: ReactElement): ReactElement {
  return <Layout>{page}</Layout>;
};

export default addPackage;
