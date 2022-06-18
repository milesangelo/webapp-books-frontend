import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";


const Home = () => { 

    const theme = useTheme();
    const heading = "Welcome to books.milesangelo.io";
    const subHeading = "An application built just for you to record the books you've read so far with ratings!"// 🎂";
    const summary = "Feel free to create a user or existing users can login to view the books you have read or add new ones to your list.";
    const summary1= "Start by navigating the the LOGIN page or SIGNUP page at top right of the page.";
    return(
        <Container sx={{mt: 2, fontSize: 50, color: 'grey'}}>
            <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.dark}}>{heading}</Typography>
            <Typography variant="h5" component="div">{subHeading}</Typography>
            <Typography variant="h6" component="div" sx={{ mt: 4, width: '75%', color: theme.palette.primary.light}}>{summary}</Typography>
            <Typography variant="h6" component="div" sx={{ mt: 4, width: '75%', color: theme.palette.primary.light}}>{summary1}</Typography>
        </Container>
    )
};

export default Home;