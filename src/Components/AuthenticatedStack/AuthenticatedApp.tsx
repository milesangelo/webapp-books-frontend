import {
  MemoryRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "../Home";
import About from "../Account";
import ReadBookList from "../ReadBookList";
import AddNewBook from "../AddBook";
import Login from "../Login";
import NavBar from "../NavBar";

//import { createTheme } from '@mui/material/styles';
import Signup from "../Signup"
//import React from "react";


const AuthenticatedApp = () => {
    return (
        <div>authenticated!</div>
    )
//   return (<MemoryRouter initialEntries={["/mybooks"]} initialIndex={0}>
//      <NavBar></NavBar>
//      <Routes>
//        <Route path="/" element={<Home />} />
//        <Route path="/login" element={<Login />} />
//        <Route path="/signup" element={<Signup />} />
//        <Route path="/mybooks/readbooks" element={<ReadBookList />} />
//        <Route path="/mybooks/addnew" element={<AddNewBook />} />
//        <Route path="/account" element={<About />} />
//      </Routes>
//    </MemoryRouter>
//   )
};
    
    // <MemoryRouter initialEntries={["/mybooks"]} initialIndex={0}>
    //   <NavBar></NavBar>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/mybooks/readbooks" element={<ReadBookList />} />
    //     <Route path="/mybooks/addnew" element={<AddNewBook />} />
    //     <Route path="/account" element={<About />} />
    //   </Routes>
    // </MemoryRouter>


export default AuthenticatedApp;
