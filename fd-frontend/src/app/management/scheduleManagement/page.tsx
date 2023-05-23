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
  const [date, setDate] = useState<string>("");
  const [logs, setLogs] = useState<Logs>();
  const [packagesProgress, setPackagesProgress] = useState<number>(0);
  const [usersProgress, setUsersProgress] = useState<number>(0);

  useEffect(() => {
    const getAllLogsAsync = async (): Promise<void> => {
      if (date !== "") {
        const getAllLogs = await getLogs(date);
        setLogs(getAllLogs);

        const progressPackages: number = getAllLogs?.packages.deliveredPackages
          ? Math.round((getAllLogs.packages.deliveredPackages * 100) / getAllLogs.packages.totalPackages)
          : 0;
        setPackagesProgress(progressPackages);

        const progressUsers: number = getAllLogs
          ? Math.round((getAllLogs.users.activeUsers.length * 100) / getAllLogs.users.totalUsersCount)
          : 0;
        setUsersProgress(progressUsers);
      }
    };
    getAllLogsAsync();
  }, [date]);

  const handleDate = (date: string): void => {
    setDate(date);
  };

  return (
    <AdminGuard>
      <Container fixed maxWidth="md">
        <Box sx={{ mb: 2, mt: 10 }}>
          <Typography variant="h5">Gestionar</Typography>
        </Box>

        <DayList handleDate={handleDate} />

        <Typography variant="h5">Detalles</Typography>
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

          <Box>
            <AccordionDetails>
              <Grid container justifyContent="space-between">
                <Grid item mx={3}>
                  <Progress value={usersProgress} />
                </Grid>
                <Grid item mx={3}>
                  <Grid container flex={2}>
                    {logs?.users?.activeUsers.map((user, i) => (
                      <Grid item key={i}>
                        <img
                          width={50}
                          height={50}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          alt="avatar"
                          src={
                            user.avatarURL
                              ? user.avatarURL
                              : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
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
                  {`${logs?.packages?.deliveredPackages ?? 0}/${logs?.packages?.totalPackages ?? 0} repartidos`}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>

          <Box sx={{ width: "90vw" }}>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Progress value={packagesProgress} />
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
