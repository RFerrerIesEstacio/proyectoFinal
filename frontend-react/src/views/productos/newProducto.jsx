import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import useProductos from '../../hooks/useProductos';

const fileToB64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function NewProducto() {
  let { state } = useLocation();

  if (state === null) {
    state = {
      categoria: 0,
      precio: 1,
      nombre: '',
      descripción: '',
      stock: '',
      id: ''
    }
  }

  const { putProducto, productErrors } = useProductos();
  const navigate = useNavigate();
  const [formState, setFormState_] = useState({
    categoria: state.categoria,
    precio: state.precio,
    nombre: state.nombre,
    descripcion: state.descripcion,
    stock: state.stock,
    image: null
  });

  const setFormState = (o) => setFormState_({ ...formState, ...o });


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      fileToB64(event.target.files[0]).then((datab64) => {
        setFormState({ image: datab64 });
      });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    putProducto(formState, state.id);
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 'sm',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          {(state.id == '') && <AddIcon style={{ color: 'white' }} />}
          {(state.id != '') && <EditIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {(state.id == '') && 'Nuevo Producto'}
          {(state.id != '') && 'Editar Producto'}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={formState.nombre}
                onChange={(e) => setFormState({ nombre: e.target.value })}
                required
                fullWidth
                id="nombre"
                label="Nombre del producto"
                name="nombre"
                autoFocus
                defaultValue={state.nombre}
                {...(productErrors.nombre && { error: true, helperText: productErrors.nombre[0] })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formState.descripcion}
                onChange={(e) => setFormState({ descripcion: e.target.value })}
                name="descripcion"
                fullWidth
                required
                id="descripcion"
                label="Descripción del producto"
                rows={4}
                multiline
                defaultValue={state.descripcion}
                {...(productErrors.descripcion && { error: true, helperText: productErrors.descripcion[0] })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="tipoConsultaSelect">Categoría</InputLabel>
                <Select
                  labelId="tipoConsultaSelect"
                  id="tipoConsultaSelect"
                  label="Tipo de consulta"
                  fullWidth
                  value={formState.categoria}
                  onChange={(event) => setFormState({ categoria: event.target.value })}
                  {...(productErrors.categoria && { error: true, helperText: productErrors.errors.categoria[0] })}
                >
                  <MenuItem value={0}>Procesador</MenuItem>
                  <MenuItem value={1}>Placa Base</MenuItem>
                  <MenuItem value={2}>Targeta Gráfica</MenuItem>
                  <MenuItem value={3}>Monitor</MenuItem>
                  <MenuItem value={4}>Audio</MenuItem>
                  <MenuItem value={5}>Discos duros</MenuItem>
                  <MenuItem value={6}>Memoria RAM</MenuItem>
                  <MenuItem value={7}>Otros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formState.precio}
                onChange={(e) => setFormState({ precio: Math.round(e.target.value * 100) / 100 })}
                required
                type='number'
                fullWidth
                id="precio"
                name='precio'
                label="Precio del producto"
                defaultValue={state.precio}
                {...(productErrors.precio && { error: true, helperText: productErrors.precio[0] }) || (formState.precio < 1 && { error: true, helperText: 'Price can not be less than 1' })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formState.stock}
                onChange={(e) => setFormState({ stock: parseInt(e.target.value) })}
                required
                type='number'
                fullWidth
                id="stock"
                name='stock'
                label="Cantidad del producto en stock"
                defaultValue={state.stock}
                {...(productErrors.stock && { error: true, helperText: productErrors.stock[0] }) || (formState.stock < 0 && { error: true, helperText: 'Stock can not be less than 0' })}
              />
            </Grid>
            <Grid item xs={12} sm={4} style={{ margin: 'auto' }}>
              <Button
                color="secondary"
                variant="contained"
                component="label"
                sx={{ alignSelf: 'center' }}
                fullWidth
              >
                Imagen
                <input
                  onChange={handleImageChange}
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={() => navigate('/tienda')}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleForm}
              >
                {(state.id === '') && 'Crear'}
                {(state.id !== '') && 'Editar'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}