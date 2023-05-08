"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "../../asset/logoMoto.png";

import Box from "@mui/material/Box";
import RegisterForm from "../components/RegisterForm";

import { getAuthorization } from "../services/auth.service";

const DeliveryMan = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const authorice = async (): Promise<void> => {
      const auth = await getAuthorization();
      if (!auth.authorice) return;
      if (!auth.admin) {
        router.push("/deliveryMan/workingDay");
      } else {
        router.push("/management/scheduleManagement");
      }
    };
    authorice();
  }, []);

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
        <RegisterForm />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <Link href="/" className="linkLogin">
            <strong style={{ textUnderlineOffset: "off" }}>Ingresar</strong>
          </Link>
        </Box>
      </main>
    </>
  );
};

export default DeliveryMan;
