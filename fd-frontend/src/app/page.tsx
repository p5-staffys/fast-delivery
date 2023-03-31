"use client"

import Image from "next/image";
import logo from "../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Typography } from "@mui/material";

const App = (): JSX.Element => {
  return (
    <>
      <main className="container-login">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "104px", width: "100vw", mb: "100px" }}
        >
          <Image src={logo} alt="logo" width={149} height={94} />
        </Box>
        <Box sx={{ width: "90vw", m: "auto" }}>
          <Typography sx={{ m: " 0 auto", fontSize: 40 }}>
            <strong>Bienvenid@s</strong>
          </Typography>
          <Typography sx={{ m: " auto", fontSize: 20 }}>*Selecciona tu rol</Typography>
          <Link href="/deliveryMan">
            <Button variant="contained" fullWidth sx={{ m: " 5vh auto", fontSize: 17 }}>
              <strong>Repartidor</strong>
            </Button>
          </Link>
          <Link href="/management">
            <Button variant="contained" fullWidth sx={{ fontSize: 17 }}>
              <strong>Administrador</strong>
            </Button>
          </Link>
        </Box>
      </main>
    </>
  );
};

export default App;