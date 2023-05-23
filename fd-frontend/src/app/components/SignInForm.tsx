"use client";
import React from "react";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { alert, toast } from "@/utils/alerts/alerts";

import { useGlobalContext } from "@/context/store";
import { signIn } from "../services/auth.service";
import { FormControl } from "@mui/material";

const SignInForm = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { setUser } = useGlobalContext();
  const router = useRouter();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setDisabled(false);
    try {
      const response = await signIn(email, password);
      setUser(response.user);
      toast.fire({ icon: "success", title: "Bienvenido!" });
      if (response.isAdmin) {
        router.push("/management/scheduleManagement");
      } else {
        router.push("/deliveryMan/workingDay");
      }
    } catch {
      alert.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error de validación. Por favor, intentelo de nuevo.",
      });
      setDisabled(true);
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
    <FormControl
      disabled={disabled}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        width: "90vw",
        maxWidth: "640px",
        m: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        id="standard-basic"
        label="Usuario"
        variant="standard"
        fullWidth
        type="email"
        color="primary"
        value={email}
        error={emailError}
        helperText={emailError && "Usuario requerido"}
        onChange={(e): void => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="standard"
        type={visibility ? "text" : "password"}
        fullWidth
        color="primary"
        error={passwordError}
        helperText={passwordError && "Contraseña requerida"}
        onChange={(e): void => {
          setPassword(e.target.value);
          setPasswordError(false);
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
    </FormControl>
  );
};

export default SignInForm;
