import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { AddIcon, Close } from "@material-ui/icons";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});
class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ui.errors !== this.props.ui.errors && this.props.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }

    if (!this.props.ui.errors && !this.props.ui.laoding) {
      //todo bucle??
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {}, body: "" });
  };

  handleChange = (e) => {
    this.setState({ body: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  render() {
    // const { errors } = this.state;
    const {
      classes,
      ui: { loading, errors },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="post a scream!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          close={this.handleclose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            className={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogTitle>post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM"
                multiline
                rowa="3"
                placeholder="scream at your fellow apes"
                error={errors && errors.body ? true : false}
                helperText={
                  errors && errors.body ? ErrorOutlineSharp.body : null
                }
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};
const mapStateToProps = (state = {
  ui: state.ui,
});
export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
