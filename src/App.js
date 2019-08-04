//4:33:50
//6:35:00
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";

import "./App.css";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import themeStyles from "./util/theme";
import jwtDecode from "jwt-decode";

//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme(themeStyles);
const token = localStorage.FBIdToken;

let authenticated;

if (token) {
  //decode token
  const decodedToken = jwtDecode(token);
  console.log("decoded token", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
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
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
