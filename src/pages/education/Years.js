import {Grid} from "@material-ui/core";
import PageHeader from "../../components/app/PageHeader";
import {useEffect} from "react";
import {fetchYears} from "../../redux/actions/schoolActions";
import {useDispatch} from "react-redux";
import YearTable from "../../components/education/years/YearTable";

export default function Years() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchYears());
    });
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <PageHeader title={"GESTION DES ANNÉES DE SCOLARITÉ"}/>
            </Grid>
            <Grid item xs={12}>
                <YearTable/>
            </Grid>
        </Grid>
    )
}