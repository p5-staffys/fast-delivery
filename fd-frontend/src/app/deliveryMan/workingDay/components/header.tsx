"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import avatar from "../../../../asset/logo.png";
import { ReactElement } from "react";
import logout from "../../../../asset/logout.png";
import { signOut } from "../../services/user.services";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

const StyledImage = styled(Image)({
  height: "3rem",
  width: "3rem",
  "@media (max-width:600px)": {
    height: "2rem",
  },
});

const StyledButton = styled(Button)({
  minWidth: "auto",
  padding: "0.5rem",
  "& img": {
    height: "3rem",
    width: "auto",
    filter:
      "brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(7434%) hue-rotate(189deg) brightness(109%) contrast(108%)",
  },
  "&:hover": {
    filter:
      "brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(7434%) hue-rotate(189deg) brightness(50%) contrast(108%)",
  },
  "@media (max-width:600px)": {
    "& img": {
      height: "2rem",
    },
  },
});

const Header = (): ReactElement => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    router.push("/");
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar color="inherit">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <StyledImage alt="logo" src={avatar} />
          <StyledButton onClick={handleLogout}>
            <Image src={logout} alt="logout" />
          </StyledButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
