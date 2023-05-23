"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import RegisterForm from "../components/RegisterForm";

import { getAuthorization } from "../services/auth.service";

const Register = (): JSX.Element => {
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
    <Box sx={{ mt: 2 }}>
      <RegisterForm />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 2 }}>
        <Link href="/" className="linkLogin">
          <strong style={{ textUnderlineOffset: "off" }}>Ingresar</strong>
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
