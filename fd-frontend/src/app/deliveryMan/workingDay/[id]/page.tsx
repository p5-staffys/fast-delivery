"use client";

import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import mapa from "../../../../asset/mapa.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, useGlobalContext } from "@/context/store";

const idPack = ({ params }): JSX.Element => {
  const [paquete, setPaquete] = useState<Package[]>([]);
  const { user } = useGlobalContext();
  const item = localStorage.getItem("user");
  const userLocalstorage = JSON.parse(item);

  useEffect(() => {
    const packs = user ? user.packages : userLocalstorage.packages;
    const packFiltrados = packs.filter((paquete: Package) => {
      return paquete._id === params.id ? paquete : null;
    });

    setPaquete(packFiltrados);
  }, []);

  return (
    <>
      <Container>
        <Link href={`deliveryMan/workingDay`}>
          <IconButton aria-label="Example">
            <ArrowBackIosIcon sx={{ color: "black", mb: 2 }} />
          </IconButton>
        </Link>
        <Accordion sx={{ marginY: "15px" }} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="h5">Reparto en curso</Typography>
          </AccordionSummary>
          <Card>
            <CardMedia sx={{ height: "212px", width: "287px", ml: "34px", mt: 2 }} image={mapa.src} title="mapa" />
            <CardContent>
              <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                <span style={{ fontWeight: 700 }}>Destino: </span>
                {paquete[0]?.address}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                <span style={{ fontWeight: 700 }}>Numero del paquete: </span>
                {paquete[0]?._id}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                <span style={{ fontWeight: 700 }}>Recibe: </span>
                {paquete[0]?.deliveryDate}
              </Typography>
            </CardContent>
            <CardActions sx={{ flexDirection: "column-reverse", alignItems: "flex-end" }}>
              <Link href={`deliveryMan/workingDay`}>
                <Button sx={{}} variant="contained" size="small">
                  Finalizar
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Accordion>
      </Container>
    </>
  );
};

export default idPack;
