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
import axios from 'axios';

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

    const CUSTOMER_DELETE_CODE = Object.freeze({
    DELETED: 'DELETED',
    NOT_FOUND: 'NOT_FOUND',
    MISSED_PARAMETERS: 'MISSED_PARAMETERS'
});
    
const handleDeleteCustomer = () => {
    axios.delete(`http://localhost:3000/customers/${customerId}`)
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
                <Typography component="span">{customerName || userName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.cardInfo}>
                        <div className={classes.userInfo}>

                            <div>
                                <BusinessIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer name: {customerName || 'N/A'}
                            </div>
                            <div>
                                <PhoneIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer phone: {customerPhone || 'N/A'} 
                            </div>
                            <div>
                                <BadgeIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    customer id: {customerId}
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
