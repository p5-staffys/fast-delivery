import { Layout } from "alias/components/layout";
import Header from "alias/components/header";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import faridImg from "../../asset/faridImg.png";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactElement, useEffect, useState } from "react";
import { Pack, requestPacks } from "alias/utils/seed";
import Card from "../../components/card";

const DeliveryDetail = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);

  useEffect(() => {
    requestPacks(2).then((packs) => {
      setPaquetes(packs);
    });
  }, []);

  return (
    <>
      <Header />
      <Container fixed>
        <Link href={`/gestion/agenda`}>
          <IconButton aria-label="Example" sx={{ my: 1 }}>
            <ArrowBackIosIcon sx={{ color: "black" }} />
          </IconButton>
        </Link>
        <Box>
          <Box boxShadow={"0px 2px 6px rgba(0, 0, 0, 0.14)"}>
            <Box>
              <Box sx={{ width: "100%" }} display="flex" justifyContent="space-between">
                <Box>
                  <Image alt="Farid" src={faridImg} />
                </Box>
                <Box sx={{ ml: 1, mt: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "16px", lineHeight: "18.75px" }}> Farid</Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "#217BCE" }}>• Activo</Typography>
                </Box>
                <Box sx={{ ml: 15 }}>
                  <Switch inputProps={{ "aria-label": "controlled" }} />
                </Box>
                <Box></Box>
              </Box>
            </Box>
            <Container sx={{ mt: 2 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box flexDirection={"column"}>
                    <Typography fontWeight={700} fontSize="16px" lineHeight={"20px"}>
                      Repartos pendientes
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: "12px", lineHeight: "20px" }}>
                      {" "}
                      No tiene repartos pendientes
                    </Typography>
                  </Box>
                </AccordionSummary>
              </Accordion>
            </Container>
            <Container sx={{ mt: 4 }}>
              <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box flexDirection={"column"}>
                    <Typography fontWeight={700} fontSize="16px" lineHeight={"20px"}>
                      Historial de repartos
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: "12px", lineHeight: "20px" }}>
                      Ya repartiste 58 paquetes
                    </Typography>
                  </Box>
                </AccordionSummary>
                {paquetes.map((paquete, i) => (
                  <AccordionDetails key={i}>
                    <Card paquete={paquete} />
                  </AccordionDetails>
                ))}
              </Accordion>
            </Container>
          </Box>
        </Box>
      </Container>
    </>
  );
};

DeliveryDetail.getLayout = function getLayout(page: ReactElement): ReactElement {
  return <Layout>{page}</Layout>;
};

export default DeliveryDetail;
