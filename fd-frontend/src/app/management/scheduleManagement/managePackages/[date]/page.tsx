"use client";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "../../../../../asset/AddIcon.png";
import Image from "next/image";
import CardManagePackage from "../../components/cardManagePackage";
import { Package } from "@/utils/interfaces/package.interfaces";
import { getAllPackages } from "@/app/services/package.service";
import AdminGuard from "@/utils/guards/adminGuard";
import { toast } from "@/utils/alerts/alerts";

const ManagePackage = ({ params }: { params: { date: string } }): JSX.Element => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const getAllPackagesAsync = async (): Promise<void> => {
      const allPackages = await getAllPackages(params.date);
      setPackages(allPackages);
    };

    getAllPackagesAsync();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setPackages(packages.filter((pack) => pack._id !== id));
    } catch (error: unknown) {
      toast.fire({ icon: "error", text: "Error al borrar el paquete." });
    }
  };

  return (
    <AdminGuard>
      <>
        <Container fixed maxWidth="md">
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
                  {`Hay ${packages.length} paquetes para el dia de hoy`}
                </Typography>
              </Container>
              {packages.length > 0
                ? packages.map((pack, i) => (
                    <AccordionDetails key={i}>
                      <CardManagePackage paquete={pack} onDelete={async (): Promise<void> => handleDelete(pack._id)} />
                    </AccordionDetails>
                  ))
                : null}
            </Accordion>
          </Box>
          <Link href={`/management/scheduleManagement/addPackage`}>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
              <Image alt="add" src={AddIcon} />
            </Box>
          </Link>
        </Container>
      </>
    </AdminGuard>
  );
};

export default ManagePackage;
