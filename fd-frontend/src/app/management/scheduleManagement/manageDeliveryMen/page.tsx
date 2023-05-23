"use client";
import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import BackBtn from "../../../deliveryMan/workingDay/pending/components/backBtn";
import Progress from "../components/progress";
import AdminGuard from "../../../../utils/guards/adminGuard";
import { getAllUsers } from "../../../services/admin.service";
import { User } from "@/utils/interfaces/user.interfaces";
import { PackageStatus } from "@/utils/interfaces/package.interfaces";

const Repartidores = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsersAsync = async (): Promise<void> => {
      const allPackages = await getAllUsers();
      setUsers(allPackages);
    };

    getAllUsersAsync();
  }, []);

  return (
    <AdminGuard>
      <Container fixed maxWidth="md">
        <BackBtn back="management/scheduleManagement" />
        <Box sx={{ m: "auto" }}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>
                <strong>Repartidores</strong>
              </Typography>
            </AccordionSummary>
            {users.map((user) => {
              const deliveredPackages = user.packages.filter((pack) => pack.status === PackageStatus.Delivered);
              const progressDelivered =
                deliveredPackages.length > 0 ? Math.round((deliveredPackages.length / user.packages.length) * 100) : 0;
              return (
                <Link href={`management/scheduleManagement/manageDeliveryMen/${user._id}`} key={user._id}>
                  <AccordionDetails>
                    <Box display="flex" justifyContent="space-between" sx={{ m: "0 10px" }}>
                      <Box>
                        <Progress value={progressDelivered} />
                      </Box>
                      <Box>
                        <Typography color="black" textAlign="center">
                          {`${user.name} ${user.lastName}`}{" "}
                        </Typography>
                        <Typography color={user.active ? "#96DB76" : "#FF6B6B"} textAlign="center">
                          • {user.active ? "Activo" : "Inactivo"}
                        </Typography>
                      </Box>
                      <Box>
                        <img
                          alt={user.name}
                          src={user.avatarURL}
                          width={50}
                          height={50}
                          style={{ borderRadius: "25px", objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Link>
              );
            })}
          </Accordion>
        </Box>
      </Container>
    </AdminGuard>
  );
};

export default Repartidores;
