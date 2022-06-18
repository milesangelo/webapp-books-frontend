import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./Common/Copyright";
import { Grid, Rating, TextField } from "@mui/material";
import { useUserContext } from "./Auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const steps = ["Title & Author", "Rating", "Description"];

const theme = createTheme();

export interface BookPostResponse {
    success: boolean;
}

export default function AddBook() {
    const navigate = useNavigate();

    const auth = useUserContext();
    const [rating, setRating] = React.useState<number | null>(0);
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");

    const [notes, setNotes] = React.useState("");

    const handleSubmit = async () => {
        console.log(title, author, notes, rating);
        const response = await fetch("http://books-api.milesangelo.io/api/books/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                author: author,
                rating: rating,
                notes: notes,
                jwt: auth?.user?.token,
            }),
        });
        const data = await response.text();
        const res = JSON.parse(data) as BookPostResponse;
        if (res.success) {
            navigate('../')
        } else {
            console.log('error!');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: "relative",
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Add a new book
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        Book Details
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Title & Author
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onChange={(e) =>
                                            setTitle(e.currentTarget.value)
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="author"
                                        name="author"
                                        label="Author"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) =>
                                            setAuthor(e.currentTarget.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="legend">
                                        How would you rate this book?
                                    </Typography>
                                    <Rating
                                        precision={0.5}
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Notes"
                                        multiline
                                        fullWidth
                                        rows={6}
                                        placeholder="The main character seemed interesting at first, yet..."
                                        onChange={(e) =>
                                            setNotes(e.currentTarget.value)
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
