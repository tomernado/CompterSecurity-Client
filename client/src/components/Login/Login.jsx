import { useState, useEffect } from 'react'; // 1. הוסף useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MessangerBox from '../Alerts/MessangerBox'; 

const useStyles = makeStyles({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '55px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
        width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
    welcomingLabel: {
        fontSize: '1.8rem', color: '#08155a', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontFamily: "'Poppins', sans-serif",
    },
    formContainer: {
        display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '30px',
    },
    buttonsContainer: {
        display: 'flex', flexDirection: 'column', gap: '10px', width: '85%',
    },
    divider: {
        margin: '10px 0', borderBottom: '1px solid #eee', width: '100%'
    },
    newMemberText: {
        textAlign: 'center', fontSize: '0.9rem', color: '#5e5e5fff'
    },
    warningText: {
        color: '#d32f2f', fontSize: '0.85rem', textAlign: 'center', marginTop: '-10px', fontWeight: 'bold'
    }
});

// פונקציה שמציגה זמן יפה (למשל 14:59)
const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Login = () => {
    const classes = useStyles(); 
    const navigate = useNavigate();
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isMsgOpen, setIsMsgOpen] = useState(false);
    const [msgTitle, setMsgTitle] = useState("");
    const [msgText, setMsgText] = useState("");
    
    const [attemptsWarning, setAttemptsWarning] = useState(null);
    const [lockoutTimer, setLockoutTimer] = useState(null); // הטיימר

    // מנגנון הטיימר שרץ כל שנייה
    useEffect(() => {
        if (lockoutTimer !== null) {
            const interval = setInterval(() => {
                setLockoutTimer((prev) => {
                    if (prev <= 1000) {
                        clearInterval(interval);
                        return null; // הזמן נגמר, מפסיקים את הטיימר
                    }
                    return prev - 1000;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [lockoutTimer]);

    const handleLogin = async () => {
        setAttemptsWarning(null);
        if (lockoutTimer) return; // לא נותן ללחוץ אם יש טיימר

        if (!userName || !password) {
            setMsgTitle("Missing Information");
            setMsgText("Please fill in all fields");
            setIsMsgOpen(true);
            return;
        }

        try {
            await axios.post('http://localhost:3000/login', { username: userName, password: password });
            navigate('/homePage', { state: { user: userName } });
        } catch (error) {
            setMsgTitle("Login Failed");
            
            if (error.response) {
                const { status, data } = error.response;

                if (status === 401) {
                    setMsgText("Incorrect Username or Password!");
                    if (data.attemptsLeft > 0) {
                        setAttemptsWarning(`Warning: ${data.attemptsLeft} attempts remaining!`);
                    }
                } 
                else if (status === 403) {
                    setMsgTitle("Account Locked");
                    // אם השרת שלח זמן - מפעילים טיימר
                    if (data.timeLeft) {
                        setLockoutTimer(data.timeLeft);
                        setMsgText(`Account locked. Wait ${formatTime(data.timeLeft)}`);
                    } else {
                        setMsgText("Account is locked.");
                    }
                } 
                else {
                    setMsgText("Login failed.");
                }
            }
            setIsMsgOpen(true);
        }
    };

    return (
        <div>
            <MessangerBox title={msgTitle} text={msgText} isOpen={isMsgOpen} setIsOpen={setIsMsgOpen} type="error"/>

            <div className={classes.card}>
                <div className={classes.welcomingLabel}>
                    Hello to our website!<br/>Please login
                </div>

                <div className={classes.formContainer}>
                    <TextField label="Username" variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <TextField label="Password" type="password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    {attemptsWarning && <div className={classes.warningText}>{attemptsWarning}</div>}
                    
                    {/* תצוגת הטיימר */}
                    {lockoutTimer && (
                        <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}>
                            Locked. Try again in: {formatTime(lockoutTimer)}
                        </div>
                    )}
                </div>

                <div className={classes.buttonsContainer}>
                    <Button 
                        variant="contained" 
                        startIcon={<VpnKeyIcon/>} 
                        onClick={handleLogin}
                        disabled={!!lockoutTimer} // מבטל את הכפתור בזמן נעילה
                        style={lockoutTimer ? { backgroundColor: '#ccc' } : {}}
                    >
                        {lockoutTimer ? formatTime(lockoutTimer) : "Login"}
                    </Button>
                    
                    <Button variant="text" size="small" onClick={() => navigate('/forgotPassword')}>Forgot my password</Button>
                    <div className={classes.divider}> </div>
                    <span className={classes.newMemberText}>New member?</span>
                    <Button variant="outlined" startIcon={<PersonAddIcon/>} onClick={() => navigate('/register')}>Sign up now</Button>
                </div>
            </div> 
        </div>
    );
}

export default Login;