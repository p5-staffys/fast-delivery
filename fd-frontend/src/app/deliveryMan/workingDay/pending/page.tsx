"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackBtn from "./components/backBtn";
import { useRouter } from "next/navigation";
import AuthGuard from "../../../../utils/guards/authGuard";
import PackageCard from "./components/packageCard";
import { getPendingPackages } from "@/app/services/package.service";
import { IPackagesByClient } from "@/utils/interfaces/package.interfaces";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { inicial, questions } from "../../../../utils/declaration";
import { alert, toast } from "@/utils/alerts/alerts";
import { sendForm } from "../../../services/user.service";
import { assignPackages } from "@/app/services/package.service";
import ErrorRadios from "./components/radioGroup";

const Paquetes = (): JSX.Element => {
  const [packages, setPackages] = useState<IPackagesByClient[]>([]);
  const [packagesIds, setPackagesIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [asks, setAsks] = useState(inicial);
  const router = useRouter();
  const date = new Date().toJSON().split("T")[0];

  useEffect(() => {
    const getPackages = async (): Promise<void> => {
      try {
        const pendingPackages = await getPendingPackages(date, 1);
        setPackages(pendingPackages);
      } catch {
        alert.fire({ icon: "error", title: "Error", text: "Hubo un problema. Por favor vuelva a intentarlo." });
      }
    };
    getPackages();
  }, []);

  const handleLoadMore = async (): Promise<void> => {
    try {
      const pendingPackages = await getPendingPackages(date, 1);
      const newPackages: IPackagesByClient[] = packages.concat(pendingPackages);
      setPackages(newPackages);
    } catch {
      alert.fire({ icon: "error", title: "Error", text: "Hubo un problema. Por favor vuelva a intentarlo." });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setOpen(true);
  };

  const handleClose = async (): Promise<void> => {
    setOpen(false);
  };

  const handleClick = (event: SyntheticEvent<Element, Event>): void => {
    const { name, value } = event.target as HTMLButtonElement;
    const res = value === "true" ? true : false;

    return setAsks({ ...asks, [name]: res });
  };

  const handleDialogSubmit = async (): Promise<void> => {
    const arr = Object.values(asks);
    try {
      if (arr.some((element) => element === null)) {
        alert.fire({ icon: "error", title: "Error", text: "Por favor, completa el formulario antes de continuar." });
      } else if (arr.every((element) => element)) {
        await sendForm(asks);
        alert.fire({ icon: "error", title: "Error", text: "Por favor, completa el formulario antes de continuar." });
      } else {
        const formResponse = await sendForm(asks);
        if (!formResponse.ok) {
          toast.fire({ icon: "error", text: formResponse.message });
        } else {
          toast.fire({ icon: "success", text: formResponse.message });
          await assignPackages(packagesIds);
        }
        router.push("/deliveryMan/workingDay");
      }
    } catch {
      alert.fire({ icon: "error", title: "Error", text: "Por favor, intentelo nuevamente." });
    }
  };

  return (
    <AuthGuard>
      <>
        <Box
          sx={{ maxWidth: "100vw", height: "12vh", ml: 2, mt: 2 }}
          display="flex"
          justifyContent="center"
          alignItems="start"
          flexDirection="column"
        >
          <BackBtn back="deliveryMan/workingDay" />
          <h2>Obtener paquetes</h2>
          <Typography sx={{ fontSize: "0.9em" }}>¿Cuántos paquetes más vas a repartir hoy?</Typography>
        </Box>
        {packages?.map((client, i) => (
          <PackageCard client={client} key={i} packagesIds={packagesIds} setPackagesIds={setPackagesIds} />
        ))}
        <Button variant="contained" sx={{ m: "0 2.5vw", mt: 5, width: "95vw" }} onClick={handleLoadMore}>
          cargar más
        </Button>
        <Button variant="contained" sx={{ m: "0 2.5vw", mt: 2, width: "95vw" }} onClick={handleSubmit}>
          Iniciar jornada
        </Button>
        <Dialog open={open} onClose={handleClose} sx={{ zIndex: "1000" }}>
          <DialogTitle>
            <Typography fontWeight={400} fontSize="18px" lineHeight={"21,78px"}>
              Declaración jurada
            </Typography>
          </DialogTitle>
          <DialogContent>
            {questions.map((ask, i) => (
              <Box key={i}>
                <ErrorRadios ask={ask} handleClick={handleClick} />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button sx={{ marginY: "15px" }} variant="contained" fullWidth onClick={handleDialogSubmit}>
              continuar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </AuthGuard>
  );
};

export default Paquetes;
