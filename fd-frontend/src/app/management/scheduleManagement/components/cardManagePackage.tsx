import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, IconButton, Typography } from "@mui/material";
import imagePack from "../../../../asset/pack.svg";
import trash from "../../../../asset/redTrash.svg";
import { Package } from "@/utils/interfaces/package.interfaces";
import Image from "next/image";
import { deletePackage } from "@/app/services/admin.service";
import { toast } from "@/utils/alerts/alerts";

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
      <CardMedia sx={{ height: "100%", width: "70px", flexShrink: 0 }} image={imagePack.src} title="paquete" />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          ml: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            maxHeight: "1em",
            overflow: "none",
            font: "Open Sans",
            fontWeight: 400,
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "20px" },
            lineHeight: "20px",
          }}
          component="div"
          variant="subtitle1"
        >
          {`${paquete.client.address.street} ${paquete.client.address.number}`}
        </Typography>
        <Box
          sx={{ width: { xs: "24px", sm: "28px", md: "32px", lg: "36px", xl: "40px" } }}
          onClick={(): void => {
            handleDelete(paquete._id);
          }}
        >
          <IconButton
            sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="previous"
          >
            <Image alt="trash" src={trash} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CardManagePackage;
