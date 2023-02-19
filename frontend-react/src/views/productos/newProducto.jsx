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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import useProductos from '../../hooks/useProductos';

export default function NewProducto() {


    let {state} = useLocation();

    if(state === null){
        state = {
            categoria: 0,
            precio: 1,
            nombre: '',
            descripción: '',
            stock: '',
            id: ''
        }

    }

    const { putProducto, newProducto, setNewProducto, productErrors } = useProductos();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState(state.categoria);
    const [precio, setPrecio] = useState(state.precio);
    const [nombre, setNombre] = useState(state.nombre);
    const [descripcion, setDescripcion] = useState(state.descripcion);
    const [stock, setStock] = useState(state.stock);
    

    const handleForm = (e) => {
        e.preventDefault();
        putProducto({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            stock: stock,
            categoria: categoria
        }, state.id);
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
                    {(state.id == '') && <AddIcon style={{color: 'white'}}/> }
                    {(state.id != '') && <EditIcon/>}
                </Avatar>
                <Typography component="h1" variant="h5">
                    { (state.id == '') && 'Nuevo Producto' }
                    { (state.id != '') && 'Editar Producto' }
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre del producto"
                                name="nombre"
                                autoFocus
                                defaultValue={state.nombre}
                                {...(productErrors.nombre && {error: true, helperText: productErrors.nombre[0]})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                name="descripcion"
                                fullWidth
                                required
                                id="descripcion"
                                label="Descripción del producto"
                                rows={4}
                                multiline
                                defaultValue={state.descripcion}
                                {...(productErrors.descripcion && {error: true, helperText: productErrors.descripcion[0]})}
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
                                    value={categoria}
                                    onChange={(event) => setCategoria(event.target.value)}
                                    {...(productErrors.categoria && {error: true, helperText: productErrors.errors.categoria[0]})}
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
                                value={precio}
                                onChange={(e) => setPrecio(Math.round(e.target.value * 100) / 100)}
                                required
                                type='number'
                                fullWidth
                                id="precio"
                                name='precio'
                                label="Precio del producto"
                                defaultValue={precio}
                                {...(productErrors.precio && {error: true, helperText: productErrors.precio[0]}) || (precio < 1 && {error: true , helperText: 'Price can not be less than 1'})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={stock}
                                onChange={(e) => setStock(parseInt(e.target.value))}
                                required
                                type='number'
                                fullWidth
                                id="stock"
                                name='stock'
                                label="Cantidad del producto en stock"
                                defaultValue={stock}
                                {...(productErrors.stock && {error: true, helperText: productErrors.stock[0]}) || (stock < 0 && {error: true , helperText: 'Stock can not be less than 0'})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"  
                                variant="contained"
                                sx={{ mt: 3 }}
                                fullWidth
                                onClick= {() => navigate('/tienda')}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"  
                                variant="contained"
                                sx={{ mt: 3 }}
                                fullWidth
                                onClick={handleForm}
                            >
                                { (state.id === '') && 'Crear' }
                                { (state.id !== '') && 'Editar' }
                            </Button>
                        </Grid>


                    </Grid>

                </Box>
            </Box>
        </>


    )
}