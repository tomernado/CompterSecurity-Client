import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MessangerBox from '../Alerts/MessangerBox'; 

const useStyles = makeStyles({
    card: {
     backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
    title: {
        fontSize: '1.8rem', color: '#08155a', fontWeight: 'bold',
        marginBottom: '10px', fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
        fontSize: '0.95rem', color: '#08155a', marginBottom: '20px'
    },
    formContainer: {
        display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '30px',
    },
    buttonsContainer: {
        display: 'flex', flexDirection: 'column', gap: '15px', width: '60%',
    }
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

const ChangePassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !verifyPassword) {
            setErrorMsg("Please fill all fields");
            setIsErrorOpen(true);
            return;
        }

        if (newPassword !== verifyPassword) {
            setErrorMsg("New passwords do not match");
            setIsErrorOpen(true);
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setErrorMsg("Password must be at least 10 chars, include Uppercase, Lowercase, Number & Special char.");
            setIsErrorOpen(true);
            return;
        }

        // כאן נחבר את השרת בעתיד
        console.log("Changing password...");
        setIsSuccessOpen(true);
     
    };

    return (
<>
    <MessangerBox title={"Error"} text={errorMsg} isOpen={isErrorOpen} setIsOpen={setIsErrorOpen}/>
    <MessangerBox title={"Success"} text={"Password changed successfully!"} isOpen={isSuccessOpen} setIsOpen={setIsSuccessOpen}/>

    <div className={classes.card}>

        <div className={classes.title}>
            Change Password
        </div>
        <div className={classes.subtitle}>
            Update your password securely
        </div>

        <div className={classes.formContainer}>

            <TextField label="Old Password" type="password" variant="standard"
               value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>

            <TextField label="New Password" type="password" variant="standard" 
               value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            
            <TextField label="Verify New Password" type="password" variant="standard" 
               value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
        </div>

        <div className={classes.buttonsContainer}>

            <Button variant="contained" endIcon={<SaveIcon />}>
                Update Password
            </Button>

            <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate('/homePage')}>
                Back to Home
            </Button>
        </div>
    </div>
</>
 );
};

export default ChangePassword;