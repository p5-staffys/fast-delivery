import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Porcentaje = ({ value }: { value: number }): React.ReactElement => {
  const ranges = [
    { min: 0, max: 39, color: "#FF6B6B" }, // Rojo para porcentajes de 0 a 39
    { min: 40, max: 74, color: "#FCBC11" }, // Amarillo para porcentajes de 40 a 74
    { min: 75, max: 100, color: "#96DB76" }, // Verde para porcentajes de 75 a 100
  ];

  const getColor = (value: number): string => {
    const range = ranges.find((r) => value >= r.min && value <= r.max);
    return range ? range.color : "#fdc93e"; // Color por defecto si el valor está fuera de los rangos
  };

  const color = getColor(value);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={50} variant="determinate" value={value} sx={{ color: color }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" fontWeight={600}>{`${value}%`}</Typography>
      </Box>
    </Box>
  );
};

export default Porcentaje;
