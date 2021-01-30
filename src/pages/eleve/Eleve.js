import {Paper} from "@material-ui/core";
import Header from "../../components/general/Header";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchEleves} from "../../redux/actions/eleveActions";
import EleveTable from "../../components/eleve/EleveTable";
import EleveAddd from "../../components/eleve/EleveAddd";

export default function Eleve() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(dispatch(fetchEleves({})))
    })
    return (
        <Paper>
            <Header pageName={"GESTION DES ÉLÈVES"}/>
            <EleveTable/>
            <EleveAddd/>
        </Paper>
    );
}