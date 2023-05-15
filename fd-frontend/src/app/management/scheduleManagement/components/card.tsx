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
    <Box sx={{ display: "flex", borderBottom: "2px solid #e0e0e0", flexDirection: "column", minHeight: "80px" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px" }}>
        <Link href={`/deliveryMan/workingDay/${paquete._id}`}>
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <CardMedia sx={{ height: "70px", width: "70px", flexShrink: 0 }} image={imagePack.src} title="paquete" />
            <Box sx={{ flexGrow: 1, marginLeft: "10px", display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle1"
                color="black"
                component="div"
                fontFamily="Open Sans"
                fontWeight="400"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: { xs: "16px", sm: "20px" },
                }}
              >
                {/* {paquete.client.address.street} */}
                Calle falsa 123
              </Typography>
              <Typography
                variant="subtitle1"
                color="black"
                component="div"
                fontFamily="Open Sans"
                fontWeight="700"
                align="right"
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  lineHeight: { xs: "16px", sm: "20px" },
                  marginTop: "12px",
                }}
              >
                {paquete.status.replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
            </Box>
          </Box>
        </Link>
        <IconButton aria-label="previous" onClick={(): void => handleDelete(paquete._id)} sx={{ marginLeft: "auto" }}>
          <Image alt="trash" src={trash} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardManagePackage;
