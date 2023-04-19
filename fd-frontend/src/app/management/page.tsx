"use client";
import Image from "next/image";
import logo from "../../asset/logoMoto.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { logInAdmin } from "../../utils/seed";

const Home = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    logInAdmin("pepe@argento.com");
    router.push("/management/scheduleManagement");
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
            onChange={handlePassword}
          />
          <button
            style={{ position: "absolute", right: 20, top: 380, backgroundColor: "transparent", border: "none" }}
            onClick={handleVisibility}
          >
            {visibility ? <VisibilityIcon sx={{ color: "grey" }} /> : <VisibilityOffIcon sx={{ color: "grey" }} />}
          </button>
          <Link href="/management/scheduleManagement">
            <Button sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
              <strong>Ingresar</strong>
            </Button>
          </Link>
        </Box>
      </main>
    </>
  );
};

export default Home;