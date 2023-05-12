"use client";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import DayList from "./components/carousel";
import Progress from "./components/progress";
import AdminGuard from "../adminGuard";
import { getLogs } from "../services/admin.service";
import { Logs } from "@/utils/interfaces/user.interfaces";
import { useGlobalContext } from "@/context/store";

const Agenda = (): JSX.Element => {
  const { user } = useGlobalContext();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", { dateStyle: "short" });
  const [date, setDate] = useState<string>("");
  const [logs, setLogs] = useState<Logs>();

  const handleDate = (date: string): void => {
    setDate(date);
  };

  useEffect(() => {
    const getAllLogsAsync = async (): Promise<void> => {
      if (date !== "") {
        const getAllLogs = await getLogs(date);
        setLogs(getAllLogs);
      }
    };
    getAllLogsAsync();
  }, [date]);

  const progressPackages: number = logs?.packages.activePackages
    ? Math.round((logs.packages.activePackages * 100) / logs.packages.totalPackages)
    : 0;

  const progressUsers: number = logs
    ? Math.round((logs.users.activeUsers.length * 100) / logs.users.totalUsersCount)
    : 0;

  return (
    <AdminGuard>
      <Container>
        <Box sx={{ mt: 0, display: "flex", flexDirection: "inherit", alignItems: "center" }}>
          <img
            src={
              user.avatarURL
                ? user.avatarURL
                : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
            }
            alt="logo"
            width={53}
            style={{ borderRadius: "50%" }}
          />
          <Box sx={{ paddingX: 2, mb: 3, flexGrow: 1, marginTop: "10px" }}>
            <Typography sx={{ fontSize: "14px" }}>Hola Admin!</Typography>
            <Typography sx={{ fontFamily: "Roboto", fontSize: "18px", fontWeight: 700 }}>Gestionar pedidos</Typography>
          </Box>
        </Box>
        <DayList handleDate={handleDate} />
        <Accordion sx={{ mt: 2 }} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>{formattedDate} - Detalles</Typography>
          </AccordionSummary>
          <Container>
            <Box sx={{ width: "90vw", m: "auto" }}>
              <AccordionDetails>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Progress value={progressUsers} />
                  </Box>
                  <Box sx={{ ml: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "15px" }}> Repartidores</Typography>
                    <Typography sx={{ fontWeight: 200, fontSize: "13px" }}>
                      {" "}
                      {`${logs?.users?.activeUsers.length ?? 0}/${logs?.users?.totalUsersCount ?? 0} activos`}
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ mr: 3 }}>
                      {logs?.users?.activeUsers.map((user) => (
                        <img
                          key={user._id}
                          style={{ position: "absolute", right: 59, width: "60px", borderRadius: "50%" }}
                          alt="avatar"
                          src={
                            user.avatarURL
                              ? user.avatarURL
                              : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Box>
            <Link href="/management/scheduleManagement/manageDeliveryMen">
              <Button sx={{ my: 2 }} variant="contained" fullWidth size="small">
                Ver repartidores
              </Button>
            </Link>
            <Box sx={{ width: "90vw", m: "auto" }}>
              <AccordionDetails>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Progress value={progressPackages} />
                  </Box>
                  <Box sx={{ mr: 12 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "15px" }}> Paquetes</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>{`${logs?.packages?.activePackages ?? 0}/${
                      logs?.packages?.totalPackages ?? 0
                    } repartidos`}</Typography>
                  </Box>
                  <Box></Box>
                </Box>
              </AccordionDetails>
            </Box>
            <Link href={`/management/scheduleManagement/managePackages/${date}`}>
              <Button sx={{ my: 2 }} variant="contained" fullWidth size="small">
                Ver paquetes
              </Button>
            </Link>
          </Container>
        </Accordion>
      </Container>
    </AdminGuard>
  );
};

export default Agenda;
