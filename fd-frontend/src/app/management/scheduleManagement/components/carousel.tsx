import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { startOfWeek, addDays, format } from "date-fns";
import { es } from "date-fns/locale";

const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
const days = [];

for (let i = 0; i < 5; i++) {
  const currentDate = addDays(startOfCurrentWeek, i);
  const day = format(currentDate, "EEE", { locale: es });
  const date = format(currentDate, "d");
  days.push({ day, date });
}

const items = [...days];

function DayList(): JSX.Element {
  const [selected, setSelected] = useState(0);

  const handleSelect = (i: number): void => {
    setSelected(i);
  };

  return (
    <ImageList
      cols={items.length}
      sx={{
        justifyItems: "right",
        alignItems: "center",
      }}
    >
      {items.map((item, i) => (
        <ImageListItem key={i}>
          <Box
            display="flex"
            alignContent="center"
            flexDirection="column"
            justifyContent="center"
            sx={{
              width: 61,
              height: `${i === selected ? "127px" : "99px"}`,
              backgroundColor: `${i === selected ? "#FCBC11" : "primary.main"}`,
              borderRadius: "40px",
            }}
            onClick={(): void => handleSelect(i)}
          >
            <Typography color={"white"} variant="h6" align="center">
              {item.date}
            </Typography>
            <Typography color={"white"} variant="h6" align="center">
              {item.day}
            </Typography>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default DayList;
