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
import { signIn } from "./services/admin.service";
import { IconButton, InputAdornment } from "@mui/material";

const Home = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const admin = await signIn(email, password);
      if (admin) {
        localStorage.setItem("user", JSON.stringify(admin));
        router.push("/management/scheduleManagement");
      }
    } catch (error: unknown) {
      alert("Logueo erroneo");
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
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: "6rem", width: "100vw", mb: "6rem" }}>
          <Link href="/">
            <Image src={logo} alt="logo" width={149} height={94} />
          </Link>
        </Box>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ width: "90vw", m: "auto" }}>
          <TextField
            id="email"
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
            id="password"
            label="Contraseña"
            variant="standard"
            type={eye}
            fullWidth
            InputLabelProps={{
              style: { color: "#f5bd09" },
            }}
            onChange={handlePassword}
            sx={{
              mt: 2,
              mb: 1,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleVisibility} edge="end">
                    {visibility ? (
                      <VisibilityIcon sx={{ color: "grey" }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: "grey" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
            <strong>Ingresar</strong>
          </Button>
        </Box>
      </main>
    </>
  );
};

export default Home;
