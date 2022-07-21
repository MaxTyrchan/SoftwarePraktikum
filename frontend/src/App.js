import React from "react";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import Theme from "./Theme";
import { auth, PUBLIC_URL } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from "react-router-dom";
import ContextErrorMessage from "./components/dialogs/ContextErrorMessage";
import { Dashboard, Members, Projects, Tasks, SignIn, ReportingPerson, ReportingProject } from "./pages";
import Header from "./layout/Header";
import LoadingProgress from "./components/helpers/LoadingProgress";

import API from './api/API';
import PersonBO from './api/PersonBO';

const Error404 = () => <h1>404 – Seite nicht gefunden</h1>;
class App extends React.Component {
  constructor(props) {
    super(props);

    // used to prevent a second call of onAuthStateChanged listener at registration
    this.authFlag = false;

    // Init an empty state
    this.state = {
      currentUser: null,
      currentPerson: null,
      appError: null,
      authError: null,
      authLoading: false,
    };
  }

  // handles the sign in of an user and sets the current User in the State
  handleSignIn = (user) => {
    this.setState({
      currentUser: user,
      authLoading: true,
    });
  }

  // Funcktion which gets called after the App.js Component did mount.
  // It gets the Token from the User and 
  componentDidMount() {
    auth.languageCode = "en";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // The user is signed in
        this.setState({
          authLoading: true,
        });
        if (this.authFlag === false) {
          this.authFlag = true;
          user.getIdToken()
            .then((token) => {
              // Add the token to the browser's cookies. The server will then be
              // able to verify the token against the API.
              // SECURITY NOTE: As cookies can easily be modified, only put the
              // token (which is verified server-side) in a cookie; do not add other
              // user information.
              document.cookie = `token=${token}; path=/`;

              // Check if user was already added to the system
              API.getAPI().getPersonbyGoogleId(user.uid)
                .then((person) => {
                  if (person.getId() === null) {
                    // Person could not be found in the system
                    // We should never come to this point as the backend should have created a new person object with the request above

                    // Add the user to the system
                    let firstName = user.displayName.split(" ")[0];
                    let lastName = user.displayName.split(" ")[1];
                    // Check for empty user name
                    if (!firstName) {
                      firstName = "";
                    }
                    if (!lastName) {
                      lastName = "";
                    }
                    let newPerson = new PersonBO(user.uid, firstName, lastName, user.email);
                    API.getAPI().addPerson(newPerson)
                      .then((retrievedPerson) => {
                        // Set the user not before the token arrived
                        this.setState({
                          currentUser: user,
                          currentPerson: retrievedPerson,
                          authError: null,
                          authLoading: false,
                        });
                      })
                  } else {
                    // person is already known to the system
                    this.setState({
                      currentUser: user,
                      currentPerson: person,
                      authError: null,
                      authLoading: false,
                    });
                  }
                })


            })
            .catch((e) => {
              this.setState({
                authError: e,
                authLoading: false,
              });
            });
        }
      } else {
        // User has logged out, so clear the id token
        document.cookie = "token=;path=/";

        // Set the logged out user to null
        this.setState({
          currentUser: null,
          authLoading: false,
        });
      }
    });
  }

  /** Renders the app */
  render() {
    const { currentUser, appError, authError, authLoading, currentPerson } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router>
          <Container style={{ marginTop: "80px", alignItems: "center" }} maxWidth={false}>
            <Header currentUser={currentUser} />

            <Routes>
              <Route path={PUBLIC_URL}>
                <Route path={PUBLIC_URL + "/"} element={
                  // Redirect if the main URL gets called and user is signed in
                  currentUser ? (
                    <Navigate to={PUBLIC_URL + "/dashboard"} />
                  ) : (
                    <SignIn onSignIn={this.handleSignIn} />
                  )} />

                <Route path={PUBLIC_URL + "/*"} element={
                  // Firebase redirects to index.html
                  // Redirect if the user is signed in
                  currentUser ? (
                    <Navigate to={PUBLIC_URL + "/dashboard"} />
                  ) : (
                    <SignIn onSignIn={this.handleSignIn} />
                  )} />

                <Route exact path={PUBLIC_URL + "/dashboard"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><Dashboard currentPerson={currentPerson} /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/projects"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><Projects currentPerson={currentPerson} /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/tasks"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><Tasks currentPerson={currentPerson} /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/members"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><Members currentPerson={currentPerson} /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/reporting-person"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><ReportingPerson /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/reporting-project"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <Secured user={currentUser}><ReportingProject /></Secured>)} />

                <Route exact path={PUBLIC_URL + "/signin"} element={authLoading ? (
                  <LoadingProgress show={authLoading} />
                ) : (
                  <SignIn onSignIn={this.handleSignIn} />)} />

                <Route exact path={PUBLIC_URL + "*"} component={Error404} />
              </Route>
            </Routes>
            <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
            <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
          </Container>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;

/**
 * Helper Component to wrap other Components, which shall only be accessed by a logged in user.
 *
 * @param {props} The React props
 * @returns
 */
function Secured(props) {
  let location = useLocation();

  if (!props.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={PUBLIC_URL + "/index.html"} state={{ from: location }} replace />;
  }

  return props.children;
}