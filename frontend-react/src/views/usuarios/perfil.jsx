import { useEffect } from "react";

import useUser from "../../hooks/useUser"
import { getUser } from "../../services/usuario"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Usuario() {
    const { fetchUserData, userData } = useUser();

    useEffect(() => { // On init
        fetchUserData();
    }, []);

 
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex',alignItems: 'center', marginBottom:'3rem' }}>
                <AccountCircle style={{fontSize: '6rem'}}/>
                <Typography variant="h3" color="primary.main"> Usuario <b><u>{userData.name}</u></b></Typography>
            </div>
            <Typography style={{margin: '1rem'}} variant="h5">Nombre: <b><u>{userData.name}</u></b></Typography>
            <Typography style={{margin: '1rem'}} variant="h5">Apellido: <b><u>{userData.lastname}</u></b></Typography>
            <Typography style={{margin: '1rem'}} variant="h5">Email: <b><u>{userData.email}</u></b></Typography>
        </div>
        
    )
}