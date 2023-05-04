"use client";
import React from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Logo1 from "../../../../asset/Ellipse-9.png";
import Logo2 from "../../../../asset/Ellipse-92.png";
import Logo3 from "../../../../asset/Ellipse93.png";
import Link from "next/link";
import BackBtn from "../../../deliveryMan/workingDay/getPackages/components/backBtn";
import Progress from "../components/progress";
import AdminGuard from "../../adminGuard";

const Repartidores = (): JSX.Element => {
  return (
    <AdminGuard>
      <>
        <BackBtn back="management/scheduleManagement" />
        <Box sx={{ width: "90vw", m: "auto" }}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>
                <strong>Repartidores</strong>
              </Typography>
            </AccordionSummary>
            <Link href={"management/scheduleManagement/deliveryDetail"}>
              <AccordionDetails>
                <Box display="flex" justifyContent="space-between" sx={{ m: "0 10px" }}>
                  <Box>
                    <Progress value={60} />
                  </Box>
                  <Box>
                    <Typography> Farid</Typography>
                    <Typography sx={{ color: "#217bce" }}> • Viaje en curso</Typography>
                  </Box>
                  <Box>
                    <Image alt="Remy Sharp" src={Logo1} width={50} height={50} />
                  </Box>
                </Box>
              </AccordionDetails>
            </Link>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between" sx={{ m: "0 10px" }}>
                <Box>
                  <Progress value={100} />
                </Box>
                <Box>
                  <Typography>Luciana</Typography>
                  <Typography sx={{ color: "#96db76", mr: "50px" }}> • Finalizo</Typography>
                </Box>
                <Box>
                  <Image alt="Remy Sharp" src={Logo2} width={50} height={50} />
                </Box>
              </Box>
            </AccordionDetails>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between" sx={{ m: "0 10px" }}>
                <Box>
                  <Progress value={65} />
                </Box>
                <Box>
                  <Typography> Santiago</Typography>
                  <Typography sx={{ color: "#ff6b6b", mr: "50px" }}> • Inactivo</Typography>
                </Box>
                <Box>
                  <Image alt="Remy Sharp" src={Logo3} width={50} height={50} />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    </AdminGuard>
  );
};

export default Repartidores;
