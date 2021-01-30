import {Dialog, DialogContent, DialogTitle, Fab, makeStyles, Slide} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {forwardRef, useState} from "react";
import EleveAddSteps from "./EleveAddSteps";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
export default function EleveAddd() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const classes = useStyles();
    return (
        <div>
            <Fab className={classes.fab} color={"secondary"} onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <Dialog
                maxWidth={"lg"}
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Ajouter un éleve"}</DialogTitle>
                <DialogContent>
                    <EleveAddSteps setOpen={(value) => {
                        setOpen(value);
                    }}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}
