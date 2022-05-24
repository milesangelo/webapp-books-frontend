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
