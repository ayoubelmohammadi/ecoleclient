import {Box, Grid} from "@material-ui/core";
import {EMAIL_REGEX} from "../../pages/auth/Login";
export function validEmail(address) {
    return (
        address &&
        typeof address === "string" &&
        address.length > 0 &&
        address.match(EMAIL_REGEX)
    );
}
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