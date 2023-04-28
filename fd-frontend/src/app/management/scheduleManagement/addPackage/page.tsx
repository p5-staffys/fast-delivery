"use client";
import React, { ChangeEventHandler, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import BackBtn from "../../../deliveryMan/workingDay/getPackages/components/backBtn";
import { UserRef } from "@/context/store";
import { createPackage } from "@/app/services/packets.service";

const addPackage = (): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [client, setClient] = useState<UserRef>({
    client: {
      fullName: "",
      address: {
        street: "",
      },
    },
  });

  const handleAdd = (): void => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
  };

  const handleSubtract = (): void => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleWeight: ChangeEventHandler<HTMLInputElement> = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const inputElement = e.currentTarget as HTMLInputElement;
    setWeight(parseInt(inputElement.value));
  };

  const handleDate: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeliveryDate(e.target.value);
  };

  const handlestreet: ChangeEventHandler<HTMLInputElement> = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const inputElement = e.currentTarget as HTMLInputElement;
    const name = inputElement.name;
    const value = inputElement.value;
    setClient((prevState) => ({
      ...prevState,
      client: {
        ...prevState.client,
        address: {
          ...prevState.client.address,
          [name]: value,
        },
      },
    }));
  };

  const handleUser: ChangeEventHandler<HTMLInputElement> = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const inputElement = e.currentTarget as HTMLInputElement;
    const name = inputElement.name;
    const value = inputElement.value;
    setClient((prevState) => ({
      ...prevState,
      client: {
        ...prevState.client,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await createPackage(weight, client, deliveryDate, quantity);
      if (response) {
        alert("se creó el paquete con exito");
      }
    } catch (error: unknown) {
      alert("falló la creacion del paquete");
    }
  };

  return (
    <>
      <Box>
        <BackBtn back="management/scheduleManagement/managePackages" />
        <Typography sx={{ ml: "20px", mb: "0.5vh", fontSize: "1em", fontWeight: 800 }}>Argregar paquetes</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Box className="addPackageData">
          <TextField
            id="standard-basic"
            label="Dirección"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: { color: "#f5bd09" },
            }}
            onChange={handlestreet}
            name="street"
          />
          <TextField
            id="standard-basic"
            label="Nombre de quien recibe"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: { color: "#f5bd09" },
            }}
            onChange={handleUser}
            name="fullName"
          />
          <TextField
            id="standard-basic"
            label="Peso (Kg)"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: { color: "#f5bd09" },
            }}
            onChange={handleWeight}
          />
          <Typography sx={{ mt: "1em", mb: "0.5vh", fontSize: "1em", color: "#f5bd09" }}>
            Fecha en la que debe ser repartido{" "}
          </Typography>
          <input type="date" value={deliveryDate} onChange={handleDate} style={{ color: "#f5bd09" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: "0.5vh", mt: "1em" }}>
          <Typography variant="body1" sx={{ color: "#f5bd09", mr: "12px" }}>
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
  );
};

export default addPackage;
