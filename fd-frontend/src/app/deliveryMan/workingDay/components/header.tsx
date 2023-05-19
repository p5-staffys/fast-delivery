"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import avatar from "../../../../asset/logo.png";
import { ReactElement } from "react";
import { signOut } from "../../../services/user.service";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { getCurrentUser } from "../../../services/user.service";
import { User } from "@/utils/interfaces/user.interfaces";

const StyledImage = styled(Image)({
  height: "3rem",
  width: "auto",
  marginy: "auto",
});

const Header = (): ReactElement => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        return;
      }
    };
    getUser();
  }, []);

  const handleLogout = async (): Promise<void> => {
    await signOut();
    router.push("/");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleProfile = (): void => {
    router.push("/deliveryMan/profile");
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar color="inherit">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <StyledImage alt="logo" src={avatar} />
          <>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src={
                        user?.avatarURL || "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                      }
                      alt="avatar"
                      width="42px"
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfile}>Perfil</MenuItem>
              <Divider />

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
