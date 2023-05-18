"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "../asset/logoMoto.png";

import Box from "@mui/material/Box";
import SignInForm from "./components/SignInForm";
import GoogleButton from "./components/GoogleButton";

import { getAuthorization } from "./services/auth.service";

const DeliveryMan = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const authorice = async (): Promise<void> => {
      try {
        const auth = await getAuthorization();
        if (!auth.authorice) return;
        if (!auth.admin) {
          router.push("/deliveryMan/workingDay");
        } else {
          router.push("/management/scheduleManagement");
        }
      } catch {
        return;
      }
    };
    authorice();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: "104px", width: "100vw", mb: "100px" }}>
        <Link href="/">
          <Image src={logo} alt="logo" width={160} />
        </Link>
      </Box>
      <SignInForm />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 2 }}>
        <Link href="/register" className="linkLogin">
          <strong style={{ textUnderlineOffset: "off" }}>Registrarse</strong>
        </Link>
        <GoogleButton />
      </Box>
    </>
  );
};

export default DeliveryMan;
