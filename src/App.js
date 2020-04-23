//9:25 navbar
//9:50
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./pages/home";
import User from "./pages/user";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/layout/NavBar";
import AuthRoute from "./util/AuthRoute";

import "./App.css";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import themeStyles from "./util/theme";
import jwtDecode from "jwt-decode";

import { SET_AUTHENTICATE, SET_ERRORS } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme(themeStyles);
const token = localStorage.FBIdToken;

//let authenticated;

if (token) {
  //decode token
  const decodedToken = jwtDecode(token);
  console.log("decoded token", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //authenticated = false;
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    // authenticated = true;
    store.dispatch({ type: SET_AUTHENTICATE });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/signup"
                  component={SignUp}
                  // authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  //authenticated={authenticated}
                />
                <Route exact path="/user/:handle" component={User} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
