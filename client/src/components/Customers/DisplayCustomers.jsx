import React, { useEffect } from 'react';
import axios from 'axios';
import CustomerCard from './CustomerCard';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import CreateCustomer from './CreateCustomer';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        fontFamily: 'cursive',
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '90vh',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        minWidth: '90vw',
    },
    backButton: {
        alignSelf: 'flex-start',
        margin: '20px',
        marginBottom: '10px',
    },
    title: {
        fontSize: '1.5rem',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '10px',
        fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
        fontSize: '1rem',
        color: 'white',
        marginBottom: '20px',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        width: '100%',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '20px',
    },
    searchField: {
        width: '80%',
        borderRadius: '4px',
        color: 'white',
    },
  });

const DisplayCustomers = () => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = location.state?.user;
    const [customers, setCustomers] = useState(
        <div className={classes.loadingContainer}>
            <CircularProgress />
        </div>
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [allCustomers, setAllCustomers] = useState([]);


const setCustomersList = () => {
    axios.get(`http://localhost:3000/customers`, { withCredentials: true })
        .then(res => {
            const customersList = res.data.customers || [];
            setAllCustomers(customersList);
            const customersInCards = customersList.map(customer => (
                <CustomerCard 
                    userName={customer.userName} 
                    customerName={customer.customerName} 
                    customerPhone={customer.customerPhone} 
                    customerId={customer.customerId} 
                    refreshCustomers={setCustomersList}
                />
            ));
            setCustomers(customersInCards);
        })
        .catch((error) => {
            console.error("Error fetching customers:", error);
            if (error.response && error.response.status === 401) {
                alert('Access denied. Please login again.');
            } else {
                alert('Failed to load customers.');
            }
        });
}

const displayCustomersFromList = (customersList) => {
    if (customersList.length === 0) {
        setCustomers(<div style={{ color: 'white', marginTop: '20px' }}>No customers found</div>);
        return;
    }
    const customersInCards = customersList.map(customer => (
        <CustomerCard 
            userName={customer.userName} 
            customerName={customer.customerName} 
            customerPhone={customer.customerPhone} 
            customerId={customer.customerId} 
            refreshCustomers={setCustomersList}
        />
    ));
    setCustomers(customersInCards);
}

const handleSearch = (value) => {
    setSearchQuery(value);
    
    if (value.trim() === '') {
        // If search is empty, restore all customers
        displayCustomersFromList(allCustomers);
        return;
    }

    // Perform search
    axios.post('http://localhost:3000/customers/search', 
        { customerName: value },
        { withCredentials: true }
    )
    .then(res => {
        // Handle response where customer is an array
        if (res.data.customer) {
            const customerArray = Array.isArray(res.data.customer) 
                ? res.data.customer 
                : [res.data.customer];
            displayCustomersFromList(customerArray);
        } else {
            displayCustomersFromList([]);
        }
    })
    .catch((error) => {
        if (error.response) {
            if (error.response.status === 404) {
                displayCustomersFromList([]);
            } else if (error.response.status === 401) {
                alert('Access denied. Please login again.');
            } else {
                alert('Error searching customers.');
            }
        } else {
            alert('Network error. Please try again.');
        }
    });
}

    useEffect(() => {
        setCustomersList();
      },[]);

    return(
        <div className={classes.root}>
            <Button 
                variant="contained" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/homePage', { state: { user: currentUser } })}
                className={classes.backButton}
            >
                Back to Home
            </Button>
            <h1 className={classes.title}>
                Your customers:
            </h1>
            <h2 className={classes.subtitle}>
                Please select the customer you would like to work on:
            </h2>
            <CreateCustomer refreshCustomers={setCustomersList} currentUser={currentUser}/>
            <div className={classes.searchContainer}>
                <TextField
                    className={classes.searchField}
                    variant="standard"
                    label="Search customer"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        style: { color: 'white' },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    sx={{
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                />
            </div>
            {customers}
        </div>
    )
}

export default DisplayCustomers;
