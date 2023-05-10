import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

import { useGlobalContext } from "@/context/store";
import { GoogleSignIn } from "../services/auth.service";

const GoogleButton = (): JSX.Element => {
  const router = useRouter();
  const { setUser } = useGlobalContext();

  const handleProviderSignIn = async (): Promise<void> => {
    try {
      const user = await GoogleSignIn();
      if (user) {
        setUser(user);
        router.push("/management/scheduleManagement");
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  return (
    <Button onClick={handleProviderSignIn}>
      <strong style={{ textUnderlineOffset: "off" }}>Google SignIn</strong>
    </Button>
  );
};

export default GoogleButton;
