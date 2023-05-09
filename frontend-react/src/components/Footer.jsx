
import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img style={{textAlign: 'center', height: 60}} src="/images/LogoSinLetra.png" />
            <Typography color="white" variant="h5">
              PC UNIT
            </Typography>
          </Grid>
          <Grid item xs={12} style={{display: 'flex'}}>
            <Typography color="white" variant="subtitle1" style={{margin:"20px"}}>
              {`${new Date().getFullYear()}`} 
            </Typography>
            <Typography color="white" alignItems="baseline" style={{display: 'flex', alignItems: 'center'}}>
            | <InstagramIcon style={{marginLeft:10, marginRight:10}}/> Instagram   |    <FacebookIcon style={{marginLeft:10, marginRight:10}}/> Facebook   |   <EmailIcon style={{marginLeft:10, marginRight:10}}/>Correo
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;