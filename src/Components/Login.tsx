import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from './Auth/AuthContext';
import { getErrorMessage } from '../Errors';
import { useState } from 'react';
import Copyright from './Common/Copyright';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();

export interface LoginResponse {
  message: string,
  isAuthenticated: boolean,
  username: string,
  email: string,
  name: string,
  token: string,
  roles: string[]
}

const signIn = async ({ email, password }: { email: string, password: string }): Promise<LoginResponse> => {
  const response = await fetch('http://webapp-books-api:5000/api/users/login', {
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
  const res = JSON.parse(data) as LoginResponse;

  if (response.ok) {
    if (res) {
      console.log(`signin response data: ${res}`)
      return Promise.resolve(res);
    } else {
      return Promise.reject('error in data');
    }
  } else {
    return Promise.reject(response.status.toString())
  }
};

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleError = (message:string) => {
    console.log(message)
    setError(message);
    setOpen(true);
  }

  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn({ email : email, password: password})
        .then((response) => {
          console.log('login response', response);
          if (response.isAuthenticated) {
            userContext?.setUser({
              email: response.email,
              token: response.token,
              name: response.name
            })
            navigate('../')
          } else {
            handleError(response.message)
          }
        })
    } catch(err) {
      reportError({message: getErrorMessage(err)})
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
              <Collapse in={open}>
                  <Alert
                    severity='error'
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {error}
                  </Alert>
                </Collapse>
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