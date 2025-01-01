import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Box pl={10} pt={7} >
            <Typography variant="h4"> Unauthorized 401</Typography>
            <Typography variant="body1"> You do not have access to the requested page.</Typography>
            <Link to="/">
                <Typography variant="body1"> Visit Our Homepage</Typography>
            </Link>
            <Button onClick={goBack}>Return</Button>
        </Box>
    );
};

export default Unauthorized;
