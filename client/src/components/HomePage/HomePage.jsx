import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import CyberReflexGame from '../Games/CyberReflexGame'; 
import PasswordCracker from '../Games/PasswordCracker';
import PortScanner from '../Games/PortScanner';
import MatrixStream from '../Games/MatrixStream';

const useStyles = makeStyles({
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '30px',
        padding: '20px'
    },
    gamesColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    centerProfile: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        width: '400px',
        height: '490px',
        borderRadius: '25px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
    },
    title: {
        fontSize: '2.2rem',
        color: '#08155a',
        fontWeight: 'bold',
        fontFamily: "'Poppins', sans-serif",
        marginBottom: '5px'
    },
    subtitle: {
        color: '#273573ff',
        marginBottom: '40px',
        fontSize: '1.1rem',
        fontWeight: '500'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '60%'
    },
    actionButton: {
        height: '50px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0,0,0,0.8)'
    }
});

const HomePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = location.state?.user;

    return (
        <div className={classes.pageContainer}>
            
            <div className={classes.gamesColumn}>
                <CyberReflexGame />
                <PasswordCracker />
            </div>

            <div className={classes.centerProfile}>
                <SecurityIcon style={{ fontSize: 90, color: '#08155a', marginBottom: '15px' }}/>
                
                <div className={classes.title}>
                    Hello, {currentUser}!
                </div>
                
                <div className={classes.subtitle}>
                    Secure Hub Access: Granted<br/>
                    Status: <span style={{color: '#17ad49ff'}}>Online</span>
                </div>

                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<VpnKeyIcon />} 
                        onClick={() => navigate('/ChangePassword', { state: { user: currentUser } })}
                    >
                         CHANGE PASSWORD
                    </Button>

                    <Button variant="contained" color="error" className={classes.actionButton} startIcon={<LogoutIcon />}
                         onClick={() => navigate('/')}>
                         LOGOUT
                    </Button>
                </div>
            </div>

            <div className={classes.gamesColumn}>
                <PortScanner />
                <MatrixStream />
            </div>

        </div>
    );
}

export default HomePage;