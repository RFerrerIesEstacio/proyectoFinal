import { useEffect } from "react";

import useUser from "../../hooks/useUser"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import AccountCircle from "@mui/icons-material/AccountCircle";



export default function Usuario() {
  const { fetchUserData, userData } = useUser();

  useEffect(() => { // On init
    fetchUserData();
  }, []);



  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
        <AccountCircle style={{ fontSize: '6rem' }} />
        <Typography variant="h3" color="primary.main"> Usuario <b><u>{userData.name}</u></b></Typography>
      </div>
      <Typography style={{ margin: '1rem' }} variant="h5">Nombre: <b><u>{userData.name}</u></b></Typography>
      <Typography style={{ margin: '1rem' }} variant="h5">Apellido: <b><u>{userData.lastname}</u></b></Typography>
      <Typography style={{ margin: '1rem' }} variant="h5">Email: <b><u>{userData.email}</u></b></Typography>
    </div>

  )
}