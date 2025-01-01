import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Missing = () => {
    return (
        <Box pl={10} pt={7} >
            <Typography variant="h4"> Oops 404</Typography>
            <Typography variant="body1"> Page Not Found</Typography>
            <Link to="/">
                <Typography variant="body1"> Visit Our Homepage</Typography>
            </Link>

        </Box>
    );
};

export default Missing;
