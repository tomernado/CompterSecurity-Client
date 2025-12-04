// src/compoments/HomePage.jsx
import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || 'Guest';
    
    return (
    <div className='page-container'>

    
     <div className="home-card">
        <h1 className="greeting-text">Hello {user}!</h1> 
            <h2 className="welcome-text">Welcome to our website</h2>
            <div><Button variant="contained" color="error" onClick={() => navigate('/')}>
               Logout
            </Button>
            </div>
            
        </div>
    </div>
   
    );
};

export default HomePage;