import React, { Component } from "react";
import { Link } from "react-router-dom";
//MUI stuff
import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
