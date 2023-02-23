import Image from "next/image";
import logo from "../../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
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
    router.push("/gestion/agenda");
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
            <Link href="/">
          <Image src={logo} alt="logo" width={149} height={94} />
          </Link>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{width:"90vw", m: "auto"}}
        >
            <TextField
                id="standard-basic"
                label="Usuario"
                variant="standard"
                fullWidth
                type="email"
                InputLabelProps={{
                    style: { color: "#f5bd09" },
                  }} />
                  <TextField
                id="standard-basic"
                label="Contraseña"
                variant="standard"
                type="password"
                fullWidth
                InputLabelProps={{
                    style: { color: "#f5bd09" },
                  }} />
                 
            <Button variant="contained" fullWidth type="submit"><strong>Ingresar</strong> </Button>
        </Box>
      </main>
    </>
  );
}

 Home.getLayout = function getLayout(page: React.ReactElement) {
   return <Layout>{page}</Layout>;
 };

export default Home;
