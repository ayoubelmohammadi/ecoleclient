import {Box, FormControl, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Autocomplete} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {QontoConnector, QontoStepIcon} from "./EleveAddSteps";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {NATIONALITIES, SECTORS} from "../../config/apiConfig";
import MuiPhoneNumber from "material-ui-phone-number";
import {validEmail} from "../general/Header";
import {saveTutor} from "../../redux/actions/tuteurActions";

const steps = ['Pere', 'Mere', 'Tuteur', 'Terminer'];

export default function TutorUpdate() {
    const [state, setState] = useState({});
    useEffect(() => {
        console.log(state);
    }, [state])
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
        setState({});
    };

    function handleSave() {
        dispatch(saveTutor(state))
        handleNext();
    }


    return (<Paper>
        <Box minHeight={500}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={10} hidden={activeStep !== 0}>
                    <ParentForm state={state} setState={setState} prefix={"Father"}/>
                </Grid>
                <Grid item xs={10} hidden={activeStep !== 1}>
                    <ParentForm state={state} setState={setState} prefix={"Mother"}/>
                </Grid>
                <Grid item xs={10} hidden={activeStep !== 2}>
                    <TutorForm state={state} setState={setState}/>
                </Grid>
            </Grid>
        </Box>
        <Grid container spacing={2} justify={"center"}>
            <Grid item xs={10}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={3} justify={"flex-end"}>

                    <Grid item>
                        <Button
                            onClick={() => {
                                handleReset()
                            }}
                            variant={"outlined"}>
                            Annuler
                        </Button>
                    </Grid>
                    {activeStep === steps.length ? (
                        <Grid item>
                            <Button onClick={handleReset} variant={"contained"}>
                                Nouveau
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Button disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant={"outlined"}>
                                Retour
                            </Button>
                        </Grid>
                    )}
                    {activeStep === steps.length - 1 ? (
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                            >
                                Sauvgarder
                            </Button>
                        </Grid>) : activeStep < steps.length - 1 ? (
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                Suivant
                            </Button>
                        </Grid>) : null}

                </Grid>
            </Grid>
        </Grid>
    </Paper>);
}
function TutorForm({state, setState}) {
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    return (
        <Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            margin={"dense"}
                            fullWidth
                            name={"lastNameTutor"}
                            id={'lastNameTutor'}
                            value={state["lastNameTutor" ]}
                            label="Nom"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"firstNameTutor"}
                            id={'firstNameTutor' }
                            value={state["firstNameTutor"]}
                            label="Prenom"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"cinTutor"}
                            id={"cinTutor"}
                            value={state["cinTutor"]}
                            label="CIN"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField

                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"addressTutor" }
                            id={"addressTutor" }
                            value={state["addressTutor" ]}
                            label="Adresse"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label={"Email"}
                            id={'mailTutor' }
                            name={'mailTutor' }
                            variant={"outlined"}
                            error={!(!state['mailTutor'] || validEmail(state['mailTutor']))}
                            value={state['mailTutor']}
                            onChange={handleChange}
                            margin="dense"
                            required
                            inputProps={{maxLength: 256}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPhoneNumber
                                margin={"dense"}
                                label={"tel fixe"}
                                autoformat={true}
                                variant={"outlined"}
                                defaultCountry={'ma'}
                                value={state['telFixeTutor' ]}
                                onChange={value => {
                                    setState({...state, ['telFixeTutor' ]: value});
                                }}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPhoneNumber
                                margin={"dense"}
                                label={"tel mobile"}
                                autoformat={true}
                                variant={"outlined"}
                                defaultCountry={'ma'}
                                value={state['telMobileTutor' ]}
                                onChange={value => {
                                    setState({...state, ['telMobileTutor']: value});
                                }}/>
                        </FormControl>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </Box>
    )
}
function ParentForm({state, setState, prefix}) {
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    return (<Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            margin={"dense"}
                            fullWidth
                            name={"lastName" + prefix}
                            id={'lastName' + prefix}
                            value={state["lastName" + prefix]}
                            label="Nom"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"firstName" + prefix}
                            id={'firstName' + prefix}
                            value={state["firstName" + prefix]}
                            label="Prenom"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"cin" + prefix}
                            id={"cin" + prefix}
                            value={state["cin" + prefix]}
                            label="CIN"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <KeyboardDatePicker
                            margin={"dense"}
                            label="Date de naissance"
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            value={state['birthday' + prefix]}
                            onChange={(date) => {
                                setState({
                                    ...state,
                                    ['birthday' + prefix]: date
                                });
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                            inputVariant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            value={NATIONALITIES.filter(o => o.id === state['nationality' + prefix])[0]}
                            options={NATIONALITIES}
                            getOptionLabel={(option) => option.label}
                            fullWidth
                            onChange={(event, newValue) => {
                                setState({...state, ['nationality' + prefix]: newValue.id});
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Nationalite"
                                           variant="outlined" margin={"dense"}/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField

                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"address" + prefix}
                            id={"address" + prefix}
                            value={state["address" + prefix]}
                            label="Adresse"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            value={state["sector" + prefix]}
                            options={SECTORS}
                            getOptionLabel={(option) => option}
                            fullWidth
                            onChange={(event, newValue) => {
                                setState({...state, ["sector" + prefix]: newValue});
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Secteur"
                                           margin={"dense"}
                                           variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"jon" + prefix}
                            id={'job' + prefix}
                            value={state["jon" + prefix]}
                            label="Profession"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label={"Email"}
                            id={'mail' + prefix}
                            name={'mail' + prefix}
                            variant={"outlined"}
                            error={
                                !(!state['mail' + prefix] || validEmail(state['mail' + prefix]))
                            }
                            value={state['mail' + prefix]}
                            onChange={handleChange}
                            margin="dense"
                            required
                            inputProps={{maxLength: 256}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleChange}
                            margin={"dense"}
                            fullWidth
                            name={"addressProfessional" + prefix}
                            id={"addressProfessional" + prefix}
                            value={state["addressProfessional" + prefix]}
                            label="Adresse professionelle"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPhoneNumber
                                onChange={handleChange}
                                margin={"dense"}
                                label={"tel professionel"}
                                autoformat={true}
                                variant={"outlined"}
                                defaultCountry={'ma'}
                                value={state['telProfessional' + prefix]}
                                onChange={value => {
                                    setState({...state, ['telProfessional' + prefix]: value});
                                }}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPhoneNumber
                                margin={"dense"}
                                label={"tel fixe"}
                                autoformat={true}
                                variant={"outlined"}
                                defaultCountry={'ma'}
                                value={state['telFixe' + prefix]}
                                onChange={value => {
                                    setState({...state, ['telFixe' + prefix]: value});
                                }}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <MuiPhoneNumber
                                margin={"dense"}
                                label={"tel mobile"}
                                autoformat={true}
                                variant={"outlined"}
                                defaultCountry={'ma'}
                                value={state['telMobile' + prefix]}
                                onChange={value => {
                                    setState({...state, ['telMobile' + prefix]: value});
                                }}/>
                        </FormControl>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </Box>)
}