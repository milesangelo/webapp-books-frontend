import "./App.css";

import {
  MemoryRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/Account";
import ReadBookList from "./Components/ReadBookList";
import AddNewBook from "./Components/AddBook";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <MemoryRouter initialEntries={["/mybooks"]} initialIndex={0}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mybooks/readbooks" element={<ReadBookList />} />
        <Route path="/mybooks/addnew" element={<AddNewBook />} />
        <Route path="/account" element={<About />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
