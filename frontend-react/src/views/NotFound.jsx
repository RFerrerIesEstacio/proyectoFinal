import { Typography } from '@mui/material';

export default function NotFound() {
    return (
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '2', color: 'white'}}>
            <Typography variant='h2' color="secondary">Error 404 - Not Found</Typography>
        </div>
    )
}