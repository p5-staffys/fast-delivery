import { Inter } from "@next/font/google";
import Image from "next/image";
import logo from "../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { logIn } from "alias/utils/seed";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "alias/components/layout";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
    logIn("pepe@argento.com", false);
    router.push("/repartidor/jornada");
  };

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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                label="Usuario"
                variant="standard"
                fullWidth
                onChange={handleEmail}
                InputLabelProps={{
                  style: { color: "#f5bd09" },
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                label="Contraseña"
                type="password"
                variant="standard"
                fullWidth
                onChange={handlePassword}
                InputLabelProps={{
                  style: { color: "#f5bd09" },
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <Button variant="contained" fullWidth type="submit">
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <Grid
            container
            spacing={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={7}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: "5vh", fontWeight: "100" }}
            >
              <Link href="#" className="linkLogin">
                Recuperar Contraseña
              </Link>
            </Grid>
            <Grid
              item
              xs={7}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ fontWeight: "600" }}
            >
              <Link href="#" className="linkLogin">
                Registrarse
              </Link>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
}

 Home.getLayout = function getLayout(page: React.ReactElement) {
   return <Layout>{page}</Layout>;
 };

export default Home;
