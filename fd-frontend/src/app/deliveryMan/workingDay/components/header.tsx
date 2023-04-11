"use client"
import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image'
import avatar from "../../../../asset/logo.png";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1,mb:8 }}>
    <AppBar color="inherit" >
      <Toolbar>
        <Image alt="logo" src={avatar} />
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header