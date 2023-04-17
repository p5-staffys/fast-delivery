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
import { Pack, requestPacks } from "../../../../utils/seed";

const idPack = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);

  useEffect(() => {
    requestPacks(1).then((packs) => {
      setPaquetes(packs);
    });
  }, []);

  return (
    <>
      <Container>
        <Link href={`deliveryMan/workingDay`}>
          <IconButton aria-label="Example" sx={{ my: 2 }}>
            <ArrowBackIosIcon sx={{ color: "black" }} />
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
                {paquetes[0]?.destination}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                <span style={{ fontWeight: 700 }}>Numero del paquete: </span>
                {paquetes[0]?._id}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                <span style={{ fontWeight: 700 }}>Recibe: </span>
                {paquetes[0]?.client}
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
