import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import CyberReflexGame from '../Games/CyberReflexGame'; 
import PasswordCracker from '../Games/PasswordCracker';
import PortScanner from '../Games/PortScanner';
import MatrixStream from '../Games/MatrixStream';
import { apiGet } from '../../utils/apiUtils';
import { useSafeMode } from '../../contexts/SafeModeContext';

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
        minHeight: '560px',
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
        marginBottom: '20%'
        
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
    const user = location.state?.user;
    const { safeMode } = useSafeMode();

    const [userToDisplay, setUserToDisplay] = useState('');
    const titleRef = useRef(null);

    // use to show the unsafe mode title that enble XSS
    useLayoutEffect(() => {
        if (titleRef.current && !safeMode) {
            const htmlContent = `Hello, ${userToDisplay || ''}!`;
            
            titleRef.current.innerHTML = htmlContent;
            

            const scripts = titleRef.current.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const script = scripts[i];
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent || script.innerHTML;
                document.body.appendChild(newScript);
                document.body.removeChild(newScript);
            }
            
            const svgElements = titleRef.current.getElementsByTagName('svg');
            for (let i = 0; i < svgElements.length; i++) {
                const svg = svgElements[i];
                if (svg.onload) {
                    try {
                        svg.onload();
                    } catch (e) {
                        const onloadStr = svg.getAttribute('onload');
                        if (onloadStr) {
                            eval(onloadStr);
                        }
                    }
                }
            }
        }
    }, [userToDisplay, safeMode]);

    useEffect(() => {
        if (!user) return;
        
        apiGet('http://localhost:5000/getUserName', user)
            .then(response => {
                console.log(response.data.username);
                
                const username = response.data.username || '';
                setUserToDisplay(username);
            })
            .catch(error => {
                console.error('Error fetching username:', error);
                if (error.response && error.response.status === 404) {
                    setUserToDisplay('NOT FOUND');
                }
            });
    }, []);

    return (
        <div className={classes.pageContainer}>
            <div className={classes.centerProfile}>
                <SecurityIcon style={{ fontSize: 90, color: '#08155a', marginBottom: '15px' }}/>
                
                {safeMode ? (
                    <div className={classes.title}>Hello, {userToDisplay || ''}!</div>
                ) : (

                    <div 
                        className={classes.title}
                        ref={titleRef}
                    />
                )}
                


                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<VpnKeyIcon />} 
                        onClick={() => navigate('/ChangePassword', { state: { user: user } })}
                    >
                         CHANGE PASSWORD
                    </Button>

                    <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<PeopleIcon />}
                        onClick={() => navigate('/customers', { state: { user: user } })}>
                         CUSTOMERS
                    </Button>

                    <Button variant="contained" color="error" className={classes.actionButton} startIcon={<LogoutIcon />}
                         onClick={() => navigate('/')}>
                         LOGOUT
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;