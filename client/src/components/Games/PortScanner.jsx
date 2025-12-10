import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import RouterIcon from '@mui/icons-material/Router';

const useStyles = makeStyles({
    gameCard: {
        width: '250px', height: '250px',
        borderRadius: '20px',
        backgroundColor: 'rgba(10, 25, 41, 0.9)', // כחול כהה מאוד
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    portBtn: {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.3)',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        transition: '0.2s',
        '&:hover': { background: 'rgba(255,255,255,0.1)' }
    },
    grid: { display: 'flex', gap: '10px', marginTop: '20px' }
});

export default function PortScanner() {
    const classes = useStyles();
    const [status, setStatus] = useState({ text: 'SELECT PORT', color: '#aaa' });

    const scanPort = (port) => {
        setStatus({ text: 'SCANNING...', color: '#aaa' });
        setTimeout(() => {
            const isSafe = Math.random() > 0.4;
            if (isSafe) setStatus({ text: `PORT ${port} SECURE`, color: '#00e676' });
            else setStatus({ text: `MALWARE AT ${port}`, color: '#ff1744' });
        }, 600);
    };

    return (
        <div className={classes.gameCard}>
            <Typography variant="h6" style={{fontFamily:'Poppins'}}><RouterIcon style={{verticalAlign:'middle'}}/> Port Scan</Typography>
            
            <div className={classes.grid}>
                {[80, 443, 21].map(port => (
                    <button key={port} className={classes.portBtn} onClick={() => scanPort(port)}>
                        {port}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 25, color: status.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                {status.text}
            </div>
        </div>
    );
}