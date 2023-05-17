"use client";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import faridImg from "../../../../asset/faridImg.png";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

import { requestPackRefs } from "../../../../utils/seed";
import Card from "../../../deliveryMan/workingDay/components/card";
import { PackageRef } from "@/utils/interfaces/package.interfaces";
import AdminGuard from "../../adminGuard";

const DeliveryDetail = (): JSX.Element => {
  const [paquetes, setPaquetes] = useState<PackageRef[]>([]);

  useEffect(() => {
    requestPackRefs(2).then((packs) => {
      setPaquetes(packs);
    });
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setPaquetes(paquetes.filter((pack) => pack._id !== id));
    } catch (error: unknown) {
      alert("Error al borrar el paquete");
    }
  };

  return (
    <AdminGuard>
      <>
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
                      <Card paquete={paquete} handleDelete={handleDelete} />
                    </AccordionDetails>
                  ))}
                </Accordion>
              </Container>
            </Box>
          </Box>
        </Container>
      </>
    </AdminGuard>
  );
};

export default DeliveryDetail;
