import { Error } from "@mui/icons-material";
import axios from "../Api/axios";
import { Book } from "../Components/ReadBookList";
import { getErrorMessage } from "../Errors";

class BookService {
    url = "http://books-api.milesangelo.io/api/books";

    getAll = async () => {
        try {
            const response = await axios.get(this.url, {
                headers: { "Content-Type": "application/json" },
            });
            return JSON.parse(response?.data) as Book[];
        } catch (err) {
            reportError({ message: getErrorMessage(err) });
        }
    };

    getAllBooks = async (token: string | undefined) => {
        if (!token) {
            console.error('token undefined')
            return undefined;
        }
        
        try {
            const response = await fetch(this.url.concat('/getAllBooks'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jwt: token,
                }),
            });
            const data = await response.text();
            return JSON.parse(data) as Book[];
        } catch (err) {
            reportError({ message: getErrorMessage(err) });
        }
    };
}

const bookService = new BookService();

export default bookService;
