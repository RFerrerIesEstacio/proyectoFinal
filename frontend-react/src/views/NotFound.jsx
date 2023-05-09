import { Container, Typography } from '@mui/material';
import Footer from '../components/Footer';

export default function NotFound() {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', height:'70vh', color: 'white'}}>
                <Typography variant='h2' style={{margin: 'auto'}} color="primary">Error 404 - Not Found</Typography>
                
            </div>
            <Footer style={{position: 'absolute', bottom: '0%'}} />
        </div>
        
    )
}