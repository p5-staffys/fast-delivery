"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "@/utils/interfaces/package.interfaces";
import { getPackageById } from "@/app/services/package.service";
import { deliverPackage } from "@/app/services/user.service";

import { useGlobalContext } from "@/context/store";

import Map from "../components/map";
import AuthGuard from "../../../../utils/guards/authGuard";
import CardTypography from "./commons/cardTypography";
import { alert, toast } from "@/utils/alerts/alerts";

const Packet = ({ params }: { params: { id: string } }): JSX.Element => {
  const [paquete, setPaquete] = useState<Package>();
  const router = useRouter();
  const { setUser } = useGlobalContext();

  useEffect(() => {
    getPackageById(params.id).then((packet: Package) => {
      setPaquete(packet);
    });
  }, []);

  const handleDeliver = async (_id: string): Promise<void> => {
    try {
      const delivered = await deliverPackage([_id]);
      setUser(delivered.updatedUser);
      toast.fire({
        icon: "success",
        title: "Paquete entregado con éxito!",
      });
      router.push("deliveryMan/workingDay");
    } catch {
      alert.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema con la confirmación de la entrega. Por favor, intentelo de nuevo.",
      });
    }
  };

  return (
    <AuthGuard>
      <Container fixed maxWidth="md">
        <Link href={`deliveryMan/workingDay`}>
          <IconButton aria-label="Example">
            <ArrowBackIosIcon sx={{ color: "black", mb: 2 }} />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reparto en curso
        </Typography>
        {paquete ? (
          <Card>
            <CardMedia>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Map destination={paquete.client.latlng} />
              </Box>
            </CardMedia>
            <CardContent>
              <CardTypography
                title={"Destino"}
                content={`${paquete.client.address.street} ${paquete.client.address.number}`}
              />
              <CardTypography title={"Cliente"} content={paquete.client.fullName} />
              <CardTypography title={"Fecha de entrega"} content={paquete.deliveryDate.toString().split("T")[0]} />
            </CardContent>
            <CardActions sx={{ flexDirection: "row-reverse", alignItems: "flex-end" }}>
              <Button
                variant="contained"
                size="medium"
                onClick={(): void => {
                  handleDeliver(paquete._id);
                }}
              >
                Paquete Entregado
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </Container>
    </AuthGuard>
  );
};

export default Packet;
