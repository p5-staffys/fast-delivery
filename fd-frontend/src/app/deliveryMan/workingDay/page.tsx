"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { PackageRef } from "@/utils/interfaces/package.interfaces";
//import { getAuthorization } from "../services/user.services";
import AuthGuard from "../authGuard";

import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Card from "./components/card";
import { getCurrentUser } from "../services/user.services";
import { User } from "@/utils/interfaces/user.interfaces";
import { alert } from "@/utils/alerts/alerts";

const WorkingDay = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<PackageRef[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<PackageRef[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const packs = currentUser.packages;
        setPaquetes(packs);

        const packFiltrados = packs.filter((paquete: PackageRef) => {
          return paquete.status === "delivering" ? paquete : null;
        });
        setPaquetesPending(packFiltrados);
      } catch {
        alert.fire({ icon: "error", title: "Error", text: "Hubo un problema. Por favor, vuelva a intentarlo." });
      }
    };
    getUser();
  }, []);

  return (
    <AuthGuard>
      <Container fixed>
        <Typography sx={{ fontSize: "14px" }}>Hola {user?.name + " " + user?.lastName}</Typography>
        <Link style={{ textDecoration: "none" }} href="/deliveryMan/workingDay/pending">
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
    </AuthGuard>
  );
};

export default WorkingDay;
