import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Porcentaje = ({ value }: { value: number }): React.ReactElement => {
  const total = value === 100 ? "#96db76" : "#fdc93e";
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={50} variant="determinate" value={value} sx={{ color: `${total}` }} />
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
