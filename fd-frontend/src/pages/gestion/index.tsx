import Image from "next/image";
import logo from "../../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { logInAdmin } from "alias/utils/seed";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "alias/components/layout";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Home = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
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
    logInAdmin("pepe@argento.com");
    router.push("/gestion/agenda");
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
          />
          <button
            style={{ position: "absolute", right: 20, top: 380, backgroundColor: "transparent", border: "none" }}
            onClick={handleVisibility}
          >
            {visibility ? <VisibilityIcon sx={{ color: "grey" }} /> : <VisibilityOffIcon sx={{ color: "grey" }} />}
          </button>

          <Button variant="contained" fullWidth type="submit">
            <strong>Ingresar</strong>{" "}
          </Button>
        </Box>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
