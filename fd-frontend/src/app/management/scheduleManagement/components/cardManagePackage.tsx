import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import imagePack from "../../../../asset/pack.svg";
import trash from "../../../../asset/redTrash.svg";
import Link from "next/link";
import Image from "next/image";
import { Pack } from "../../../../utils/seed";

interface Props {
  paquete: Pack;
}

const CardManagePackage: React.FC<Props> = ({ paquete }) => {
  return (
    <Box sx={{ maxWidth: "auto", height: "80px", display: "flex", borderBottom: "2px solid #e0e0e0" }}>
      <Link href={`/repartidor/paquete/${paquete._id}`}>
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
            ml: 2,
          }}
        >
          <Typography
            sx={{
              mb: 4,
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
            {paquete.destination}
          </Typography>

          <IconButton sx={{ mb: 2, textAlign: "right" }} aria-label="previous">
            <Image alt="trash" src={trash} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CardManagePackage;
