"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthorization } from "../../app/deliveryMan/services/user.services";

const AuthGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
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

export default AuthGuard;
