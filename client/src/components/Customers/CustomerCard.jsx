import React, { useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import IconButton from '@mui/material/IconButton';
import { apiDelete } from '../../utils/apiUtils';
import { useSafeMode } from '../../contexts/SafeModeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles({
    cardRoot: {
        marginLeft: '15vw',
        marginBottom: '1%',
        width: '60vw'
        
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    userInfo:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

const CustomerCard = ({customerId, userName, customerName, customerPhone, refreshCustomers}) => {

    const classes = useStyles();
    const { safeMode } = useSafeMode();
    
    // It was very hard to break the XSS code, we hope we did it well
    // Refs for unsafe rendering
    const customerNameRef = useRef(null);
    const userNameRef = useRef(null);
    const customerPhoneRef = useRef(null);
    const customerIdRef = useRef(null);
    const accordionTitleRef = useRef(null);

    const CUSTOMER_DELETE_CODE = Object.freeze({
    DELETED: 'DELETED',
    NOT_FOUND: 'NOT_FOUND',
    MISSED_PARAMETERS: 'MISSED_PARAMETERS'
});

    // It was very hard to break the XSS code, we hope we did it well
    const executeAllEventHandlers = (element) => {
        if (!element) return;
        
        const allElements = [element, ...element.querySelectorAll('*')];
        
        allElements.forEach(el => {
            const attrs = el.attributes;
            if (!attrs) return;
            
            for (let i = 0; i < attrs.length; i++) {
                const attr = attrs[i];
                if (attr.name.startsWith('on') && attr.value) {
                    try {
                        const handlerName = attr.name;
                        if (el[handlerName]) {
                            el[handlerName]();
                        } else {
                            eval(attr.value);
                        }
                    } catch (e) {
                        try {
                            eval(attr.value);
                        } catch (evalError) {
                        }
                    }
                }
            }
        });
    };


    useLayoutEffect(() => {
        if (!safeMode) {
            if (accordionTitleRef.current) {
                accordionTitleRef.current.innerHTML = customerName || userName || '';
            }
            
            if (userNameRef.current) {
                userNameRef.current.innerHTML = userName || 'N/A';
            }
            
            if (customerNameRef.current) {
                customerNameRef.current.innerHTML = customerName || 'N/A';
            }
            
            if (customerPhoneRef.current) {
                customerPhoneRef.current.innerHTML = customerPhone || 'N/A';
            }
            
            if (customerIdRef.current) {
                customerIdRef.current.innerHTML = customerId || '';
            }
            
            const allRefs = [accordionTitleRef, userNameRef, customerNameRef, customerPhoneRef, customerIdRef];
            allRefs.forEach(ref => {
                if (ref.current) {
                    const scripts = ref.current.getElementsByTagName('script');
                    for (let i = 0; i < scripts.length; i++) {
                        const script = scripts[i];
                        const newScript = document.createElement('script');
                        newScript.textContent = script.textContent || script.innerHTML;
                        document.body.appendChild(newScript);
                        document.body.removeChild(newScript);
                    }
                    
                    executeAllEventHandlers(ref.current);
                }
            });
        }
    }, [customerName, userName, customerPhone, customerId, safeMode]);
    
const handleDeleteCustomer = () => {
    apiDelete(`http://localhost:5000/customers/${customerId}`, userName)
        .then((response) => {
            if (response.data.returnCode === CUSTOMER_DELETE_CODE.DELETED) {
                refreshCustomers();
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                const { returnCode } = error.response.data;

                switch (returnCode) {
                    case CUSTOMER_DELETE_CODE.NOT_FOUND:
                        alert('Error: Customer ID not found.');
                        break;
                    case CUSTOMER_DELETE_CODE.MISSED_PARAMETERS:
                        alert('Error: Missing ID parameter.');
                        break;
                    default:
                    alert('An unknown error occurred during deletion.');
                    console.log(error.data)

                }
            }
        });
};

    return (
        <div className={classes.cardRoot}>
        <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                {safeMode ? (
                    <Typography component="span">{customerName || userName}</Typography>
                ) : (
                    <Typography component="span" ref={accordionTitleRef}></Typography>
                )}
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.cardInfo}>
                        <div className={classes.userInfo}>
                            <div>
                                <AccountCircleIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    user name: {safeMode ? (userName || 'N/A') : <span ref={userNameRef}></span>}
                            </div>
                            <div>
                                <BusinessIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer name: {safeMode ? (customerName || 'N/A') : <span ref={customerNameRef}></span>}
                            </div>
                            <div>
                                <PhoneIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer phone: {safeMode ? (customerPhone || 'N/A') : <span ref={customerPhoneRef}></span>}
                            </div>
                            <div>
                                <BadgeIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer id: {safeMode ? customerId : <span ref={customerIdRef}></span>}
                            </div>

                        </div>
                            <div>
                                <IconButton onClick={handleDeleteCustomer}>
                                    <DeleteIcon sx={{color: 'red'}}/>
                                </IconButton>
                            </div>
                    </div>
            
                </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default CustomerCard;
