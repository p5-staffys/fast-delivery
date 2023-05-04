"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import AdminGuard from "../../adminGuard";

const ManagePackage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.push("/management/scheduleManagement/");
  }, []);

  return (
    <AdminGuard>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    </AdminGuard>
  );
};

export default ManagePackage;
