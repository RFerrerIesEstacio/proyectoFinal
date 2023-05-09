import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import  useUser from '../hooks/useUser';
import Carousel from 'react-material-ui-carousel';
import LogIn from './Auth/login';
import Footer from '../components/Footer';
import { Grid } from '@mui/material';



const MainTitle = (props) => {
  const style = {
    position: 'absolute',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    zIndex: 10,
    textAlign: 'center',
    
  };
  return (
    <div style={style}>
      <div style={{fontSize: 150}}><b>PC UNIT</b></div>
      <div style={{fontSize: 25}}>Dale una nueva vida a tus productos</div>
    </div>
  );
}

const ImageInicio = (props) => {
  const imageStyle = {
    width: '100%',
    height: '80vh',
    backgroundImage: `url(${props.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  };

  const shadowStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000AA',
    position: 'absolute',
    zIndex: 5
  };

  return <div style={imageStyle}>
    <div style={shadowStyle}></div>
    <MainTitle></MainTitle>
  </div>
};


// PC UNIT

export default function Inicio() {

  const {isLogged, fetchUserData} = useUser();  
  const navigate = useNavigate();

  return (
    <div style={{overflow: 'auto'}}>
      <Carousel>
        <ImageInicio src={'https://i.pinimg.com/originals/97/40/7e/97407ee411c162c895178f4131272c40.jpg'}></ImageInicio>
        <ImageInicio src={'https://guillefranco.net/gpost/images/pic-7.png'}></ImageInicio>
        <ImageInicio src={'https://wallpaperaccess.com/full/1912279.jpg'}></ImageInicio>
      </Carousel>

      <Container style={{marginTop: "50px"}} sx={{maxHeight: 800, textAlign: 'center', marginBottom: 15}}>
        <Typography variant="h3" sx={{fontWeight: 'bold'}}>¿Quienes somos?</Typography>
        <p style={{textAlign: 'justify', marginBottom:'30px'}}>Somos una empresa dedicada exclusivamente a ofrecer un servicio de venta online de productos
          informáticos. En este entorno web podrás navegar y encontrar productos de otros usuarios que puedan
          interesarte al igual que podrás publicar tus propios productos para vender. Desde nuestra página web, te vamos a ofrecer un servicio con fácil de usar y con
          la mejor calidad posible. 
        </p>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Container>
              Máxima seguridad
            </Container>
            <img src="images/seguridad.png" height={100} style={{ marginTop: 40}}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container>
              Diseño fácil de utilizar, sencillo y multiplataforma
            </Container>
            <img src="images/diseño.png" height={100} style={{ marginTop: 10}}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container>
              Valora los productos comprados para obtener ofertas exclusivas
            </Container>
            <img src="images/valoraciones.png" height={100} style={{ marginTop: 10}}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
    
  );
}