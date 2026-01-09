import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import SpeedIcon from '@mui/icons-material/Speed';

const useStyles = makeStyles({
    gameCard: {
        width: '250px',
        height: '250px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
    },
    scoreText: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(255,255,255,0.5)'
    }
});

export default function CyberReflexGame() {
    const classes = useStyles();
    const [state, setState] = useState('idle');
    const [bg, setBg] = useState('rgba(0,0,0,0.8)');
    const [text, setText] = useState('Click to Test Reflex');
    
    const timerRef = useRef(null);
    const startRef = useRef(null);

    const handleClick = () => {
        if (state === 'idle' || state === 'result') {
            setState('waiting');
                setBg('#b71c1c');
            setText('Wait for Green...');
            
            const randomTime = Math.random() * 2000 + 1000;
            timerRef.current = setTimeout(() => {
                setState('ready');
                setBg('#00e676');
                setText('CLICK NOW!');
                startRef.current = Date.now();
            }, randomTime);
        } 
        else if (state === 'waiting') {
            clearTimeout(timerRef.current);
            setState('result');
            setBg('#ff1744');
            setText('Too Early!');
        } 
        else if (state === 'ready') {
            const time = Date.now() - startRef.current;
            setState('result');
            setBg('#2979ff');
            setText(`${time} ms`);
        }
    };

    return (
        <div className={classes.gameCard} style={{ backgroundColor: bg }} onClick={handleClick}>
            <SpeedIcon style={{ fontSize: 40, marginBottom: 10, opacity: 0.8 }} />
            <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight:'bold'}}>
                {state === 'result' ? 'Score' : 'Cyber Reflex'}
            </Typography>
            <div style={{ marginTop: 20, fontSize: '1.2rem', fontWeight: 'bold' }}>
                {text}
            </div>
        </div>
    );
}