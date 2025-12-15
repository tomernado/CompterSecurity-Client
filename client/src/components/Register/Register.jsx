import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
    welcomingLabel: {
        fontSize: '1.8rem',
        color: '#08155a',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        marginBottom: '20px'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '85%'
    }
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [mail, setMail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const [mailError, setMailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isMsgOpen, setIsMsgOpen] = useState(false);
    const [msgTitle, setMsgTitle] = useState("");
    const [msgText, setMsgText] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegister = async () => {
        setIsSuccess(false);

        if (!emailRegex.test(mail)) {
            setMailError("Invalid email format");
            return;
        }
        if (password !== verifyPassword) {
            setMsgTitle("Validation Error"); 
            setMsgText("Passwords do not match!"); 
            setIsMsgOpen(true);
            return;
        }
        if (!passwordRegex.test(password)) {
            setPasswordError("Password too weak (10+ chars, Uppercase, Lowercase, Number, Special)");
            return;
        }

        try {
            await axios.post("http://localhost:3000/register", {
                username: userName,
                email: mail,
                password: password,
            });

            setMsgTitle("Success"); 
            setMsgText("Registration Successful! Click to move to Login.");
            setIsSuccess(true); 
            setIsMsgOpen(true);

        } catch (error) {
            console.error("Registration failed:", error);
            
            setMsgTitle("Registration Failed");
            if (error.response?.status === 409) {
                setMsgText("User or Email already exists!");
            } 
            else {
                setMsgText("Could not register. Please check connection.");
            }
            setIsMsgOpen(true);
        }
    };

    const handleCloseMsg = () => {setIsMsgOpen(false);
        if (isSuccess) {
            navigate('/');
        }
    };

    return (
        <div> 
            <MessangerBox  title={msgTitle} text={msgText} isOpen={isMsgOpen} setIsOpen={handleCloseMsg} type={isSuccess ? "success" : "error"}/>

            <div className={classes.card}>

                <div className={classes.welcomingLabel}>
                    Welcome to our site,<br/> please register:
                </div>

                <div className={classes.formContainer}>
                    <TextField label="Email" variant="standard" value={mail} error={!!mailError} helperText={mailError}
                        onChange={(e) => {setMail(e.target.value);
                            setMailError("");
                        }}
                    />
                    <TextField label="Username" variant="standard" value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField label="Password" type="password" variant="standard" value={password} error={!!passwordError} helperText={passwordError}
                        onChange={(e) => {setPassword(e.target.value);
                            setPasswordError("");
                        }}
                    />
                    <TextField label="Verify Password" type="password" variant="standard" 
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                </div>

                <div className={classes.buttonsContainer}>
                    <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleRegister}>
                        Register
                    </Button>
                    
                    <Button onClick={() => navigate("/")}>
                        Back to Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;