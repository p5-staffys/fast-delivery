"use client";
import Image from "next/image";
import logo from "../../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GetUsers } from "./services/user.services";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
const DeliveryMan = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const { setData } = useGlobalContext();
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

    const response = await GetUsers(email, password);
    if (response.user) {
      router.push("/deliveryMan/workingDay");
      setData(response);
      localStorage.setItem("user", JSON.stringify(response.user));
    } else {
      alert("contraseña incorrecta");
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
    <>
      <main className="container-login">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "104px", width: "100vw", mb: "100px" }}
        >
          <Link href="/">
            <Image src={logo} alt="logo" width={149} height={94} />
          </Link>
        </Box>
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
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <Link href="#" className="linkLogin">
            Recuperar Contraseña
          </Link>
          <Link href="#" className="linkLogin">
            <strong>Registrarse</strong>
          </Link>
        </Box>
      </main>
    </>
  );
};

export default DeliveryMan;
