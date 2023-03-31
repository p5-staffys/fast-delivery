"use client"
import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image'
import avatar from "../../../../asset/logo.png";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Image alt="logo" src={avatar} />
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header