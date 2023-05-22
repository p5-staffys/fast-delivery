"use client";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import DayList from "./components/carousel";
import Progress from "./components/progress";
import AdminGuard from "../../../utils/guards/adminGuard";
import { getLogs } from "../../services/admin.service";
import { Logs } from "@/utils/interfaces/user.interfaces";

const Agenda = (): JSX.Element => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", { dateStyle: "short" });
  const [date, setDate] = useState<string>("");
  const [logs, setLogs] = useState<Logs>();

  useEffect(() => {
    const getAllLogsAsync = async (): Promise<void> => {
      if (date !== "") {
        const getAllLogs = await getLogs(date);
        setLogs(getAllLogs);
      }
    };
    getAllLogsAsync();
  }, [date]);

  const handleDate = (date: string): void => {
    setDate(date);
  };
  const progressPackages: number = logs?.packages.activePackages
    ? Math.round((logs.packages.activePackages * 100) / logs.packages.totalPackages)
    : 0;

  const progressUsers: number = logs
    ? Math.round((logs.users.activeUsers.length * 100) / logs.users.totalUsersCount)
    : 0;

  return (
    <AdminGuard>
      <Container fixed maxWidth="md">
        <Box sx={{ mb: 3, mt: 10 }}>
          <Typography variant="h5">Gestionar Pedidos</Typography>
        </Box>

        <DayList handleDate={handleDate} />

        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>{formattedDate} - Detalles</Typography>
        <Accordion sx={{ mt: 2 }} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Repartidores
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {`${logs?.users?.activeUsers.length ?? 0}/${logs?.users?.totalUsersCount ?? 0} activos`}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>

          <Box sx={{ width: "90vw", m: "auto" }}>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Progress value={progressUsers} />
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
            <Box sx={{ my: 2, mx: 2 }}>
              <Button variant="contained" fullWidth size="small">
                Ver repartidores
              </Button>
            </Box>
          </Link>
        </Accordion>

        <Accordion sx={{ mt: 2 }} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Paquetes
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {`${logs?.packages?.activePackages ?? 0}/${logs?.packages?.totalPackages ?? 0} repartidos`}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>

          <Box sx={{ width: "90vw" }}>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Progress value={progressPackages} />
                </Box>
              </Box>
            </AccordionDetails>
          </Box>
          <Link href={`/management/scheduleManagement/managePackages/${date}`}>
            <Box sx={{ my: 2, mx: 2 }}>
              <Button variant="contained" fullWidth size="small">
                Ver paquetes
              </Button>
            </Box>
          </Link>
        </Accordion>
      </Container>
    </AdminGuard>
  );
};

export default Agenda;
