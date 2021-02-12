import {Paper} from "@material-ui/core";
import Header from "../../components/general/Header";
import TutorUpdate from "../../components/eleve/TutorUpdate";
import React from "react";

export default function Tutor(){
    return(
        <Paper>
            <Header pageName={"Tuteurs"}/>
            <TutorUpdate/>
        </Paper>
    )
}