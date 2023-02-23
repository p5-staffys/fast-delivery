import React from 'react'
import { Avatar, Box} from "@mui/material";
import { Layout } from "alias/components/layout";
import Header from "alias/components/header";
import BackBtn from '../../components/backBtn';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Progress from '../../components/progress'

const Repartidores = () => {
  return (
    <>
        <Header/>
        <BackBtn back="/gestion/agenda"/>
        <Box sx={{width:"90vw", m:"auto"}}>
          <Accordion  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><strong>Repartidores</strong></Typography>
        </AccordionSummary >
        <AccordionDetails >
            <Box display="flex" justifyContent="space-between" sx={{m:'0 10px'}}>
            <Box><Progress value={60}/></Box>
            <Box>
          <Typography> Farid</Typography>
          <Typography> Viaje en curso</Typography>
          </Box>
          <Box>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Box>
          </Box>
        </AccordionDetails>
        <AccordionDetails>
            <Box display="flex" justifyContent="space-between" sx={{m:'0 10px'}}>
            <Box><Progress value={100}/></Box>
            <Box>
          <Typography> Farid</Typography>
          <Typography> Viaje en curso</Typography>
          </Box>
          <Box>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Box>
          </Box>
        </AccordionDetails><AccordionDetails>
            <Box display="flex" justifyContent="space-between" sx={{m:'0 10px'}}>
            <Box><Progress value={65}/></Box>
            <Box>
          <Typography> Farid</Typography>
          <Typography> Viaje en curso</Typography>
          </Box>
          <Box>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      </Box>
    </>
  )
}
Repartidores.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;}

export default Repartidores