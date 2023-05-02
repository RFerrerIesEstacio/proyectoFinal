import { Outlet } from "react-router-dom";
import {  CssBaseline, Grid, Toolbar, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './NavBar';
import { theme } from '../theme';
import Footer from './Footer';

export default function Layout() {
  return (
      <>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
            <Outlet />
          <Footer/>
        </ThemeProvider>
      </>
  )
}
