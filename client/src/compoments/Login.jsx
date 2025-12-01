import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    registerButton: {
        marginTop: '2vh !important',
        textAlign: 'left !important'
    }
})

const Login = ({number}) => {

    const [userName, setUserName] = useState('Tomer & Yahav')
    const [password, setPassword] = useState('')

    const classes = useStyles();
    const navigate = useNavigate();


return(
    <div>
        <h1>
            The user is: {userName}
        </h1>
    <TextField id="standard-basic" label="Enter User name" variant="standard" value={userName}
     onChange={(e) => {
        setUserName(e.target.value)
    }}/>
    <div>
    <TextField type='password' id="standard-basic" label="Enter Password" variant="standard" value={password}
       onChange={(e) => {
        setPassword(e.target.value)
    }}/>
    <div>
        <Button className={classes.registerButton} variant="text" onClick={() => navigate('/register')} startIcon={<PersonAddIcon/>}>
             Register
        </Button>
    </div>



    </div>



    </div>
 )    
}

export default Login


