import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import trash from "../../../../asset/redTrash.svg";
import { Package } from "@/utils/interfaces/package.interfaces";
import Image from "next/image";
import { deletePackage } from "@/app/services/admin.service";
import { toast } from "@/utils/alerts/alerts";
import getColorText from "@/utils/statusStyle/getColorText";
import getColorPackage from "@/utils/statusStyle/getColorPackage";

interface Props {
  paquete: Package;
  onDelete: () => void;
}

const CardManagePackage: React.FC<Props> = ({ paquete, onDelete }) => {
  const handleDelete = async (id: string): Promise<void> => {
    try {
      const deleted = await deletePackage(id);
      toast.fire({ icon: "success", text: `${deleted}` });
      onDelete();
    } catch (error: unknown) {
      toast.fire({ icon: "success", text: "Error al borrar el paquete." });
    }
  };

  return (
    <Box sx={{ maxWidth: "auto", height: "80px", display: "flex", borderBottom: "2px solid #e0e0e0" }}>
      <CardMedia sx={{ height: "70px", width: "70px", flexShrink: 0 }} title="paquete">
        <Image src={getColorPackage(paquete.status)} alt="paquete" width={70} />
      </CardMedia>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            pl: 1,
            pb: 1,
          }}
        >
          <Typography display="block" variant="subtitle1">
            {`${paquete.client.address.street} ${paquete.client.address.number}, ${paquete.client.address.city}`}
          </Typography>
          <Typography display="block" variant="subtitle1">
            {`${paquete.deliveryDate.split("T")[0].split("-")[2]}/${paquete.deliveryDate.split("T")[0].split("-")[1]}/${
              paquete.deliveryDate.split("T")[0].split("-")[0]
            }
              `}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton
            sx={{ textAlign: "right", mb: 1 }}
            onClick={(e: React.MouseEvent<HTMLElement>): void => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(paquete._id);
            }}
          >
            <Image alt="trash" src={trash} />
          </IconButton>
          <Typography
            variant="subtitle2"
            color={getColorText(paquete.status)}
            component="div"
            align="right"
            sx={{ mr: 1 }}
            fontWeight="700"
          >
            {paquete.status}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardManagePackage;
