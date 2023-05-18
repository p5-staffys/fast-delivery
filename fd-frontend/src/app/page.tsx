"use client";

import Image from "next/image";
import Link from "next/link";
import Box from "@mui/system/Box";
import { useRouter } from "next/navigation";

import logo from "../asset/logoMoto.png";
import github from "../asset/github-mark.png";
import { Button, Grid, Typography } from "@mui/material";

const Main = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 10, width: "100vw" }}
      >
        <Typography variant="h3" display="block" textAlign="center">
          Bienvenid@!
        </Typography>
        <Link href="/">
          <Image src={logo} alt="logo" width={160} />
        </Link>
        <Box sx={{ mb: 5, mt: 3 }} textAlign="center" maxWidth="480px">
          <Typography variant="h5" display="inline">
            {"Fast-Delivery "}
          </Typography>
          <Typography variant="h5" display="inline">
            es una app de administración de servicios de mensajería y paquetería.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={(): void => {
              router.push("/login");
            }}
            sx={{ mx: 4 }}
          >
            Ingresar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(): void => {
              router.push("/register");
            }}
            sx={{ mx: 4 }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
      <Grid position="absolute" bottom="0" container alignItems="center" justifyContent="center">
        <Grid item marginX={2}>
          <Typography variant="h6">© Staffys, 2023.</Typography>
        </Grid>
        <Grid item marginX={2}>
          <Link href="https://github.com/p5-staffys/fast-delivery" target="_blank">
            <Image src={github} alt="github" width="20" />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
