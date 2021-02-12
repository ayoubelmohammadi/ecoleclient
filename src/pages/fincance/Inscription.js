import {Box, Grid, Paper} from "@material-ui/core";
import Header from "../../components/general/Header";
import React, {useEffect, useState} from "react";
import {YearSchoolSelectOption} from "../../components/education/years/YearDialog";
import {useDispatch} from "react-redux";
import {fetchYears} from "../../redux/actions/schoolActions";
import Stepper from "@material-ui/core/Stepper";
import {QontoConnector, QontoStepIcon} from "../../components/eleve/EleveAddSteps";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

export default function Inscription() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchYears());
    });
    const [state, setState] = useState();
    return (
        <Paper>
            <Grid container justify={"center"} spacing={3}>
                <Grid item xs={12}>
                    <Header pageName={"Inscriptions"}/>
                </Grid>
                <Grid item xs={12}>
                    <InscriptionSteps/>
                </Grid>
            </Grid>

        </Paper>
    )
}


const steps = ['Inscription', 'Options', 'Validation', 'Terminer'];

export function InscriptionSteps({handleFinish}) {
    const [state, setState] = useState({});
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
        // dispatch(save(state))
        handleNext();
    }

    return (<Paper>
        <Box minHeight={400}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={10} hidden={activeStep !== 0}>
                    <InscriptionForm state={state} setState={setState} />
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
                                handleFinish && handleFinish();
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

export function InscriptionForm({state,setState}) {
    return (<Grid container spacing={3} justify={"center"}>
        <Grid item xs={10}>
            <YearSchoolSelectOption
                onChange={value => setState({
                    ...state,
                    schoolYear: value
                })}/>
        </Grid>
    </Grid>)
}