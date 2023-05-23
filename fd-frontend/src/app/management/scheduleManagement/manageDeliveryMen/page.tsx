"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
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
      <>
        <BackBtn back="management/scheduleManagement" />
        <Box sx={{ width: "90vw", m: "auto" }}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>
                <strong>Repartidores</strong>
              </Typography>
            </AccordionSummary>
            {users.map((user) => {
              const colorStatus = user.active ? "#96DB76" : "#FF6B6B";
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
                        <Typography sx={{ color: "#000000" }}> {user.name} </Typography>
                        <Typography sx={{ color: colorStatus }}> • {user.active ? "Activo" : "Inactivo"}</Typography>
                      </Box>
                      <Box>
                        <Image
                          alt={user.name}
                          src={user.avatarURL}
                          width={50}
                          height={50}
                          style={{ borderRadius: "25px", objectPosition: "center right" }}
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Link>
              );
            })}
          </Accordion>
        </Box>
      </>
    </AdminGuard>
  );
};

export default Repartidores;
