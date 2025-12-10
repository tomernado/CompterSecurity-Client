import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';

const useStyles = makeStyles({
    gameCard: {
        width: '250px', height: '250px',
        borderRadius: '20px',
        backgroundColor: 'black',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#00e676', // ירוק מטריקס
        border: '1px solid #00e676',
        boxShadow: '0 0 15px rgba(0, 230, 118, 0.2)',
        overflow: 'hidden',
        fontFamily: 'monospace'
    },
    streamBox: {
        fontSize: '1.2rem', opacity: 0.8, lineHeight: '1.2rem', marginTop: 10, textAlign: 'center'
    }
});

export default function MatrixStream() {
    const classes = useStyles();
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const binary = Math.random().toString(2);
            setLines(prev => [binary, ...prev].slice(0, 6)); // שומר רק 6 שורות
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.gameCard}>
             <Typography variant="h6" style={{color:'white', fontFamily:'Poppins'}}>
                <CodeIcon style={{verticalAlign:'middle'}}/> Net Stream
            </Typography>
            <div className={classes.streamBox}>
                {lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </div>
    );
}