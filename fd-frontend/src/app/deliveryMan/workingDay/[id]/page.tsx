"use client";
import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "@/utils/interfaces/package.interfaces";
import { getPackageById } from "../../../services/package.service";

import Map from "../components/map";

const Packet = ({ params }: { params: { id: string } }): JSX.Element => {
  const [paquete, setPaquete] = useState<Package>();
  useEffect(() => {
    getPackageById(params.id).then((packet: Package) => {
      setPaquete(packet);
    });
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
          {paquete ? (
            <Card>
              <Map destination={paquete.client.latlng} />
              <CardContent>
                <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                  <span style={{ fontWeight: 700 }}>Destino: </span>
                  {paquete?.client.address.street}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                  <span style={{ fontWeight: 700 }}>Numero del paquete: </span>
                  {paquete?._id}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
                  <span style={{ fontWeight: 700 }}>Recibe: </span>
                  {paquete?.deliveryDate.toString()}
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
          ) : null}
        </Accordion>
      </Container>
    </>
  );
};

export default Packet;
