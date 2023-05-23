import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { alert } from "@/utils/alerts/alerts";

import { useGlobalContext } from "@/context/store";
import { GoogleSignIn } from "../services/auth.service";
import Image from "next/image";
import googleLogo from "../../asset/btn_google_signin_dark_pressed_web.png";

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
      alert.fire({
        icon: "error",
        title: "Error",
        text: "Falló la validación de su cuenta. Por favor vuelva a intentarlo",
      });
    }
  };

  return (
    <Button onClick={handleProviderSignIn}>
      <Image src={googleLogo} alt="logoGoogle"></Image>
    </Button>
  );
};

export default GoogleButton;
