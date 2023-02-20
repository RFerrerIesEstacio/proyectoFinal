import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import { InputLabel, FormControl, FormHelperText } from '@mui/material';
import useUser from '../hooks/useUser';
import {contact} from '../services/contact';

export default function Contacto() {

    const { fetchUserData, userData } = useUser();

    useEffect(() => { // On init
        fetchUserData();
    }, []);

    const [email, setEmail] = useState();
    const [telefono, setTelefono] = useState();
    const [tipoConsulta, setTipoConsulta] = useState();
    const [problema, setProblema] = useState();
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const enviarFormulario = (data) => {
        contact(data)
        .then((data) => {
            navigate('/inicio');
        })
        .catch((e) => {
            setErrores(e.errors);
        });
    }

    const handleForm = (e) => {
        e.preventDefault();
        const consulta = {
            id_usuario: userData.id,
            email: email,
            telefono: telefono,
            tipoConsulta: tipoConsulta,
            problema: problema
        }
        enviarFormulario(consulta);
    }

    return (
        <>
            <Box
                sx={{
                    maxWidth: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <EmailIcon color="main" />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Contáctanos
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...(errores.email && {error: true, helperText: errores.email[0]})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                name="telefono"
                                fullWidth
                                id="firstName"
                                label="Teléfono (opcional)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>

                                <InputLabel id="tipoConsultaSelect">Tipo de Consulta</InputLabel>
                                <Select
                                    value={tipoConsulta}
                                    onChange={(e) => setTipoConsulta(e.target.value)}
                                    labelId="tipoConsultaSelect"
                                    id="tipoConsultaSelect"
                                    label="Tipo de consulta"
                                    fullWidth
                                    {...(errores.tipoConsulta && {error: true, helperText: errores.tipoConsulta[0]})}
                                >
                                    <MenuItem value={0} >Tengo problemas con la página web</MenuItem>
                                    <MenuItem value={1}>Tengo dudas sobre el funcionamineto de la página web</MenuItem>
                                    <MenuItem value={2}>Quiero contactar con otros servicios</MenuItem>
                                </Select>
                                {( errores.tipoConsulta && (<FormHelperText error> {errores.tipoConsulta[0] }</FormHelperText>))}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={problema}
                                onChange={(e) => setProblema(e.target.value)}
                                required
                                fullWidth
                                id="problema"
                                name='problema'
                                label="Redacte con profundidad su problema"
                                multiline
                                rows={4}
                                {...(errores.problema && {error: true, helperText: errores.problema[0]})}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleForm}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Contacta Con Nosotros

                    </Button>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph>
                        Si nos envías una solicitud de ponerte en contacto con nosotros, contestaremos tu email o incluso podemos llamarte por teléfono en menos de 24 horas para resolver el problema o dudas que hayan podido ocasionarse.
                    </Typography>
                </Box>
            </Box>
        </>


    )
}