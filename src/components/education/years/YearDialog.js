import React, {useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    makeStyles, TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Transition} from "../../app/DeleteDialog";
import AddIcon from "@material-ui/icons/Add";
import {useSelector} from "react-redux";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
export default function YearDialog({value, open, handleClose}) {
    const state = useState(value);
    const handleSave = () => {
        console.log(state)
    }
    return (<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle
            id="alert-dialog-slide-title">{"Creation D'une nouvelle annee scolaire"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Remplir les inforamtions suivante
            </DialogContentText>
            <Grid container justify={"center"}>
                <Grid item xs={4}>

                </Grid>
            </Grid>

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Annuler
            </Button>
            <Button onClick={handleSave} color="secondary" variant={"contained"}>
                Enregistrer
            </Button>
        </DialogActions>
    </Dialog>)
}

export function AddYearButton() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const classes = useStyles();
    return (
        <div>
            <YearDialog open={open} handleClose={() => setOpen(false)} value={{}}/>
            <Fab className={classes.fab} color={"secondary"} onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
        </div>);

}

export function YearSchoolSelectOption({onChange}) {
    const years = useSelector(state => state.school.years.list);
    const [state, setState] = useState();
    return (
        <Grid container justify={"center"} spacing={3}>
            <Grid item xs={12}>
                <Autocomplete
                    id="combo-box-demo"
                    value={state}
                    options={years}
                    getOptionLabel={(option) => option.schoolYear}
                    fullWidth
                    onChange={(event, newValue) => {
                        onChange(newValue);
                        setState(newValue);
                    }}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="Annee scolaire"
                                   margin={"dense"}
                                   variant="outlined"/>}
                />
            </Grid>
        </Grid>
    )
}