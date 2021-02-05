import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default function PageHeader({title}) {
    return (
        <Paper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h3>
                        {title}
                    </h3>
                </Grid>
            </Grid>
        </Paper>
    );
}