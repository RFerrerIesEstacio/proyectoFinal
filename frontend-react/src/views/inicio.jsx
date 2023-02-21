import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import  useUser from '../hooks/useUser';



export default function Inicio() {

  const {isLogged, fetchUserData} = useUser();
  
  const navigate = useNavigate();





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
