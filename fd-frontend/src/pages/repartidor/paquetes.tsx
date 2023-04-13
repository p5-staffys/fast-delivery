import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

import { Layout } from "alias/components/layout";
import Header from "alias/components/header";
import BackBtn from "../../components/backBtn";

const Paquetes = (): JSX.Element => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [numOne, setNumOne] = useState<number>(0);
  const [numTwo, setNumTwo] = useState<number>(0);
  const [numThree, setNumThree] = useState<number>(0);
  const max = 7;

  const handleAddOne = (): void => {
    if (numOne >= 0 && numOne < max) {
      setNumOne(numOne + 1);
    }
  };
  const handleSubtractOne = (): void => {
    if (numOne > 0) {
      setNumOne(numOne - 1);
    }
  };
  const handleAddTwo = (): void => {
    if (numTwo >= 0 && numTwo < max) {
      setNumTwo(numTwo + 1);
    }
  };
  const handleSubtractTwo = (): void => {
    if (numTwo > 0) {
      setNumTwo(numTwo - 1);
    }
  };
  const handleAddThree = (): void => {
    if (numThree >= 0 && numThree < max) {
      setNumThree(numThree + 1);
    }
  };
  const handleSubtractThree = (): void => {
    if (numThree > 0) {
      setNumThree(numThree - 1);
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{ maxWidth: "100vw", height: "12vh", ml: 2, mt: 2 }}
        display="flex"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
      >
        <BackBtn back="/repartidor/jornada" />
        <h2>Obtener paquetes</h2>
        <Typography sx={{ fontSize: "0.9em" }}>¿Cuántos paquetes más vas a repartir hoy?</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="left"
        alignItems="end"
        sx={{
          m: "auto",
          pl: 6,
          pb: 5,
          pt: 5,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <Box>
          <Checkbox {...label} defaultChecked />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="start" flexDirection="column" sx={{ ml: 4 }}>
          <Typography sx={{ fontSize: "0.8em" }}>Amenabar 2356, CABA</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleSubtractOne}
            >
              -
            </IconButton>
            <Typography sx={{ m: "0 10px" }}>{numOne}</Typography>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleAddOne}
            >
              +
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* SIGUIENTE */}
      <Box
        display="flex"
        justifyContent="left"
        alignItems="end"
        sx={{
          m: "auto",
          pl: 6,
          pb: 5,
          pt: 5,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <Box>
          <Checkbox {...label} defaultChecked />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="start" flexDirection="column" sx={{ ml: 4 }}>
          <Typography sx={{ fontSize: "0.8em" }}>AV. Carabobo y Rivadavia, CABA</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleSubtractTwo}
            >
              -
            </IconButton>
            <Typography sx={{ m: "0 10px" }}>{numTwo}</Typography>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleAddTwo}
            >
              +
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* SIGUIENTE */}
      <Box
        display="flex"
        justifyContent="left"
        alignItems="end"
        sx={{
          m: "auto",
          pl: 6,
          pb: 5,
          pt: 5,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <Box>
          <Checkbox {...label} defaultChecked />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="start" flexDirection="column" sx={{ ml: 4 }}>
          <Typography sx={{ fontSize: "0.8em" }}>Melian 1242, CABA</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleSubtractThree}
            >
              -
            </IconButton>
            <Typography sx={{ m: "0 10px" }}>{numThree}</Typography>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #b2bcca",
                padding: 0,
              }}
              onClick={handleAddThree}
            >
              +
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" sx={{ m: "0 2.5vw", mt: 5, width: "95vw" }}>
        Iniciar jornada
      </Button>
    </div>
  );
};

Paquetes.getLayout = function getLayout(page: React.ReactElement): React.ReactElement {
  return <Layout>{page}</Layout>;
};

export default Paquetes;
