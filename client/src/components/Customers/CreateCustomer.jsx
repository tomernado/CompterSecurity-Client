import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Close } from '@mui/icons-material';
import { apiPost } from '../../utils/apiUtils';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
   formDiscription: {
    marginBottom: '5%'
   },

   textFieldLabel:{
    width: "80%",
    paddingBottom: '5%',
    top: 5
    },

    itemInForm: {
        marginBottom: '5%'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    
    openDisplayButton: {
        marginLeft: '40%',
        borderRadius: "100%",
        width: "100%",
        marginBottom: '1% !important'
    },

    closeButton: {
      width: '10%',
      top: '2%'
    }
  });

const CreateCustomer = ({refreshCustomers, currentUser}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
      setFormReady(customerName != '' && customerPhone != '' && currentUser != '' ? true : false);
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setCustomerName('');
      setCustomerPhone('');
    };

    const addCustomer = () => {
        apiPost('http://localhost:5000/customers', {
            customerName: customerName,
            customerPhone: customerPhone || null
        }, currentUser)
        .then((response) => {
            if (response.status === 201 || response.data.message) {
                handleClose();
                setCustomerName('');
                setCustomerPhone('');
                refreshCustomers();
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                alert(message || 'An error occurred while creating customer');
            } else {
                alert('An error occurred');
            }
        });
    };

    const setTextStates = (e) => {
        switch (e.target.id) {
          case 'customerName':
            setCustomerName(e.target.value);
            break;
          case 'customerPhone':
            const phoneValue = e.target.value.replace(/[^0-9]/g, '');
            setCustomerPhone(phoneValue);
            break;
          default:
            break; 
      }
    }
  
    return (
      <div>
        <Button  variant="contained"  onClick={handleClickOpen} className={classes.openDisplayButton}>
          <AddIcon />
        </Button>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">

          <IconButton className={classes.closeButton} onClick={handleClose}>
              <Close/>
          </IconButton>
          
            <DialogTitle>{"Create a new customer"}</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                  <div className={classes.formDiscription}>
                      To create a new customer please fill the information below:
                  </div>     
            </DialogContentText>
              <div className={classes.form}>
                <span className={classes.itemInForm}>
                <TextField id="customerName"  variant="standard"
                  label="Customer name"
                  className = {classes.textFieldLabel}
                  value={customerName}
                  onChange={(e) => setTextStates(e)}
                  InputLabelProps={{style : {color : 'black', fontSize: '1.3em'} }}
                />
                </span>

                <span className={classes.itemInForm}>
                <TextField id="customerPhone"  variant="standard"
                  label="Customer phone"
                  className = {classes.textFieldLabel}
                  value={customerPhone}
                  onChange={(e) => setTextStates(e)}
                  inputMode="numeric"
                  InputLabelProps={{style : {color : 'black', fontSize: '1.3em'} }}
                />
                </span>
              </div>
              
            </DialogContent>
            <DialogActions>
              <Button disabled = {!formReady} onClick={addCustomer}>Create</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default CreateCustomer;
