"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthorization } from "../../app/management/services/admin.service";

const AdminGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAuthorization().then((result) => {
      if (!result) {
        router.push("/");
      }
      setAuthenticated(result);
    });
  }, []);

  return <>{authenticated ? children : null}</>;
};

export default AdminGuard;
