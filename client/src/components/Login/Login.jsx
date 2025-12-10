import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

// --- הגדרת העיצוב (CSS בתוך הקוד) ---
const useStyles = makeStyles({
 
    card: {
        backgroundColor: 'white', padding: '40px', borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
    welcomingLabel: {
        fontSize: '1.8rem', color: '#08155a', fontWeight: 'bold',
        marginBottom: '20px', textAlign: 'center', fontFamily: "'Poppins', sans-serif",
    },
    formContainer: {
        display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '20px',
    },
    buttonsContainer: {
        display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
    }
});

const Login = () => {
    const classes = useStyles(); // שימוש בעיצובים
    const navigate = useNavigate();
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!userName || !password) return alert("Please fill in all fields");
        try {
            await axios.post('http://localhost:3000/login', { username: userName, password: password });
            navigate('/homePage', { state: { user: userName } });
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response?.status === 401) alert("Incorrect Username or Password!");
            else alert("Login failed. Check connection.");
        }
    };

    return (
        <div>
            <div className={classes.card}>
                
                <div className={classes.welcomingLabel}>
                    Hello to our website!
                    <br/>
                    Please login
                </div>

                <div className={classes.formContainer}>
                    <TextField label="Username" variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <TextField label="Password" type="password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={classes.buttonsContainer}>
                    <Button variant="contained" startIcon={<VpnKeyIcon/>} onClick={handleLogin}>
                      Login
                    </Button>
                    <Button variant="text" size="small" onClick={() => navigate('/forgotPassword')}>
                      Forgot my password
                    </Button>
                    
                    <div style={{ margin: '10px 0', borderBottom: '1px solid #eee' }}></div>
                    <span style={{textAlign: 'center', fontSize: '0.9rem', color: '#666'}}>New member?</span>
                    
                    <Button variant="outlined" startIcon={<PersonAddIcon/>} onClick={() => navigate('/register')}>
                      Sign up now
                    </Button>
                </div>

            </div> 
        </div>
    );
}

export default Login;