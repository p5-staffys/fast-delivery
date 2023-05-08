"use client";
import React from "react";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { signUp } from "../services/auth.service";

const RegisterForm = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await signUp(email, password, name, lastName);
      if (response) {
        alert("Usuario creado con éxito.");
        router.push("/");
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ width: "90vw", m: "auto" }}>
      <TextField
        id="standard-basic"
        label="Nombre"
        variant="standard"
        fullWidth
        type="name"
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        value={name}
        onChange={(e): void => {
          setName(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="Apellido"
        variant="standard"
        fullWidth
        type="lastName"
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        value={lastName}
        onChange={(e): void => {
          setLastName(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="E-Mail"
        variant="standard"
        fullWidth
        type="email"
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        value={email}
        onChange={(e): void => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="standard"
        type={visibility ? "text" : "password"}
        fullWidth
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        onChange={(e): void => {
          setPassword(e.target.value);
        }}
        sx={{
          mt: 2,
          mb: 1,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(): void => {
                  setVisibility(!visibility);
                }}
                edge="end"
              >
                {visibility ? <VisibilityIcon sx={{ color: "grey" }} /> : <VisibilityOffIcon sx={{ color: "grey" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 5 }}>
        <strong>Registrarse</strong>
      </Button>
    </Box>
  );
};

export default RegisterForm;
