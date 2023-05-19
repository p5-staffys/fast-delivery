"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackBtn from "./components/backBtn";
import AuthGuard from "../../../../utils/guards/authGuard";
import { assignPackages, getAllPackagesPending } from "@/app/services/package.service";
import { format } from "date-fns";
import { Package } from "../../../../utils/interfaces/package.interfaces";
import AddPackage from "./components/addPackage";
import { useRouter } from "next/navigation";

const Paquetes = (): JSX.Element => {
  const [state, setState] = useState<string[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const today = new Date();
  const date = format(today, "yyyy-MM-dd");
  const router = useRouter();

  useEffect(() => {
    const getAllPackagesAsync = async (): Promise<void> => {
      const allPackages = await getAllPackagesPending(date);
      setPackages(allPackages);
    };

    getAllPackagesAsync();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const num = state.length;
    if (num <= 10) {
      router.push("/deliveryMan/workingDay/getPackages/declaration");
      await assignPackages(state);
    } else {
      alert("No puede agregar mas de 10 paquetes");
    }
  };

  return (
    <AuthGuard>
      <Box component="form" onSubmit={handleSubmit}>
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
        {packages.map((paquete, i) => (
          <div key={i}>
            <AddPackage paquete={paquete} state={state} setState={setState} />
          </div>
        ))}
        <Button variant="contained" fullWidth type="submit" sx={{ m: "0 2.5vw", mt: 5, width: "95vw" }}>
          Iniciar jornada
        </Button>
      </Box>
    </AuthGuard>
  );
};

export default Paquetes;
