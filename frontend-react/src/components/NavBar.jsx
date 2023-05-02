import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ComputerIcon from '@mui/icons-material/Computer';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LogIn from '../views/Auth/login';
import SignUp from '../views/Auth/signup';
import { Modal } from '@mui/material';
import { useState } from 'react';

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { isLogged, logout, userData } = useUser();
  const pages = ['INICIO', 'TIENDA', 'CONTACTO'];

  const userHook = useUser();
  const [wantsNavigate, setWantsNavigate] = useState('/');

  const [anchorElNav, setAnchorElNav] = useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    handleClose();
    logout();
  }
  const handleClosPerfil = () => {
    handleClose();
    navigate('/user/' + userData.id);
  }

  const [loginOpened, setLoginOpened] = useState(false);
  const [signupOpened, setSignupOpened] = useState(false);

  function navigateTo(page) {
    if (isLogged) {
      navigate('/' + page);
    } else {
      setWantsNavigate(page);
      setLoginOpened(true);
    }
  }

  

  return (
    <Box>
      <LogIn 
        open={loginOpened}
        onClose={(c) => {
          setLoginOpened(false);
          switch (c) {
            case 'openSignup':
              setSignupOpened(true);
              break;
            case 'logged':
              navigate('/' + wantsNavigate);
              break;
          }
        }}
      ></LogIn>
      <SignUp
        open={signupOpened}
        onClose={(c) => {
          setSignupOpened(false);
          switch (c) {
            case 'openLogin':
              setLoginOpened(true);
              break;
            case 'signup':
              navigate('/' + wantsNavigate);
              break;
          }
        }}
      >
        
      </SignUp>
      
      <AppBar position="static">
        <Toolbar>
          <img src="/images/LogoSinLetra.png" height={30} style={{marginRight: 10}} />
          <Typography variant="h6">
            PC UNIT
          </Typography>


          {/* Botones del nav expandido.... pantalla md superior */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <div onClick={() => navigateTo(page.toLowerCase())} style={{ textDecoration: 'none', color: 'white' }}>
                  <Typography textAlign="center">{page}</Typography>
                </div>
              </Button>
            ))}
          </Box>

          {/* Botones del nav no expandido... pantalla xs */}


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <div onClick={() => navigateTo(page.toLowerCase())} style={{ color: "black", textDecoration: 'none' }}>
                    <Typography textAlign="center">{page}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {isLogged && (
            <div>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ width: '7.9rem', display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}

              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClosPerfil}>Perfil</MenuItem>
                <MenuItem onClick={handleCloseLogout} >Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          )}

          {!isLogged && (
            <div style={{ textDecoration: 'none', width: '7.5rem', display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
              <Button onClick={() => setLoginOpened(true)} variant="outlined" color='secondary'>Log In</Button>
            </div>

          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}