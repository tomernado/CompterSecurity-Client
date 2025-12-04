import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import './Login.css';

const useStyles = makeStyles({
    registerButton: {
        marginTop: '2vh ',
        textAlign: 'left'
    }
})

const Login = ({number}) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const classes = useStyles();
    const navigate = useNavigate();


return(
    <div className="page-container">
            
           
            <div className="card">
        <h1 className="main-title">
            Hello to our website!
        </h1>
        <h1 className="sub-title"> 
           Please login
        </h1>

    <div className="inputs-section">
    <TextField id="standard-basic" label="Enter User name" variant="standard" value={userName}
     onChange={(e) => {
        setUserName(e.target.value)
    }}/>
   
    <TextField type='password' id="standard-basic" label="Enter Password" variant="standard" value={password}
       onChange={(e) => {
        setPassword(e.target.value)
    }}/>
    </div>

    <div className="buttons-row">
        <Button variant="contained"
         onClick={() => navigate('/homePage', { state: { user: userName } })} startIcon={<VpnKeyIcon/>}>
             Login
        </Button>
    
        <Button variant="text" size="small"
         onClick={() => navigate('/forgotPassword')} >
             Forgot my password
        </Button>
    </div>
      


  <div className="register-row">
   <h1 className='header'>
        New member? Sign up now!
    </h1>
    
        <Button className={classes.registerButton} variant="contained"
         onClick={() => navigate('/register')} startIcon={<PersonAddIcon/>}>
             Register
        </Button>
    </div>

    </div> 
    </div>
 )    
}

export default Login


