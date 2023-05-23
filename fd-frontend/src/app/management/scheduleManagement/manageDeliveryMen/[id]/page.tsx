"use client";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Card from "../../../../deliveryMan/workingDay/components/card";
import AdminGuard from "../../../../../utils/guards/adminGuard";
import { User } from "@/utils/interfaces/user.interfaces";
import { deletePackageByUser, getStatus, getUserById } from "@/app/services/admin.service";
import Swal from "sweetalert2";
import { alert } from "@/utils/alerts/alerts";
import { PackageStatus } from "@/utils/interfaces/package.interfaces";

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

  const colorStatus = statusUser ? "#96DB76" : "#FF6B6B";
  const deliveredPackages = user?.packages.filter((pack) => pack.status === PackageStatus.Delivered);
  const deliveringPackages = user?.packages.filter((pack) => pack.status === PackageStatus.Delivering);

  const handleStatus = async (id: string): Promise<void> => {
    const status = await getStatus(id);
    setStatusUser(status);
  };

  const handleDelete = async (idPackage: string): Promise<void> => {
    const result = await alert.fire({
      title: "Estas seguro que queres borrar este paquete?",
      text: "Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borralo!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const deletePackage = await deletePackageByUser(user?._id, idPackage);
      setUser(deletePackage);
      await alert.fire("Borrado!", "El paquete ha sido borrado.", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await alert.fire("Cancelado", "El paquete está a salvo :)", "error");
    }
  };

  return (
    <AdminGuard>
      <Container fixed maxWidth="md">
        <Link href={`/management/scheduleManagement/manageDeliveryMen`}>
          <IconButton aria-label="Example" sx={{ my: 1 }}>
            <ArrowBackIosIcon sx={{ color: "black" }} />
          </IconButton>
        </Link>
        <Box>
          <Box boxShadow={"0px 2px 6px rgba(0, 0, 0, 0.14)"} pb={2}>
            <Box>
              <Box mx={3} display="flex" justifyContent="space-between" alignContent="center" alignItems="center">
                <Box mt={2}>
                  <img
                    alt={user?.name || ""}
                    src={user?.avatarURL || ""}
                    width={50}
                    height={50}
                    style={{ objectPosition: "center center", objectFit: "cover", borderRadius: "25px" }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" textAlign="center">
                    {user?.name}
                  </Typography>
                  <Typography variant="subtitle1" textAlign="center" color={colorStatus}>
                    • {statusUser ? "Activo" : "Inactivo"}
                  </Typography>
                </Box>
                <Box>
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    checked={statusUser}
                    onChange={async (): Promise<void> => handleStatus(params.id)}
                  />
                </Box>
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
                      {`Le faltan repartir ${deliveringPackages?.length} paquetes`}
                    </Typography>
                  </Box>
                </AccordionSummary>
                {deliveringPackages?.map((pack) => (
                  <AccordionDetails key={pack._id}>
                    <Card paquete={pack} handleDelete={handleDelete} />
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
                      {`Ya repartió ${deliveredPackages?.length} paquetes`}
                    </Typography>
                  </Box>
                </AccordionSummary>
                {deliveredPackages?.map((pack) => (
                  <AccordionDetails key={pack._id}>
                    <Card paquete={pack} handleDelete={handleDelete} />
                  </AccordionDetails>
                ))}
              </Accordion>
            </Container>
          </Box>
        </Box>
      </Container>
    </AdminGuard>
  );
};

export default DeliveryDetail;
