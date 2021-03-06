import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import {Autocomplete} from "@material-ui/lab";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchTuteurs} from "../../redux/actions/tuteurActions";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {saveEleve} from "../../redux/actions/eleveActions";
import TutorSelectOptions from "./TutorSelectOptions";
import {validEmail} from "../general/Header";
import MuiPhoneNumber from "material-ui-phone-number";
import {NATIONALITIES, SECTORS} from "../../config/apiConfig";

export const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

export function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed}/> : <div className={classes.circle}/>}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

export function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <SettingsIcon/>,
        2: <GroupAddIcon/>,
        3: <VideoLabelIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({

    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['tuteur', 'élève', 'Sauvgarder'];
}

function StudentForm({state, setState}) {
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    // birthPlace;
    return (<Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TextField
                        margin={"dense"}
                        fullWidth
                        name={"lastName"}
                        id={'lastName'}
                        value={state["lastName"]}
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
                        name={"firstName"}
                        id={'firstName'}
                        value={state["firstName"]}
                        label="Prenom"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl component="fieldset" fullWidth variant={"outlined"}>
                        <FormLabel component="legend">Sexe</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="gender"
                            value={state && state.gender === "true" ? "true" : "false"}
                            onChange={(value) => {
                                setState({
                                        ...state,
                                        gender: value.target.value
                                    }
                                )
                            }}>
                            <FormControlLabel value={"false"} control={<Radio/>} label="Female"/>
                            <FormControlLabel value={"true"} control={<Radio/>} label="Male"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <KeyboardDatePicker
                        margin={"dense"}
                        label="Date de naissance"
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        value={state['birthday']}
                        onChange={(date) => {
                            setState({
                                ...state,
                                ['birthday']: date
                            });
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                        inputVariant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        value={NATIONALITIES.filter(o => o.id === state['nationality'])[0]}
                        options={NATIONALITIES}
                        getOptionLabel={(option) => option.label}
                        fullWidth
                        onChange={(event, newValue) => {
                            setState({...state, ['nationality']: newValue.id});
                        }}
                        renderInput={(params) =>
                            <TextField {...params} label="Nationalite"
                                       variant="outlined" margin={"dense"}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                        name={"birthPlace"}
                        id={"birthPlace"}
                        value={state.birthPlace}
                        label="Lieu de naissance"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField

                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                        name={"health"}
                        id={"health"}
                        value={state.health}
                        label="Health"
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    </Box>)
}

export default function EleveAddSteps({setOpen}) {
    const [state, setState] = useState({});
    console.log(state);
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTuteurs({}));
    }, []);
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
        dispatch(saveEleve(state))
        handleNext();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} hidden={activeStep !== 0}>
                <TutorSelectOptions
                    onChange={(value) => setState(
                        {
                            ...state,
                            tutor: value
                        })
                    }/>
            </Grid>
            <Grid item xs={12} hidden={activeStep !== 1}>
                <StudentForm setState={setState} state={state}/>
            </Grid>
            <Grid item xs={12} hidden={activeStep !== 2}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h4>Voulez-vous inscrire cet étudiant :</h4>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3} justify={"flex-end"}>

                    <Grid item>
                        <Button
                            onClick={() => {
                                handleReset()
                                setOpen(false);
                            }}
                            className={classes.button}
                            variant={"outlined"}>
                            Annuler
                        </Button>
                    </Grid>
                    {activeStep === steps.length ? (
                        <Grid item>
                            <Button onClick={handleReset} className={classes.button} variant={"contained"}>
                                Nouveau
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Button disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                    variant={"outlined"}>
                                Retour
                            </Button>
                        </Grid>
                    )}
                    {activeStep === steps.length - 1 ? (
                        <Grid item>
                            <Button
                                disabled={!(state.tutor && state.tutor.id)}
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                className={classes.button}
                            >
                                Sauvgarder
                            </Button>
                        </Grid>) : activeStep < steps.length - 1 ? (
                        <Grid item>
                            <Button
                                disabled={!(state.tutor && state.tutor.id)}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Suivant
                            </Button>
                        </Grid>) : null}

                </Grid>
            </Grid>
        </Grid>
    );
}
