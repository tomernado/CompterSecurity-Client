import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import './Login.css';



const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {

    const [mail, setMail] = useState ('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    
    const navigate = useNavigate();

    const handleRegister = () => {
        
        if (!emailRegex.test(mail)) {
            setMailError("Mail format is incorrect");
            return; 
        }

        if (password !== verifyPassword) {
           alert("Verified password is wrong!");
            return;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password does not meet complexity requirements");
            return;
        }

        console.log("Registration Successful:", { userName, mail, password });
        alert("Registration Successful");
        navigate('/'); 
    };

    return(
        <div className="page-container">
            
            {/* הכרטיס המעוצב במרכז */}
            <div className="card">
                
                <div className="welcoming-label">
                    Welcome to our site, please register:
                </div>
                
                <div className="register-form-container">


         <TextField id="standard-basic" label="Enter User mail" variant="standard" value={mail}
       onChange={(e) => {
                    const newValue = e.target.value;
                    setMail(newValue);
                    
                    
                    if (newValue !== '' && !emailRegex.test(newValue)) {
                        setMailError("Invalid Email Format");
                    } else {
                        setMailError("");
                    }
                }}
                error={!!mailError} 
                helperText={mailError} 
            />       
        <TextField id="standard-basic" label="Enter User name" variant="standard" value={userName}
            onChange={(e) => {
            setUserName(e.target.value)
        }}/>
        <TextField type='password' id="standard-basic" label="Enter your password" variant="standard" value={password}
       onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    
                    if (val !== '' && !passwordRegex.test(val)) {
                        setPasswordError("Must be 10+ chars with Upper, Lower, Number & Special (!@#$%^&*)");
                    } else {
                        setPasswordError("");
                    }
                }}
                error={!!passwordError} 
                helperText={passwordError}
            />
        <TextField type='password' id="standard-basic" label="Verify your password" variant="standard" value={verifyPassword}
            onChange={(e) => {setVerifyPassword(e.target.value)}
          }/>   
        </div>

        <div className="register-buttons-container">
            <Button 
                    variant="contained" color="primary"startIcon={<PersonAddIcon/>}
                    onClick={handleRegister}
                >
                    Register
                </Button>

                <Button onClick={() => navigate('/')}>
                    Back to Login
                </Button>
        </div>

        </div>
        </div>
    )
}

export default Register