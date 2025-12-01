import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    welcomingLabel: {
        fontFamily: 'Eater, serif',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: '1.7em',
        color: 'red',
        marginBottom: '10vh'
    },

    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '80vw'
    }
})

const Register = () => {

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState('')
    const classes = useStyles();

    return(
        <>
        <div className={classes.welcomingLabel}>
            Welcome to our site, please register:
        </div>
        <div className={classes.registerForm}>
        <TextField id="standard-basic" label="Enter User name" variant="standard" value={userName}
            onChange={(e) => {
            setUserName(e.target.value)
        }}/>
        <TextField type='password' id="standard-basic" label="Enter your password" variant="standard" value={password}
            onChange={(e) => {
            setPassword(e.target.value)
        }}/>
        </div>
        </>
    )
}

export default Register