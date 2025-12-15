import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const getColorByType = (type) => {
    if (type === 'success') return '#00e676';
    if (type === 'error') return '#d32f2f'; 
    return '#08155a'; 
};

const useStyles = makeStyles({
    dialogPaper: {
        borderRadius: 15,
        minWidth: '300px',
        padding: '10px',
        borderTop: props => `5px solid ${getColorByType(props.type)}`
    },
    dialogTitle: {
        color: props => getColorByType(props.type),
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
    },
    dialogContent: {
        textAlign: 'center',
        color: '#08155a',
        paddingTop: '10px'
    },
    actionButton: {
        color: props => getColorByType(props.type),
        fontWeight: 'bold'
    }
});

    const MessangerBox = ({ title, text, isOpen, setIsOpen, type }) => {
    
    const classes = useStyles({ type });
    const currentColor = getColorByType(type);

    return (
        <div>
        <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle className={classes.dialogTitle}>
                    {title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        {text}
                    </DialogContentText>
                </DialogContent>

                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={() => setIsOpen(false)} className={classes.actionButton}>
                        {type === 'success' ? "Great!" : "Close"}
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default MessangerBox;