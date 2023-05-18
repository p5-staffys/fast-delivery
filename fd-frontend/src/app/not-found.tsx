"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import logo from "../asset/logoMoto.png";
import { Button, Typography } from "@mui/material";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 10, width: "100vw" }}
    >
      <Box sx={{ mb: 5 }}>
        <Link href="/">
          <Image src={logo} alt="logo" width={160} />
        </Link>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h3" display="block" color="error" textAlign="center">
          Error 404:
        </Typography>
        <Typography variant="h3" display="block" color="error" textAlign="center">
          Página no encontrada.
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="info"
          onClick={(): void => {
            router.back();
          }}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
}
