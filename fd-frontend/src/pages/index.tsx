import Image from "next/image";
import logo from "../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { logIn } from "alias/utils/seed";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "alias/components/layout";
import { Typography } from "@mui/material";

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

  console.log("Hola");

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
            <strong>Bienvenid@</strong>
          </Typography>
          <Typography sx={{ m: " auto", fontSize: 20 }}>*Selecciona tu rol</Typography>
          <Link href="/repartidor">
            <Button variant="contained" fullWidth sx={{ m: " 5vh auto", fontSize: 17 }}>
              <strong>Repartidor</strong>{" "}
            </Button>
          </Link>
          <Link href="/gestion">
            <Button variant="contained" fullWidth sx={{ fontSize: 17 }}>
              <strong>Administrador</strong>{" "}
            </Button>
          </Link>
        </Box>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
