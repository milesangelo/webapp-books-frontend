import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


const Copyright = (props: any) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link to='/'>
          books.milesangelo.io
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  export default Copyright
  