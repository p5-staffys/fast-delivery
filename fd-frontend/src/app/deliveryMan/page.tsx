"use client"
import Image from "next/image";
import logo from "../../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const DeliveryMan = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);


  const handleEmail = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
     e.preventDefault();
    // axios.post("http://localhost:8080/auth/signIn", { email, password }, { withCredentials: true }).then((response) => {
    //   if (response.data === "user logged in") router.push("/repartidor/jornada");
    // });
  };
  const handleVisibility = (e: any) => {
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
          <Link href="/deliveryMan/workingDay">
          <Button variant="contained" fullWidth type="submit" sx={{ mt:5}}>
            <strong>Ingresar</strong>{" "}
          </Button>
          </Link>
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
