import { Box, Container } from '@mui/system';
import Header from 'alias/components/header';
import { Layout } from 'alias/components/layout';
import Image from 'next/image';
import logoAdmin from "../../asset/ImgAdmin.png"
import logo1 from "../../asset/logito1.png"
import logo2 from "../../asset/logito2.jpg"
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Progress from 'alias/components/progress';
import DayList from 'alias/components/carousel';
import Link from 'next/link';

const Agenda = () => {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "inherit" }}>
          <Image src={logoAdmin} alt="logo" width={53} height={53} />
          <Box sx={{ paddingX: 2 ,mb:3 }}>
            <Typography sx={{ fontSize: "14px" }}>Hola Admin!</Typography>
            <Typography sx={{ fontFamily: "Roboto", fontSize: "18px", fontWeight: 700 }}>Gestionar pedidos</Typography>

          </Box>
        </Box>
        <DayList/>
        <Accordion sx={{ mt: 2 }} defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>15/02/23 - Detalles</Typography>
          </AccordionSummary>
          <Container>
            <Box sx={{ width: "90vw", m: "auto" }}>
              <AccordionDetails >
                <Box display="flex" justifyContent="space-between" >
                  <Box><Progress value={20} /></Box>
                  <Box sx={{ml:3}}>
                    <Typography sx={{ fontWeight: 700, fontSize: "15px" }}> Repartidores</Typography>
                    <Typography sx={{ fontWeight: 200, fontSize: "13px" }}> 2/10  activos</Typography>
                  </Box>
                  <Box>
                    <Box sx={{mr:3}}>
                      <Image style={{ position:"absolute",right:59}} alt="Travis" src={logo2} />
                      <Image style={{position:"relative", marginLeft:20}} alt="Travis" src={logo1} />
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Box>
            <Link href={"/gestion/repartidores"}>
            <Button sx={{my:2}} variant="contained" fullWidth size="small">
              Ver repartidores
            </Button>
            </Link>
            <Box sx={{ width: "90vw", m: "auto" }}>
              <AccordionDetails >
                <Box display="flex" justifyContent="space-between" >
                  <Box><Progress value={80} /></Box>
                  <Box sx={{mr:12}}>
                  <Typography sx={{ fontWeight: 700, fontSize: "15px" }}> Paquetes</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>16/20  repartidos</Typography>
                  </Box>
                  <Box>
  
                  </Box>
                </Box>
              </AccordionDetails>
            </Box>
            <Link href={"/gestion/managePackage"}>
            <Button sx={{my:2}} variant="contained" fullWidth size="small">
              Ver paquetes
            </Button>
            </Link>
          </Container>

        </Accordion>
      </Container>
    </>

  )
}


Agenda.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Agenda