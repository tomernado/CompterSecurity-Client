import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import MessangerBox from '../Alerts/MessangerBox';
import { getApiUrl } from '../../utils/apiUtils';

const useStyles = makeStyles({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '55px',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: '1.8rem',
        color: '#08155a',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
    },
    subtitle: {
        fontSize: '0.95rem',
        color: '#08155a',
        marginBottom: '20px',
        textAlign: 'center'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '90%',
        marginBottom: '50px'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '60%'
    }
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

const ResetPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleResetSubmit = async () => {
        if (!token || !newPassword || !verifyPassword) {
            setErrorMsg("Please fill all fields (including the code from email)");
            setIsErrorOpen(true);
            return;
        }

        if (newPassword !== verifyPassword) {
            setErrorMsg("Passwords do not match");
            setIsErrorOpen(true);
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setErrorMsg("Password too weak (10+ chars, Uppercase, Lowercase, Number & Special)");
            setIsErrorOpen(true);
            return;
        }

        try {
            await axios.post(getApiUrl('/reset-password'), {
                token: token,
                newPassword: newPassword
            });

            setIsSuccessOpen(true);
            
            setTimeout(() => {
                navigate('/');
            }, 5000);

        } catch (error) {
            console.error("Reset failed:", error);
            const msg = error.response?.data?.message || "Reset failed. Code might be invalid or expired.";
            setErrorMsg(msg);
            setIsErrorOpen(true);
        }
    };

    return (
        <>
            <MessangerBox title={"Error"} text={errorMsg} isOpen={isErrorOpen} setIsOpen={setIsErrorOpen} type="error"/>
            <MessangerBox title={"Success"} text={"Password has been reset! Redirecting to login..."} isOpen={isSuccessOpen} setIsOpen={setIsSuccessOpen} type="success"/>

            <div className={classes.card}>
                <div className={classes.title}>Set New Password</div>
                <div className={classes.subtitle}>Enter the code you received via email</div>

                <div className={classes.formContainer}>
                    <TextField 
                        label="Reset Code (Token)" 
                        variant="standard" 
                        value={token} 
                        onChange={(e) => setToken(e.target.value)}
                    />

                    <TextField  
                        label="New Password" 
                        type="password" 
                        variant="standard" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField  
                        label="Verify New Password" 
                        type="password" 
                        variant="standard"  
                        value={verifyPassword} 
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                </div>

                <div className={classes.buttonsContainer}>
                    <Button variant="contained" endIcon={<LockResetIcon />} onClick={handleResetSubmit}>
                        Reset Password
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;