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


const Jornada = () => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);
  const [paquetesPending, setPaquetesPending] = useState<Pack[]>([]);
  useEffect(() => {
    requestPacks(5).then((packs) => {
      setPaquetes(packs);
      const packFiltrados = packs.filter((paquete) => {
        return paquete.status === "pending" ? paquete : null;
      });
      setPaquetesPending(packFiltrados);
    });
  }, []);
 
  return (
    <>
      <Header />
      <Container fixed>
        
        <Button sx={{ marginY: "15px" }} variant="contained" fullWidth={true}>
          Obtener paquetes
        </Button>
        

        <Accordion sx={{ marginY: "15px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
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

Jornada.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Jornada;
