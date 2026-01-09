import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const [msgOpen, setMsgOpen] = useState(false);
    const [msgTitle, setMsgTitle] = useState("");
    const [msgText, setMsgText] = useState("");
    const [msgType, setMsgType] = useState("error");

    const handleReset = async () => {
        if (!email) {
            setMsgTitle("Missing Information");
            setMsgText("Please enter your email address");
            setMsgType("error");
            setMsgOpen(true);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError("Invalid Email Format");
            return;
        }

        try {
            await axios.post(getApiUrl('/forgot-password'), { email }); 
            setMsgTitle("Email Sent");
            setMsgText("If this email exists, a reset code has been sent to it.");
            setMsgType("success");
            setMsgOpen(true);
            
            setTimeout(() => {
                navigate('/resetPassword');
            }, 5000);

        } catch (error) {
            console.error(error);
            setMsgTitle("Error");
            setMsgText("Failed to send request. Server might be down.");
            setMsgType("error");
            setMsgOpen(true);
        }
    };

    return (
        <div>
            <MessangerBox title={msgTitle} text={msgText} isOpen={msgOpen} setIsOpen={setMsgOpen} type={msgType}/>
           
            <div className={classes.card}>
                <div className={classes.title}>Reset Password</div>
                <div className={classes.subtitle}>Enter your email to receive a reset code</div>

                <div className={classes.formContainer}>
                    <TextField  
                        label="Enter Email Address" 
                        variant="standard" 
                        value={email} 
                        error={!!emailError} 
                        helperText={emailError}
                        onChange={(e) => { 
                            const val = e.target.value;
                            setEmail(val);
                            setEmailError(val !== '' && !emailRegex.test(val) ? "Invalid Email Format" : "");
                        }}
                    />
                </div>

                <div className={classes.buttonsContainer}>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleReset}>
                        Send Reset Code
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