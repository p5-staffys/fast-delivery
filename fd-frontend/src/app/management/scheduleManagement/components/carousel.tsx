import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { startOfWeek, addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Day {
  day: string;
  date: string;
}

const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
const days: Day[] = [];

for (let i = 0; i < 30; i++) {
  const currentDate = addDays(startOfCurrentWeek, i);
  const day = format(currentDate, "EEE", { locale: es });
  const date = format(currentDate, "d");
  days.push({ day, date });
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  swipeToSlide: true,
  centerMode: true,
  initialSlide: days.findIndex((day) => day.date === format(today, "d")),
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const items = [...days];

function DayList(): JSX.Element {
  const [selected, setSelected] = useState<number>(days.findIndex((day) => day.date === format(today, "d")));

  const handleSelect = (i: number): void => {
    setSelected(i);
  };

  return (
    <Slider {...settings}>
      {items.map((item, i) => (
        <div key={i}>
          <Box
            display="flex"
            alignContent="center"
            flexDirection="column"
            justifyContent="center"
            sx={{
              width: `60%`,
              height: `${i === selected ? "150px" : "125px"}`,
              backgroundColor: `${i === selected ? "#FCBC11" : "primary.main"}`,
              borderRadius: "60px",
              cursor: "pointer",
              fontSize: "1.2rem",
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
        </div>
      ))}
    </Slider>
  );
}

export default DayList;
