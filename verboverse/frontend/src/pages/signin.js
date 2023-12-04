import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { me, signin } from '../services/userApiService.js';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useCookies } from "react-cookie";

const defaultTheme = createTheme();

export default function SignIn() {
  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await signin(data.get('email'), data.get('password'));

    if (response.success) {
        const receivedToken = response.token;
        setCookie('token', receivedToken);
        const user = await me(cookies.token);
        directToHome();
        toast.success("Successfully signed in! ");
    } else {
        toast.error('Failed to sign in!');
    }
  };

  const navigate = useNavigate();
  const redirectToAnotherPage = () => {
    navigate('/signup');
  };

  const directToHome = async () => {
    navigate('/home');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              </Grid>
              <Grid item>
                <Button onClick={redirectToAnotherPage}>Don't have an account? Sign Up</Button>

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
      </Container>
    </ThemeProvider>
  );
}