"use client";
import React, { ChangeEventHandler, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import BackBtn from "../../../deliveryMan/workingDay/getPackages/components/backBtn";
import { createPackage } from "@/app/services/package.service";
import AdminGuard from "../../adminGuard";

const addPackage = (): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("Argentina");

  const handleAdd = (): void => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
  };

  const handleSubtract = (): void => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleWeight: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWeight(parseInt(e.target.value));
  };

  const handleDate: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeliveryDate(e.target.value);
  };

  const handleFullName: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
  };

  const handleNumber: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNumber(e.target.value);
  };

  const handleStreet: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStreet(e.target.value);
  };

  const handleCity: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleState: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState(e.target.value);
  };

  const handleCountry: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await createPackage(
        weight,
        fullName,
        number,
        street,
        city,
        state,
        country,
        deliveryDate,
        quantity,
      );
      if (response) {
        alert("se creó el paquete con exito");
      }
    } catch (error: unknown) {
      alert("falló la creacion del paquete");
    }
  };

  return (
    <AdminGuard>
      <>
        <Box>
          <BackBtn back="management/scheduleManagement/managePackages" />
          <Typography sx={{ ml: "20px", mb: "0.5vh", fontSize: "1em", fontWeight: 800 }}>Argregar paquetes</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Box className="addPackageData">
            <TextField
              id="standard-basic"
              label="Nombre de quien recibe"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleFullName}
              name="fullName"
            />
            <TextField
              id="standard-basic"
              label="Calle"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleStreet}
              name="street"
            />
            <TextField
              id="standard-basic"
              label="Altura"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleNumber}
              name="number"
            />
            <TextField
              id="standard-basic"
              label="Ciudad"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleCity}
              name="city"
            />
            <TextField
              id="standard-basic"
              label="Provincia"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleState}
              name="state"
            />
            <TextField
              id="standard-basic"
              label="País"
              variant="standard"
              fullWidth
              color="primary"
              onChange={handleCountry}
              name="country"
              defaultValue={country}
            />
            <TextField
              id="standard-basic"
              label="Peso (Kg)"
              variant="standard"
              fullWidth
              color="primary"
              type="number"
              onChange={handleWeight}
            />
            <Typography sx={{ mt: "1em", mb: "0.5vh", fontSize: "1em", color: "primary" }}>
              Fecha en la que debe ser repartido{" "}
            </Typography>
            <input type="date" value={deliveryDate} onChange={handleDate} style={{ color: "primary" }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: "0.5vh", mt: "1em" }}>
            <Typography variant="body1" sx={{ color: "primary", mr: "12px" }}>
              Cantidad
            </Typography>
            <Box className="quantity" sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleSubtract}>-</IconButton>
              <Typography sx={{ m: "0 12px" }}>{quantity}</Typography>
              <IconButton onClick={handleAdd}>+</IconButton>
            </Box>
          </Box>
          <Button variant="contained" sx={{ m: "0 5vw", mt: 2, width: "90vw" }} type="submit">
            <strong>Agregar</strong>
          </Button>
        </Box>
      </>
    </AdminGuard>
  );
};

export default addPackage;
