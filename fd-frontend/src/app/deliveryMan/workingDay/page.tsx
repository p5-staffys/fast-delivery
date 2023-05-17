"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { PackageRef } from "@/utils/interfaces/package.interfaces";
import AuthGuard from "../../../utils/guards/authGuard";

import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getCurrentUser } from "../services/user.services";
import { alert, choice } from "@/utils/alerts/alerts";
import CardManagePackage from "./components/card";
import { deletePackageFromHistory } from "@/app/services/package.service";

const WorkingDay = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<PackageRef[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<PackageRef[]>([]);

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentUser();

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

  const handleDelete = async (id: string): Promise<void> => {
    choice
      .fire({
        icon: "warning",
        text: "¿Estás seguro que quieres eliminar el paquete de tu historial?",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result): Promise<void> => {
        if (result.isConfirmed) {
          return deletePackage();
        } else {
          return;
        }
      });

    const deletePackage = async (): Promise<void> => {
      try {
        setPaquetes(paquetes.filter((pack) => pack._id !== id));
        setPaquetesPending(paquetes.filter((pack) => pack._id !== id));
        const updatedUser = await deletePackageFromHistory(id);
        const packs = updatedUser.packages;
        setPaquetes(packs);

        const packFiltrados = packs.filter((paquete: PackageRef) => {
          return paquete.status === "delivering" ? paquete : null;
        });
        setPaquetesPending(packFiltrados);
      } catch (error: unknown) {
        alert.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al borrar el paquete. Por favor, vuelva a intentarlo.",
        });
      }
    };
  };

  return (
    <AuthGuard>
      <Container fixed>
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
                <CardManagePackage paquete={paquete} handleDelete={handleDelete} />
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
          {paquetes.length
            ? paquetes.map((paquete, i) => (
                <AccordionDetails key={i}>
                  <CardManagePackage paquete={paquete} handleDelete={handleDelete} />
                </AccordionDetails>
              ))
            : null}
        </Accordion>
      </Container>
    </AuthGuard>
  );
};

export default WorkingDay;
