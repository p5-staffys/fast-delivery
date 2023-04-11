import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const items = [
  {
    date: 27,
    day: "Lun",
  },
  {
    date: 28,
    day: "Mar",
  },
  {
    date: 1,
    day: "Mier",
  },
  {
    date: 2,
    day: "Jue",
  },
  {
    date: 3,
    day: "Vier",
  },
];

function DayList() {
  const [selected, setSelected] = useState(0);

  const handleSelect = (i: number) => {
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
            onClick={() => handleSelect(i)}
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
