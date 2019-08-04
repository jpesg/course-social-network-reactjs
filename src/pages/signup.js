import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AppIcon from "../images/icon.png";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { TextField, Grid, Button, CircularProgress } from "@material-ui/core";

const styles = theme => ({
  ...theme.styles
});

export class SingUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        console.log("signup:", res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push("/"); //redirect to home page
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    console.log(errors);
    return (
      <Grid className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey image" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password : ""}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword ? errors.confirmPassword : ""}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              error={errors.handle ? true : false}
              helperText={errors.handle ? errors.handle : ""}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              varient="contained"
              color="primary"
              className="classes.button"
              disabled={loading}
            >
              Sign up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>

            <br />
            <small>
              already have an account? login<Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
SingUp.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SingUp);
