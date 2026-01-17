import React, { useEffect } from 'react';
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
import { apiGet, apiPost } from '../../utils/apiUtils';

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
    customers: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
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
    apiGet('http://localhost:5000/customers', currentUser)
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
        displayCustomersFromList(allCustomers);
        return;
    }

    apiPost('http://localhost:5000/customers/search', 
        { customerName: value },
        currentUser
    )
    .then(res => {
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
                console.error('Access denied. Please login again.');
            } else {
                console.error('Error searching customers.');
            }
        } else {
            console.error('Network error. Please try again.');
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
                sx={{ marginTop: '20px' }}
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
            <div className={classes.customers}>
                {customers}
            </div>
        </div>
    )
}

export default DisplayCustomers;
