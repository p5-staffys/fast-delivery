"use client";
import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pack } from "../../../utils/seed";
import Card from "./components/card";
import { Package, useGlobalContext } from "@/context/store";


const WorkingDay = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<Pack[]>([]);
  const { data } = useGlobalContext();
  const item:any = localStorage.getItem("user");
  const userLocalstorage = JSON.parse(item);

  useEffect(() => {
    const packs = data.user ? data.user.packages : userLocalstorage.packages;
    setPaquetes(packs);
    const packFiltrados = packs.filter((paquete: Package) => {
      return paquete.status === "peding" ? paquete : null;
    });
    setPaquetesPending(packFiltrados);
  }, []);

  return (
    <>
      <Container fixed>
        <Link href="/deliveryMan/workingDay/getPackages">
          <Button sx={{ marginY: "15px" }} variant="contained" fullWidth={true}>
            Obtener paquetes
          </Button>
        </Link>

        <Accordion sx={{ marginY: "15px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Repartos pendientes</Typography>
          </AccordionSummary>

          {paquetesPending.length ? (
            paquetesPending.map((paquete, i) => (
              <AccordionDetails key={i}>
                <Card paquete={paquete} />
              </AccordionDetails>
            ))
          ) : (
            <CardContent>
              <Typography>No tenés repartos pendientes</Typography>
            </CardContent>
          )}
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Historial de repartos</Typography>
          </AccordionSummary>
          {paquetes.map((paquete, i) => (
            <AccordionDetails key={i}>
              <Card paquete={paquete} />
            </AccordionDetails>
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export default WorkingDay;
