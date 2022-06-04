import "./App.css";

import { createTheme } from '@mui/material/styles';
import React from "react";
import { useUserContext } from "./Components/Auth/AuthContext";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AddNewBook from "./Components/AddBook";
import ReadBookList from "./Components/ReadBookList";
import { RequireAuth } from "./Components/Auth/RequireAuth";

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

const AuthenticatedApp = React.lazy(() => import('./Components/AuthenticatedStack/AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./Components/UnauthenticatedStack/UnauthenticatedApp'))

function App() {
  const userContext = useUserContext()
  if (userContext) {
    console.log('userContext: ', JSON.stringify(userContext))
  }

  const handleLogin = () => {
    if (userContext) {
      userContext.setUser({
        email: 'test@gmail.com',
        name: 'miles'
      })
    }
  }

  const handleLogout = () => {
    if (userContext) {
      userContext.setUser(null)
    }
  }
  console.log((userContext === null))
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mybooks/readbooks"
          element={
            <RequireAuth>
              <ReadBookList />
            </RequireAuth>
          }
        />
        <Route
          path="/mybooks/addnew"
          element={
            <RequireAuth>
              <AddNewBook />
            </RequireAuth>
          } 
        />
        
        {/*userContext?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
