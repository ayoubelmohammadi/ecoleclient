import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DeleteDialog({open, handleDelete, items, title}) {
    const list = items.map(o => o.showLabel).join(", ") + ".";
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleDelete(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle
                id="alert-dialog-slide-title">{title ? title : "Êtes-vous sûr de vouloir supprimer ?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Êtes-vous sûr de supprimer ces enregistrements ?
                    En supprimant définitivement, vous ne pourrez pas les récupérer.<br/>
                    {list}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDelete(false)} color="primary">
                    Annuler
                </Button>
                <Button onClick={() => handleDelete(true)} color="secondary" variant={"contained"}>
                    Oui, supprimer!
                </Button>
            </DialogActions>
        </Dialog>
    )

}