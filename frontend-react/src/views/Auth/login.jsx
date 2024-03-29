import { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import useUser from '../../hooks/useUser';
import { Alert, Modal, ThemeProvider } from '@mui/material'
import { ThemeContext } from '@emotion/react';
import { modalStyle, theme } from '../../theme';
import SignUp from './signup';
import { UserContextProvider } from '../../context/userContext';
//import { RouterProvider } from "react-router-dom";


export default function LogIn({ open, onClose }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { errors, login } = useUser();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password }).then((data) => {
      onClose('logged');
    }).catch(() => {});
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={modalStyle}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesión
        </Typography>
        {(errors.credentials && (<Alert severity="error">{errors.credentials}</Alert>))}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            {...(errors.email && { error: true, helperText: errors.email[0] })}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            {...(errors.password && { error: true, helperText: errors.password[0] })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container sx={{ justifyContent: 'flex-end' }}>
            <div onClick={() => onClose('openSignup')} to="/signup" variant="body2" style={{ color: "black", textDecoration: 'underline', cursor: 'pointer' }}>
              {"¿No tienes una cuenta? Regístrate"}
            </div>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}