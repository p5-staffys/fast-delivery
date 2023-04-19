"use client";
import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pack, requestPacks } from "../../../utils/seed";
import Card from "./components/card";

const WorkingDay = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<Pack[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<{ Name: string; Value: string }[]>([]);

  useEffect(() => {
    requestPacks(5).then((packs) => {
      setPaquetes(packs);
      const packFiltrados = packs.filter((paquete) => {
        return paquete.status === "pending" ? paquete : null;
      });
      setPaquetesPending(packFiltrados);
    });
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8080/auth/current", { withCredentials: true })
  //       .then((response) => {
  //         setUser(response.data.UserAttributes);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  return (
    <>
      <Container fixed>
        {user.length ? <Typography variant="h6">{user[2].Value} says "Hello World"</Typography> : null}
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
