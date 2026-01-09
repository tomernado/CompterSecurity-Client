import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    gameCard: {
        width: '250px',
        height: '250px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #333',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    input: {
        background: 'transparent',
        border: '2px solid #00e676',
        color: '#00e676',
        fontSize: '1.5rem',
        textAlign: 'center',
        width: '80px',
        borderRadius: '10px',
        padding: '5px',
        margin: '15px 0',
        outline: 'none',
        fontFamily: 'monospace'
    },
    status: {
        marginTop: 10,
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '1px'
    }
});

export default function PasswordCracker() {
    const classes = useStyles();
    const [target] = useState(Math.floor(Math.random() * 10) + 1);
    const [guess, setGuess] = useState('');
    const [status, setStatus] = useState({ text: 'ENTER PIN (1-10)', color: '#aaa' });

    const handleHack = () => {
        if (!guess) return;
        if (parseInt(guess) === target) {
            setStatus({ text: 'ACCESS GRANTED', color: '#00e676' });
        } else {
            setStatus({ text: 'ACCESS DENIED', color: '#ff1744' });
        }
    };

    return (
        <div className={classes.gameCard}>
            <Typography variant="h6" style={{fontFamily:'Poppins'}}><LockOpenIcon style={{verticalAlign:'middle'}}/> PIN Cracker</Typography>
            
            <input 
                type="number" 
                className={classes.input} 
                value={guess} 
                onChange={(e) => setGuess(e.target.value)}
            />
            
            <Button 
                variant="outlined" 
                style={{ color: '#00e676', borderColor: '#00e676' }}
                onClick={handleHack}
            >
                HACK
            </Button>

            <div className={classes.status} style={{ color: status.color }}>
                {status.text}
            </div>
        </div>
    );
}