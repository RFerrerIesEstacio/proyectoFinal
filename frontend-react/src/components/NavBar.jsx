import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Link, useNavigate} from 'react-router-dom';
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

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const {isLogged, logout} = useUser();
  const pages = ['INICIO', 'TIENDA', 'CONTACTO'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  
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
    navigate('/user');
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <ComputerIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </ComputerIcon>
          <Typography variant="h6">
            Online Shop
          </Typography>


          {/* Botones del nav expandido.... pantalla md superior */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.toLowerCase()} style={{ textDecoration: 'none', color: 'white'}}>
                        <Typography textAlign="center">{page}</Typography>
                </Link>
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
                    <Link to={page} style={{color: "black", textDecoration: 'none'}}>
                        <Typography  textAlign="center">{page}</Typography>
                    </Link>
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
                style={{ width: '7.9rem', display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}

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
            <Link to="/login" style={{ textDecoration: 'none' , width: '7.5rem', display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
                <Button variant="outlined" color='secondary'>Log In</Button>
            </Link>
            
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}