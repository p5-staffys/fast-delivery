"use client";

import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import imagePack from "../../../../asset/pack.svg";
import trash from "../../../../asset/redTrash.svg";
import Link from "next/link";
import Image from "next/image";
import { PackageRef } from "@/utils/interfaces/package.interfaces";

interface Props {
  paquete: PackageRef;
  handleDelete: (id: string) => void;
}

const CardManagePackage: React.FC<Props> = ({ paquete, handleDelete }) => {
  return (
    <Box sx={{ maxWidth: "auto", height: "80px", display: "flex", borderBottom: "2px solid #e0e0e0" }}>
      <Link href={`/deliveryMan/workingDay/${paquete._id}`}>
        <CardMedia sx={{ height: "70px", width: "70px", flexShrink: 0 }} image={imagePack.src} title="paquete" />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              flexGrow: 1,
              maxHeight: "1em",
              overflow: "none",
              font: "Open Sans",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "20px",
            }}
            component="div"
            variant="subtitle1"
          >
            {`${paquete.client.address}`}
          </Typography>

          <IconButton sx={{ textAlign: "right" }} aria-label="previous" onClick={(): void => handleDelete(paquete._id)}>
            <Image alt="trash" src={trash} />
          </IconButton>
        </Box>
        <Typography
          variant="subtitle1"
          color="black"
          component="div"
          align="right"
          sx={{ mr: 1, fontSize: "12px", lineHeight: "20px" }}
          fontFamily="Open Sans"
          fontWeight="700"
        >
          {paquete.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardManagePackage;
