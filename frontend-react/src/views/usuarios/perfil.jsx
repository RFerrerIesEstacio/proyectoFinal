import { useEffect } from "react";

import useUser from "../../hooks/useUser"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Container } from "@mui/material";
import {Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import useProductos from "../../hooks/useProductos";
import { useParams } from "react-router-dom";


export default function Usuario() {
  const { id } = useParams();
  const { fetchUserData, userData, getUserData, userProfile } = useUser();
  const {getList, listaProductos, setListaProductos, removeItem, editItem, length, setLength, filterProductos} = useProductos();
  useEffect(() => { // On init
    getUserData(id).then(setListaProductos(userProfile.productos));
  }, []);

  const isMe = userProfile?.user?.id == userData?.id;
  
  return (userProfile.user &&
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto ', marginRight: 'auto', alignItems: 'center' }}>
      <div style={{ display: 'flex', margin: '3rem' }}>
        <AccountCircle style={{ fontSize: '6rem' }} />
        <Typography variant="h3" color="primary.main" style={{display: 'flex', alignItems: 'center', marginLeft:'1rem'}}> Usuario⠀ <b><u>{userProfile.user.name}</u></b></Typography>
        <div style={{ display: 'flex'}}>
          {/* {isMe && <Button variant="outlined" color='primary' style={{backgroundColor: 'white', margin: '1rem', justifyContent:'flex-end'}}>Editar Perfil</Button>} */}
              
        </div>
      </div>
      <Container sx={{ display: { xs: 'block', sm: 'block', md: 'flex', lg:'flex' }, justifyContent:'center', width: { xs: '100%', sm: '100%', md: '70%', lg:'60%' }}}>
          <Container style={{marginRight: '2rem', display: 'block', marginLeft: {sx: '0', sm: '0', md: '0', lg: '2rem'}}}>
            <Typography style={{ margin: '1rem'}} noWrap="true" variant="h5">Nombre: <b><u>{userProfile.user.name}</u></b></Typography>
            <Typography style={{ margin: '1rem' }} noWrap="true" variant="h5">Apellido: <b><u>{userProfile.user.lastname}</u></b></Typography>
            <Typography style={{ margin: '1rem' }} noWrap="true" variant="h5">Email: <b><u>{userProfile.user.email}</u></b></Typography>
          </Container>
          <Container style={{ marginRight: {sx: '0', sm: '0', md: '0', lg: '2rem'}}}>
            <Typography style={{ margin: '1rem' }} noWrap='true' variant="h5">Valoración: <b><u>{userProfile.user.valoracion}</u></b></Typography>
            <Typography style={{ margin: '1rem' }} noWrap='true' variant="h5">Artículos vendidos: <b><u>{userProfile.productos.filter((p) => p.comprador != 0).length}</u></b></Typography>
          </Container>
      </Container>
      
      <Container sx={{ py: 8,  overflow: 'auto'  }} maxWidth="lg" style={{display: 'flex',height:'800px', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ display: 'flex'}}>
          {isMe && <Button variant="outlined" color='primary' onClick={() => editItem('')} style={{backgroundColor: 'white', margin: '1rem', justifyContent:'flex-end'}}>Añadir Producto</Button>}
              
        </div>
        <Grid container spacing={4}>  
        {(userProfile.productos) && userProfile.productos.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '20%',
                    }}
                    {...{image: card.image ? '/api/productImage/' + card.id : '/images/main.png'}}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.nombre}
                    </Typography>
                    <Typography>
                      {card.descripcion}
                    </Typography>
                    <Grid sx={{display: 'flex', mt: '2rem', mt: "auto", justifyContent: 'flex-end'}}>
                      <Typography>
                        Precio:
                      </Typography>
                      <Typography style={{color: 'red', fontWeight: 'bold', marginLeft:'1rem'}}>
                        {card.precio}€
                      </Typography>
                    </Grid>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" disabled>Comprar</Button>
                    {( isMe ) && 
                      <>
                        <Button size="small" onClick={() => editItem(card.id)}>Edit</Button>
                        <Button size="small" onClick={() => removeItem(card.id) && setPage(1)}>Delete</Button>
                      </>
                    }
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        
      </Container>
    </div>

  )
}