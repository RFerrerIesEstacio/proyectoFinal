import * as React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import  useUser from '../hooks/useUser';
import Carousel from 'react-material-ui-carousel';
import LogIn from './Auth/login';
import useModal from '../hooks/useModal';




// const dialog = {
//   position: 'absolute', 
//   top: '50%', 
//   left: '50%', 
//   transform: 'translate(-50%, -50%)', 
//   zIndex: '2', 
//   color: 'white'
// };

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

  const modal = useModal();

  function openModal() {
    modal(LogIn);
  }

  return (
    <>
      <Carousel>
        <ImageInicio src={'https://i.pinimg.com/originals/97/40/7e/97407ee411c162c895178f4131272c40.jpg'}></ImageInicio>
        <ImageInicio src={'https://guillefranco.net/gpost/images/pic-7.png'}></ImageInicio>
        <ImageInicio src={'https://wallpaperaccess.com/full/1912279.jpg'}></ImageInicio>
      </Carousel>

      <h1 onClick={openModal}>¿Quienes somos?</h1>
      <p></p>
    </>
    
  );
}




  // <main>  
      //     <div style={dialog}>
      //         <Box
      //           sx={{
      //             bgcolor: 'white',
      //             pt: 8,
      //             pb: 6,
      //             borderRadius: '30px'
      //           }}
      //         >
      //           <Container maxWidth="sm">
      //             <Typography
      //               component="h1"
      //               variant="h2"
      //               align="center"
      //               color="text.primary"
      //               gutterBottom
      //             >
      //               Bienvenidos
      //             </Typography>
      //             <Typography variant="h5" align="center" color="text.secondary" paragraph>
      //               Somos una tienda de piezas informáticas online donde ofrecemos todo tipo de productos de calidad y con un stock actualizado con las últimas tecnologías del mundo informático
      //             </Typography>
      //             <Stack
      //               sx={{ pt: 4 }}
      //               direction="row"
      //               spacing={2}
      //               justifyContent="center"
      //             >
      //               { (!isLogged) && <><Button variant="contained" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
      //                       <Button variant="outlined" onClick={() => navigate('/signup')}>Registrarse</Button></>
      //                 }
      //               {(isLogged) && <Button variant="contained" onClick={() => navigate('/tienda')}>Ir a la tienda</Button>}
      //             </Stack>
      //           </Container>
      //         </Box>
      //     </div>
      // </main>