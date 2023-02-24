import { Layout } from 'alias/components/layout';
import React, { useEffect, useState } from 'react'
import Header from 'alias/components/header';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from '@mui/system';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Pack, requestPacks } from 'alias/utils/seed';
import CardManagePackage from 'alias/components/cardManagePackage';
import AddIcon from "../../asset/AddIcon.png"
import Image from 'next/image';

const ManagePackage = () => {
  const [paquetes, setPaquetes] = useState<Pack[]>([]);
  
  useEffect(() => {
    requestPacks(3).then((packs) => {
      setPaquetes(packs);
      
    });
  }, []);
  return (<>
    <Header />
    <Container fixed >
      <Link href={`/repartidor/jornada`}>
        <IconButton aria-label="Example" sx={{ my: 2 }}>
          <ArrowBackIosIcon sx={{ color: "black" }} />
        </IconButton>
      </Link>
      <Box mt={3}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{fontWeight:700, fontSize:"16px"}}>Paquetes</Typography>
          </AccordionSummary>
          <Container>

            <Typography sx={{ font: "Open sans", fontWeight: 400, fontSize: "12px", lineHeight: "20px" }}>Hay 523 paquetes con el criterio de filtrado seleccionado</Typography>
          </Container>
          {paquetes.map((paquete, i) => (
            <AccordionDetails key={i}>
              <CardManagePackage paquete={paquete} />
            </AccordionDetails>
          ))}
        </Accordion>
      </Box>
      <Link href={`/repartidor/jornada`}>
        <Box sx={{ display:"flex" ,justifyContent:"end" , mt:3 }}>
        <Image alt="trash" src={AddIcon} />
        </Box>
      </Link>

    </Container>
  </>
  )
}

ManagePackage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagePackage