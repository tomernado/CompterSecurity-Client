import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
        marginBottom: '35px'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '70%'
    }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const [allFieldsError, setAllFieldsError] = useState(false);
    const [mailSent, setMailSent] = useState(false);

    const handleReset = () => {
        if (!username || !email) {
            setAllFieldsError(true);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError("Invalid Email Format");
            return;
        }

        console.log("Sending reset link to:", email, "for user:", username);
        setMailSent(true);
    };

    return (
        <div>
            <MessangerBox title={"Cannot restore password"} text={"Please fill all the fields"} isOpen={allFieldsError} setIsOpen={setAllFieldsError}/>
            <MessangerBox title={"Reset password success"} text={"A password reset link has been sent to you."} isOpen={mailSent} setIsOpen={setMailSent}/>
           
            <div className={classes.card}>
              
                <div className={classes.title}>
                    Reset Password
                </div>
                <div className={classes.subtitle}>
                    Enter your details to receive a reset link
                </div>

                <div className={classes.formContainer}>

                    <TextField label="Enter Username" variant="standard" value={username}
                        onChange={(e) => setUsername(e.target.value)}/>

                    <TextField  label="Enter Email Address" variant="standard" value={email} error={!!emailError} helperText={emailError}
                        onChange={(e) => { const val = e.target.value;
                        setEmail(val);
                            if (val !== '' && !emailRegex.test(val)) {
                                setEmailError("Invalid Email Format");
                            } 
                            else {
                                setEmailError("");
                            }
                        }}/>
                </div>

                <div className={classes.buttonsContainer}>

                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleReset}>
                        Send Reset code Link
                    </Button>

                    <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
                        Back to Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;