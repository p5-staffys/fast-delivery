import Button from "@mui/material/Button";
import { Container, Accordion, AccordionSummary, CardContent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../../components/card";
import { Layout } from "alias/components/layout";
import Header from "alias/components/header";
import { useEffect, useState } from "react";
import { Pack, requestPacks } from "alias/utils/seed";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Jornada = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<Pack[]>([]);
  const [user, setUser] = useState<{ Name: string; Value: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    requestPacks(5).then((packs) => {
      setPaquetes(packs);
      const packFiltrados = packs.filter((paquete) => {
        return paquete.status === "pending" ? paquete : null;
      });
      setPaquetesPending(packFiltrados);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/current", { withCredentials: true })
      .then((response) => {
        setUser(response.data.UserAttributes);
      })
      .catch(async () => router.push("/"));
  }, []);

  return (
    <>
      <Header />
      <Container fixed>
        {user.length ? <Typography variant="h6">{user[2].Value} says "Hello World"</Typography> : null}
        <Link href={"/repartidor/paquetes"}>
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

Jornada.getLayout = function getLayout(page: React.ReactElement): React.ReactElement {
  return <Layout>{page}</Layout>;
};

export default Jornada;
