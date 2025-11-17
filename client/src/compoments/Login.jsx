import { useState } from 'react'
import TextField from '@mui/material/TextField';

const Login = ({number}) => {

    const [userName, setUserName] = useState('Tomer & Yahav')
    const [password, setPassword] = useState('')

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
    }}

    />

    </div>



    </div>
 )    
}

export default Login


