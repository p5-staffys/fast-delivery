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
import { uploadAvatarTemp } from "../services/storage.service";
import { toast } from "@/utils/alerts/alerts";

const RegisterForm = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>(
    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
  );
  const [avatar, setAvatar] = useState<Blob | false>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      setAvatar(file);
      const avatarURL = await uploadAvatarTemp(file);
      setAvatarURL(avatarURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password != cpassword) {
      toast.fire({
        icon: "error",
        text: "Falló la confirmación de la contraseña. Por favor, ingrese la misma en ambos campos.",
      });
      setPassword("");
      setCPassword("");
      return;
    }
    try {
      const response = await signUp(email, password, name, lastName, avatar);
      if (response) {
        toast.fire({ icon: "error", text: "Usuario creado con éxito." });
        router.push("/");
      }
    } catch (error: unknown) {
      toast.fire({ icon: "error", text: "Datos inválidos." });
    }
  };

  return (
    <Box
      component="form"
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
      <Box>
        <img src={avatarURL} alt="avatar" width={180} height={"auto"}></img>
      </Box>
      <Button sx={{ mt: 2, mb: 3 }} variant="contained" fullWidth component="label">
        Subir foto
        <input type="file" accept=".jpg" hidden onChange={handleUpload} />
      </Button>
      <TextField
        id="standard-basic"
        label="Nombre"
        variant="standard"
        fullWidth
        type="name"
        color="primary"
        required
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
        color="primary"
        required
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
        color="primary"
        required
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
        color="primary"
        required
        value={password}
        onChange={(e): void => {
          setPassword(e.target.value);
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
      <TextField
        id="password"
        label="Confirmar Contraseña"
        variant="standard"
        type={visibility ? "text" : "password"}
        fullWidth
        color="primary"
        required
        value={cpassword}
        onChange={(e): void => {
          setCPassword(e.target.value);
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
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 3 }}>
        <strong>Registrarse</strong>
      </Button>
    </Box>
  );
};

export default RegisterForm;
