"use client";
import {
  Accordion,
  AccordionSummary,
  Box,
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
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "@/utils/interfaces/package.interfaces";
import { getPackageById } from "../../../services/package.service";

import Map from "../components/map";
import AuthGuard from "../../authGuard";
import CardTypography from "./commons/cardTypography";

const Packet = ({ params }: { params: { id: string } }): JSX.Element => {
  const [paquete, setPaquete] = useState<Package>();

  useEffect(() => {
    getPackageById(params.id).then((packet: Package) => {
      setPaquete(packet);
    });
  }, []);

  return (
    <AuthGuard>
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
              <CardMedia>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Map destination={paquete.client.latlng} />
                </Box>
              </CardMedia>
              <CardContent>
                <CardTypography
                  title={"Destino"}
                  content={`${paquete.client.address.street} ${paquete.client.address.number}`}
                />
                <CardTypography title={"Cliente"} content={paquete.client.fullName} />
                <CardTypography title={"Fecha de entrega"} content={paquete.deliveryDate.toString().split("T")[0]} />
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
    </AuthGuard>
  );
};

export default Packet;
