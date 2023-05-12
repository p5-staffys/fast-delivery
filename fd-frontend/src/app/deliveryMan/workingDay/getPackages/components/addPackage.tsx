import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

// eslint-disable-next-line
const AddPackage = ({ paquete, state, setState }: any): React.ReactElement => {
  const address = paquete._id.address.street;
  const [numOne, setNumOne] = useState<number>(0);
  const [check, setChek] = useState<boolean>(true);
  const id: string = paquete._id.fullName;
  const max: number = paquete.packages.length;

  const handleAddOne = (): void => {
    if (numOne >= 0 && numOne < max) {
      setNumOne(numOne + 1);
      setState([...state, paquete.packages[numOne]._id]);
    }
  };
  const handleSubtractOne = (): void => {
    if (numOne > 0) {
      setNumOne(numOne - 1);
      const newArray = state.filter((num: number) => num !== paquete.packages[numOne - 1]._id);
      setState(newArray);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setChek(!check);
  };

  return (
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
        <Checkbox onChange={handleChange} name={id} />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="start" flexDirection="column" sx={{ ml: 4 }}>
        <Typography sx={{ fontSize: "0.8em" }}>{address}</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              borderRadius: "3px",
              border: "1px solid #b2bcca",
              padding: 0,
            }}
            disabled={check}
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
            disabled={check}
          >
            +
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPackage;
