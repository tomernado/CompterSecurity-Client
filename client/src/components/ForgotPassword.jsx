import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './ForgotPassword.css';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const navigate = useNavigate();

    const handleReset = () => {

        if (!username || !email) 
        {
            alert("Please fill in all fields");
            return;
        }

        
        if (!emailRegex.test(email)) 
        {
            setEmailError("Invalid Email Format");
            return;
        }

       
        console.log("Sending reset link to:", email, "for user:", username);
        
    
        alert(`A password reset link has been sent to ${email}`);
        
    
        navigate('/');
    };

    return (
        <div >
            <div className="page-container">
            <div className="card">
            <h1 className="forgot-title">Reset Password</h1>
            <p className="forgot-subtitle">
                Enter your details to receive a reset link
            </p>

            <div className="forgot-inputs">
                
                
                <TextField 
                    label="Enter Username" 
                    variant="standard" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

        
                <TextField 
                    label="Enter Email Address" variant="standard" 
value={email}
                    onChange={(e) => {
                        const val = e.target.value;
                        setEmail(val);
                        
                        if (val !== '' && !emailRegex.test(val)) {
                            setEmailError("Invalid Email Format");
                        } else {
                            setEmailError("");
                        }
                    }}
                    error={!!emailError}
                    helperText={emailError}
                />
            </div>

            <div className="forgot-buttons">
               
                <Button variant="contained" color="primary" endIcon={<SendIcon />}
                    onClick={handleReset}
                >
                    Send Reset Link
                </Button>


                <Button variant="text" startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </Button>
            </div>
        </div>
        </div>
        </div>
    );
};

export default ForgotPassword;