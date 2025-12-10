import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const MessangerBox = ({title, text, isOpen, setIsOpen}) => {
    return(
        <div>
            <Dialog
                open={isOpen}
                onClose={() => {setIsOpen(false)}}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {text}
                    </DialogContentText>
                </DialogContent>

            </Dialog> 
        </div>
    )
}

export default MessangerBox;
