import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import {Pagination} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import useUser from "../../hooks/useUser"
import useProductos from "../../hooks/useProductos"





let timeout;
let filtros = {
  serach: '',
  min: 0,
  max: 1000
}

export default function Shop() {

  const {getList, listaProductos, removeItem, editItem, length, setLength, filterProductos} = useProductos();
  const [page, setPage] = React.useState(1);
  const { fetchUserData, userData } = useUser();
  const [search, setSearch] = useState();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);


  React.useEffect(() => { // On init
      fetchUserData();
      getList(filtros, page);
  }, []);

  const pagination = ( e, value) => {
    setPage(value);
    getList(filtros, value);
    window.scrollTo(0, 0);
  };

  useEffect (() => {
    filtros = {
      search: search,
      preciomin: min === '' ? 0 : min,
      preciomax: max === '' ? 1000 : max
    }
    setPage(1);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      filterProductos(filtros);
    }, 500);

  },[min,max,search]);
  return (
      <> 
        <Container  sx={{
          bgcolor: 'white', 

          mt: '2rem', 
          p: '1rem', 
          borderRadius: '0.5%'
          }}
          sm={{width: '25rem'}}
          md={{width: '40rem'}}
          lg={{width: '60rem'}}
          >
          <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="outlined" color='primary' onClick={() => editItem('')} style={{backgroundColor: 'white', margin: '1rem'}}>Añadir Producto</Button>
          </div>
          
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            mb={4}
          >
            Encuentra rápidamente lo que buscas
          </Typography>
          <Container
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '30rem'}}
          >
            <TextField
              id="input-with-icon-textfield"
              label="Buscar"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{marginBottom: '2rem'}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Typography
            component="h1"
            variant="body1"
            align="center"
            color="text.primary"
            gutterBottom
            style={{alignSelf: 'flex-start'}}
          >
            Filtrar por precio
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="preciomin"
                  fullWidth
                  id="preciomin"
                  label="Precio Mínimo"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="preciomax"
                  label="Precio Máximo"
                  name="preciomax"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </Grid>
            </Grid>
          </Container>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="lg" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid container spacing={4}>  
            {(listaProductos) && listaProductos.map((card) => (
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
                    {( userData.rol === 'admin') && 
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
        <Pagination sx={{mt: 3}} count={length} onChange={pagination} page={page} style={{backgroundColor: 'white', padding: '1rem', borderRadius: '10px', border: '2px solid black' }} variant="outlined" shape="rounded"/>
      </Container>
      </>
  );
}