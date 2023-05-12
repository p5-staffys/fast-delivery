"use client";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Card from "../../../../deliveryMan/workingDay/components/card";
import AdminGuard from "../../../adminGuard";
import { User } from "@/utils/interfaces/user.interfaces";
import { getStatus, getUserById } from "@/app/management/services/admin.service";

const DeliveryDetail = ({ params }: { params: { id: string } }): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [statusUser, setStatusUser] = useState<boolean>(false);

  useEffect(() => {
    const getUserAsync = async (): Promise<void> => {
      const userInfo = await getUserById(params.id);
      setUser(userInfo);
      setStatusUser(userInfo.active);
    };

    getUserAsync();
  }, [params.id]);

  const colorStatus = user?.active ? "#96DB76" : "#FF6B6B";
  const deliveredPackages = user?.packages.filter((pack) => pack.status === "delivered");
  const deliveringPackages = user?.packages.filter((pack) => pack.status === "delivering");

  const handleStatus = async (id: string): Promise<void> => {
    const status = await getStatus(id);
    setStatusUser(status);
  };

  return (
    <AdminGuard>
      <>
        <Container fixed>
          <Link href={`/management/scheduleManagement/manageDeliveryMen`}>
            <IconButton aria-label="Example" sx={{ my: 1 }}>
              <ArrowBackIosIcon sx={{ color: "black" }} />
            </IconButton>
          </Link>
          <Box>
            <Box boxShadow={"0px 2px 6px rgba(0, 0, 0, 0.14)"}>
              <Box>
                <Box sx={{ width: "100%" }} display="flex" justifyContent="space-between">
                  <Box>
                    <Image
                      alt={user?.name || ""}
                      src={user?.avatarURL || ""}
                      width={50}
                      height={50}
                      style={{ borderRadius: "25px", objectPosition: "center right" }}
                    />
                  </Box>
                  <Box sx={{ ml: 1, mt: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "16px", lineHeight: "18.75px" }}>
                      {user?.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", color: colorStatus }}>
                      • {user?.active ? "Activo" : "Inactivo"}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 15 }}>
                    <Switch
                      inputProps={{ "aria-label": "controlled" }}
                      checked={statusUser}
                      onChange={async (): Promise<void> => handleStatus(params.id)}
                    />
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
                        {`Te faltan repartir ${deliveringPackages?.length} paquetes`}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  {deliveringPackages?.map((pack) => (
                    <AccordionDetails key={pack._id}>
                      <Card paquete={pack} />
                    </AccordionDetails>
                  ))}
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
                        {`Ya repartiste ${deliveredPackages?.length} paquetes`}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  {deliveredPackages?.map((pack) => (
                    <AccordionDetails key={pack._id}>
                      <Card paquete={pack} />
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
