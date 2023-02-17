import React from "react";
import MuiCard from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Pack } from "alias/utils/seed";
import imagePack from "../asset/descarga.png";
import Link from "next/link";

interface Props {
  paquete: Pack;
}

const Card: React.FC<Props> = ({ paquete }) => {
 
  return (
    <MuiCard sx={{ maxWidth: 345, height: "80px", display: "flex" }}>
      <Link href={`/repartidor/paquete/${paquete._id}`}>
      <CardMedia
        sx={{ height: "80px", width: "80px", flexShrink: 0 }}
        image={imagePack.src}
        title="green iguana"
      />
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
            sx={{ flexGrow: 1, maxHeight: "1em", overflow: "none" }}
            component="div"
            variant="subtitle1"
          >
            {paquete.destination}
          </Typography>

          <IconButton sx={{ textAlign: "right" }} aria-label="previous">
            <DeleteForeverOutlinedIcon color="error" />
          </IconButton>
        </Box>

        <Typography
          variant="subtitle1"
          color="black"
          component="div"
          align="right"
        >
          {paquete.status}
        </Typography>
      </Box>
    </MuiCard>
  );
};

export default Card;
