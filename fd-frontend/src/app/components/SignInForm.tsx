"use client";
import React from "react";
import { ChangeEventHandler, ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useGlobalContext } from "@/context/store";
import { signIn } from "../services/auth.service";

const SignInForm = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const { setUser } = useGlobalContext();
  const router = useRouter();

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const inputElement = e.currentTarget as HTMLInputElement;
    setEmail(inputElement.value);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const inputElement = e.currentTarget as HTMLInputElement;
    setPassword(inputElement.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await signIn(email, password);
    setUser(response.user);
    if (response.isAdmin) {
      router.push("/management/scheduleManagement");
    } else {
      router.push("/deliveryMan/workingDay");
    }
  };

  const handleVisibility = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (visibility) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };
  const eye: string = visibility ? "text" : "password";

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ width: "90vw", m: "auto" }}>
      <TextField
        id="standard-basic"
        label="Usuario"
        variant="standard"
        fullWidth
        type="email"
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        value={email}
        onChange={handleEmail}
      />
      <TextField
        id="standard-basic"
        label="Contraseña"
        variant="standard"
        type={eye}
        fullWidth
        InputLabelProps={{
          style: { color: "#f5bd09" },
        }}
        value={password}
        onChange={handlePassword}
      />
      <button
        style={{ position: "absolute", right: 20, top: 380, backgroundColor: "transparent", border: "none" }}
        onClick={handleVisibility}
      >
        {visibility ? <VisibilityIcon sx={{ color: "grey" }} /> : <VisibilityOffIcon sx={{ color: "grey" }} />}
      </button>
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 5 }}>
        <strong>Ingresar</strong>
      </Button>
    </Box>
  );
};

export default SignInForm;
