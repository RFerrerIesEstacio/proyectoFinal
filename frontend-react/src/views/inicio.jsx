import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import  useUser from '../hooks/useUser';



export default function Inicio() {
  
  const navigate = useNavigate();
  const {isLogged} = useUser();


  return (
      <main>  
          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '2', color: 'white'}}>
              <Box
                sx={{
                  bgcolor: 'white',
                  pt: 8,
                  pb: 6,
                  borderRadius: '30px'
                }}
              >
                <Container maxWidth="sm">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Bienvenidos
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Somos una tienda de piezas informáticas online donde ofrecemos todo tipo de productos de calidad y con un stock actualizado con las últimas tecnologías del mundo informático
                  </Typography>
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    { (!isLogged) && <><Button variant="contained" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                            <Button variant="outlined" onClick={() => navigate('/signup')}>Registrarse</Button></>
                      }
                    {(isLogged) && <Button variant="contained" onClick={() => navigate('/tienda')}>Ir a la tienda</Button>}
                  </Stack>
                </Container>
              </Box>
          </div>
      </main>
  );
}
