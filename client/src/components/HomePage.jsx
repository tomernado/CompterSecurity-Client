// src/compoments/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import './HomePage.css';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

  const useStyles = makeStyles({
    dataButton: {
        marginLeft: '5% !important'
    },

    ButtonsZone: {
        display: "flex"
    },
    dataString: {
        color: 'black'
    }
   });

const HomePage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const [data, setData] = useState("");

    useEffect(() => {
        getData()
    },[]);


    const getData = () => {
        axios.get('http://localhost:3000/test')
        .then((response) => {
            // handle success
            console.log(response);
            setData((response.data[0].userName))
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
    }


    const user = location.state?.user || 'Guest';
    
    return (
    <div className='page-container'>

    
     <div className="home-card">
        <h1 className="greeting-text">Hello {user}!</h1> 
            <h2 className="welcome-text">Welcome to our website</h2>
            <div className={classes.ButtonsZone}>
                <Button variant="contained" color="error" onClick={() => navigate('/')}>
                     Logout
                </Button>
                <Button className={classes.dataButton} variant="contained" color="success" onClick={getData}>Get data</Button>
            </div>
            <div className={classes.dataString}>
                {data}
            </div>
            
        </div>
    </div>
   
    );
};

export default HomePage;