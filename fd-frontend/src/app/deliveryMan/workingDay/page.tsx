"use client";
import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "./components/card";
import { useGlobalContext } from "@/context/store";
import { PackageRef } from "@/utils/interfaces/package.interfaces";

const WorkingDay = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<PackageRef[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<PackageRef[]>([]);
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user?.packages) {
      const packs = user.packages;
      setPaquetes(packs);
      const packFiltrados = packs.filter((paquete: PackageRef) => {
        return paquete.status === "peding" ? paquete : null;
      });
      setPaquetesPending(packFiltrados);
    }
  }, []);

  return (
    <>
      <Container fixed>
        <Link style={{ textDecoration: "none" }} href="/deliveryMan/workingDay/getPackages">
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
