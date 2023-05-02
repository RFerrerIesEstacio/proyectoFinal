import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useUser from '../../hooks/useUser';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { modalStyle, theme } from '../../theme';
import LogIn from './login';
import { Modal } from '@mui/material';




export default function SignUp({open, onClose}) {

  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [marketing, setMarketing] = useState();

  const { register, isLogged, errors} = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {name, lastname, email, password, marketing};
    register(newUser).then(() => {
      onClose('signup')
    })
    .catch(() => {

    });
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...(errors.name && {error: true, helperText: errors.name[0]})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...(errors.lastname && {error: true, helperText: errors.lastname[0]})}
                />
              </Grid>
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
                  {...(errors.email && {error: true, helperText: errors.email[0]})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...(errors.password && {error: true, helperText: errors.password[0]})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value={marketing}
                  onChange={(e) => setMarketing(e.target.value)}
                  control={<Checkbox value="true" color="primary" />}
                  label="Quiero recibir marketing, promociones y actualizaciones via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <div onClick={() => onClose('openLogin')} to="/signup" variant="body2" style={{ color: "black", textDecoration: 'underline', cursor: 'pointer' }}>
                  {"Already have an account? Sign in"}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
  );
}