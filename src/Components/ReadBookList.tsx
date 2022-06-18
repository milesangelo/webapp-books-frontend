import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid, Rating } from "@mui/material";
import bookService from "../Services/BookService";
import { useUserContext } from "./Auth/AuthContext";

export interface Book {
    title: string;
    author: string;
    rating: number;
}

interface BookCardProps {
    title: string;
    author: string;
    rating: number;
}

const BookCard = (props: BookCardProps): JSX.Element => {
    const [value, setValue] = useState(0.0);
    return (
        <>
            <CardContent
                sx={{
                    bgcolor: "primary.light",
                }}
            >
                <Typography
                    variant="h5"
                    color="primary.contrastText"
                    component="div"
                    gutterBottom
                >
                    {props.title}
                </Typography>
                <Typography variant="h6" color="primary.contrastText">
                    {props.author}
                </Typography>
                <Typography
                    color="text.secondary"
                    sx={{ mb: 0.1 }}
                    variant="body2"
                >
                    Rating:
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={props.rating}
                    onChange={(event, value) => {
                        setValue(value || 0.0);
                    }}
                />
            </CardContent>
        </>
    );
};

const ReadBookList = () => {
    const [books, setBooks] = useState<Book[] | null>(null);
    const auth = useUserContext();
   
    React.useEffect(() => {
      if (!books) {
        bookService.getAllBooks(auth?.user?.token)
          .then((books: Book[] | undefined) => {
            console.log('got all books', books)
            if (books) {
              setBooks(books);
            } 
          })
      }
    });

    return (
        <Grid
            container
            sx={{ paddingLeft: 4, paddingTop: 4, paddingRight: 4 }}
            spacing={4}
        >
            {books &&
                books.map((item, i) => (
                    <Grid key={i} item sx={{ minWidth: 240 }} xs={4}>
                        <BookCard
                            title={item.title}
                            author={item.author}
                            rating={item.rating}
                        />
                    </Grid>
                ))}
        </Grid>
    );
};

export default ReadBookList;
