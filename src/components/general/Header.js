import {Box, Grid} from "@material-ui/core";

export default function Header({pageName}) {
    return (
        <Box>
            {pageName && (<Grid container spacing={2} justify={"center"}>
                <Grid>
                    <h2>{pageName}</h2>
                </Grid>
            </Grid>)}
        </Box>);
}