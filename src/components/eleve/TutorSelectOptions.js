import Grid from "@material-ui/core/Grid";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export default function TutorSelectOptions({onChange}) {
    const [state, setState] = useState();
    const tuteurs = useSelector(state => state.tuteurs.page.content);
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Autocomplete
                    id="combo-box-demo"
                    options={tuteurs}
                    getOptionLabel={(option) => option.fullNameFather}
                    fullWidth
                    onChange={(event, newValue) => {
                        onChange(newValue);
                        setState(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="identifiant du Famille"
                                                        variant="outlined"/>}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="outlined-read-only-input"
                    fullWidth
                    label="Nom et prénom"
                    value={state  ? state.fullNameFather : " "}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </Grid>
        </Grid>
    )
}