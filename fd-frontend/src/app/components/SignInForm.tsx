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

import { useGlobalContext } from "@/context/store";
import { signIn } from "../services/auth.service";

const SignInForm = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const { setUser } = useGlobalContext();
  const router = useRouter();

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
              <IconButton aria-label="toggle password visibility" onClick={handleVisibility} edge="end">
                {visibility ? <VisibilityIcon sx={{ color: "grey" }} /> : <VisibilityOffIcon sx={{ color: "grey" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 5 }}>
        <strong>Ingresar</strong>
      </Button>
    </Box>
  );
};

export default SignInForm;
