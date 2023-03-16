import React, { ReactElement } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

const backBtn = ({ back }: { back: string }): ReactElement => {
  return (
    <IconButton aria-label="Example" sx={{ my: 2, ml: "15px" }}>
      <Link href={back}>
        <ArrowBackIosIcon sx={{ color: "black" }} />
      </Link>
    </IconButton>
  );
};

export default backBtn;
