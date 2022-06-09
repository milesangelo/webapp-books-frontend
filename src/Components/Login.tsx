import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import AuthContext, { User } from '../Components/Auth/AuthContext';
// import axios from '../Api/axios';
import { UserContext } from './Auth/AuthContext';
import { getErrorMessage } from '../Errors';
import { CatchingPokemonSharp } from '@mui/icons-material';
import { useState } from 'react';
const theme = createTheme();

const LOGIN_URL = '/api/users';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to=''>
        books.milesangelo.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const signIn = async ({ email, password }: { email: string, password: string }): Promise<string> => {
  const response = await fetch('http://localhost:7182/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  });

  const data = await response.text();

  if (response.ok) {
    if (data) {
      console.log(`signin response data: ${data}`)
      return Promise.resolve(data);
    } else {
      return Promise.reject('error in data')
    }
  } else {
    return Promise.reject(response.status.toString())
  }
};


const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const userContext = React.useContext(UserContext);
  //const { setAuth } = React.useContext(AuthContext);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log('event children:', event.currentTarget)

    // const data = new FormData(event.currentTarget);
    // console.log('test',{
    //   'email': data.get('email')?.toString(),
    //   'password': data.get('password')?.toString(),
    // })
    // var email = data.get('email');
    // var password = data.get('password')?.toString();
    try {
      const response = await signIn({ email : email, password: password});

      // const instance = axios.create({
      //   baseURL: 'http://localhost:7182/api/',
      // });

      // const response = await fetch({
      //   method: 'post',
      //   url: 'http://localhost:7182/api/users',
      //   body: {
      //     email: data.get('email'), 
      //     password: data.get('password')
      //   }
      // });
      // const response = await axios('http://localhost:7182/api/users', 
        // JSON.stringify({
        //   email: data.get('email'), 
        //   password: data.get('password')
        // })
        // , {
        //   headers: { 'Content-Type': 'application/json' },
        //   //withCredentials: true 
        // }
      // );
     // console.log(JSON.stringify(response?.data));
      console.log('response', JSON.stringify(response));

      userContext?.setUser({
        email: email,
        name: email
      })
      // const user: User = {
      //   firstName: response?.data?.firstName,
      //   lastName: response?.data?.lastName,
      //   email: response?.data?.email
      // }
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // const pwd = data.get('password');
      // userContext.({ user, pwd, roles, accessToken });

    } catch(err) {
      reportError({message: getErrorMessage(err)})
      // if (!err?.response) {
      //   console.error('No Server Response');
      // } else if (err.response?.status === 400) {
      //   console.error('missing info')
      // } else if (err.response?.status === 401) {
      //   console.error('unauthorized');
      // } else {
      //   console.error('login failed')
      // }
    }    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => { setEmail(e.currentTarget.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => { setPassword(e.currentTarget.value)}}

              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to='home'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;