"use client";

import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import getColorPackage from "../../../../utils/statusStyle/getColorPackage";
import trash from "../../../../asset/redTrash.svg";
import Link from "next/link";
import Image from "next/image";
import { PackageRef } from "@/utils/interfaces/package.interfaces";
import getColorText from "@/utils/statusStyle/getColorText";

interface Props {
  paquete: PackageRef;
  handleDelete: (id: string) => void;
}

const CardManagePackage: React.FC<Props> = ({ paquete, handleDelete }) => {
  return (
    <Link href={`/deliveryMan/workingDay/${paquete._id}`} style={{ textDecoration: "none", color: "black" }}>
      <Box sx={{ maxWidth: "auto", height: "80px", display: "flex", borderBottom: "2px solid #e0e0e0" }}>
        <CardMedia sx={{ height: "70px", width: "70px", flexShrink: 0 }} title="paquete">
          <Image src={getColorPackage(paquete.status)} alt="paquete" width={70} />
        </CardMedia>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              pl: 1,
              pb: 1,
            }}
          >
            <Typography display="block" variant="subtitle1">
              {`${paquete.client.address.split(",")[0]}`}
            </Typography>
            <Typography display="block" variant="subtitle1">
              {`${paquete.deliveryDate.split("T")[0].split("-")[2]}/${
                paquete.deliveryDate.split("T")[0].split("-")[1]
              }`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton
              sx={{ textAlign: "right", mb: 1 }}
              onClick={(e: React.MouseEvent<HTMLElement>): void => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(paquete._id);
              }}
            >
              <Image alt="trash" src={trash} />
            </IconButton>
            <Typography
              variant="subtitle2"
              color={getColorText(paquete.status)}
              component="div"
              align="right"
              sx={{ mr: 1 }}
              fontWeight="700"
            >
              {paquete.status}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default CardManagePackage;
