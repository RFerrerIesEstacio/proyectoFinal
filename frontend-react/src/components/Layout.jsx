import { Outlet } from "react-router-dom";
import {  CssBaseline, Grid, Toolbar, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './NavBar';

const theme = createTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
});


export default function Layout() {
  const outletStyle = {
    display: 'flex',
    flexGrow: 1,
    color: 'black',
    flexDirection: 'column'
  };

  return (
      <>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
            <Outlet />
        </ThemeProvider>
      </>
  )
}

{/* <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, display: 'flex', flexDirection: 'column'}}>


</div>
<div style={{
height: 'calc(100vh)',
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundImage: 'url(/images/backgroundImage.jpg)',
backgroundRepeat: 'none',
backgroundSize: 'cover',
backgroundPosition: 'center',
margin: 0,
position: 'fixed',
}}  > 
    <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: '#000000AA', zIndex: 1}}></div>
</div> */}