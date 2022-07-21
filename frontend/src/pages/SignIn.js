import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, provider } from "../FirebaseConfig";
import { signInWithRedirect } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import Logo200 from '../TT_200.png';

/**
 * This is the SignIn page where users can sign in with their Google account.
 */

const theme = createTheme();

class SignIn extends React.Component {

  handleGoogleSubmit = (event) => {
    event.preventDefault();
    signInWithRedirect(auth, provider);
  }

  render() {

    return (
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logo200} />
            <Typography component="h1" variant="h4" mb={0} mt={0} fontWeight="bold">
              Welcome to TimeTrackingApp!
            </Typography>
            <Typography component="h1" variant="h4" mb={4} mt={0}>
              The easiest way to keep track of your time.
            </Typography>
            <Typography component="h1" variant="h6" mb={3} fontStyle="italic" color="text.secondary">
              To continue, please sign in with your Google account.
            </Typography>
            <Button type="button" size="large" variant="contained" onClick={this.handleGoogleSubmit} sx={{ mt: "center", mb: "center" }} startIcon={<GoogleIcon />}>
              Sign in
            </Button>
          </Box>
        </Container>
      </ThemeProvider >
    );
  }
}

export default SignIn;
