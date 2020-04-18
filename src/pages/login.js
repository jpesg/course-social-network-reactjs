import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AppIcon from "../images/icon.png";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { TextField, Grid, Button, CircularProgress } from "@material-ui/core";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
const styles = (theme) => ({
  ...theme.styles,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ui.errors !== this.props.ui.errors && this.props.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const {
      classes,
      ui: { loading /*errors*/ },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey image" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email ? errors.email : ""}
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
              error={errors && errors.password ? true : false}
              helperText={errors && errors.password ? errors.password : ""}
            />
            {errors && errors.general && (
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>

            <br />
            <small>
              dont have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData, history) => dispatch(loginUser(userData, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
