import axios from '../Api/axios';
import { Book } from '../Components/ReadBookList';
import { getErrorMessage } from '../Errors';


class BookService {
    url = "api/books";

    getAll = async () => {
        try {
            const response = await axios.get(this.url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            //return (JSON.stringify(response?.data))

            return (JSON.parse(response?.data) as Book[])
        } catch (err) {
            reportError({ message: getErrorMessage(err) })
        }
    };
}

const bookService = new BookService();

export default bookService;