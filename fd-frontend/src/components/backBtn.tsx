import React from 'react'
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

const backBtn = ({back}) => {
  return (
    <IconButton aria-label="Example" sx={{ my: 2 }}>
          <Link href={back}>
            <ArrowBackIosIcon sx={{ color: "black" }} />
          </Link>
          </IconButton>
  )
}

export default backBtn