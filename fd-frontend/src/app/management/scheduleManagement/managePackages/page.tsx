"use client";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "../../../../asset/AddIcon.png";
import Image from "next/image";
import CardManagePackage from "../components/cardManagePackage";
import { GetPackages, Package } from "../services/admin.services";

const ManagePackage = (): JSX.Element => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    async function getAllPackages(): Promise<void> {
      const allPackages = await GetPackages();
      setPackages(allPackages);
    }
    getAllPackages();
  }, []);

  return (
    <>
      <Container fixed>
        <Link href={`management/scheduleManagement`}>
          <IconButton aria-label="Example" sx={{ my: 2 }}>
            <ArrowBackIosIcon sx={{ color: "black" }} />
          </IconButton>
        </Link>
        <Box mt={3}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>Paquetes</Typography>
            </AccordionSummary>
            <Container>
              <Typography sx={{ font: "Open sans", fontWeight: 400, fontSize: "12px", lineHeight: "20px" }}>
                Hay 523 paquetes con el criterio de filtrado seleccionado
              </Typography>
            </Container>
            {packages.map((pack) => (
              <AccordionDetails key={pack._id}>
                <CardManagePackage package={pack} />
              </AccordionDetails>
            ))}
          </Accordion>
        </Box>
        <Link href={`/management/scheduleManagement/addPackage`}>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
            <Image alt="trash" src={AddIcon} />
          </Box>
        </Link>
      </Container>
    </>
  );
};

export default ManagePackage;
