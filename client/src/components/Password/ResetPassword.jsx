import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MessangerBox from '../Alerts/MessangerBox';

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
        fontFamily: "'Poppins', sans-serif"
    },
    subtitle: {
        fontSize: '0.95rem',
        color: '#08155a',
        marginBottom: '20px'
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

    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleResetSubmit = () => {
        if (!newPassword || !verifyPassword) {
            setErrorMsg("Please fill all fields");
            setIsErrorOpen(true);
            return;
        }

        if (newPassword !== verifyPassword) {
            setErrorMsg("Passwords do not match");
            setIsErrorOpen(true);
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setErrorMsg("Password must be at least 10 chars, include Uppercase, Lowercase, Number & Special char.");
            setIsErrorOpen(true);
            return;
        }

        console.log("Resetting password...");
        setIsSuccessOpen(true);
        
        // אחרי שהמשתמש רואה את ההצלחה, נעביר אותו ללוגין
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <>
            <MessangerBox title={"Error"} text={errorMsg} isOpen={isErrorOpen} setIsOpen={setIsErrorOpen}/>
            <MessangerBox title={"Success"} text={"Password has been reset! Redirecting..."} isOpen={isSuccessOpen} setIsOpen={setIsSuccessOpen}/>

            <div className={classes.card}>
                <div className={classes.title}>Set New Password</div>
                <div className={classes.subtitle}>
                    Please create a new strong password
                </div>

                <div className={classes.formContainer}>

                    <TextField  label="New Password" type="password" variant="standard" 
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

                   <TextField  label="Verify New Password" type="password" variant="standard"  
                        value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
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