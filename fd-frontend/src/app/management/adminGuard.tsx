"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthorization } from "./services/admin.service";

const AdminGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAuthorization().then((result) => {
      if (!result) {
        router.push("/management");
      }
      setAuthenticated(result);
    });
  }, []);

  return <>{authenticated ? children : null}</>;
};

export default AdminGuard;
