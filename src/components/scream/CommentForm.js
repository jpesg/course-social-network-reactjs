import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

import CommentForm from "./CommentForm";
import { Button, TextField, Grid } from "@material-ui/core";

const styles = (theme) => ({
  ...theme,
});

class CommentForm extends Component {
  static propTypes = {
    submitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    screamId: PropTypes.string.isRequired,
  };

  state = {
    body: "",
    errors: {},
  };
  componentDidUpdate(prevProps) {
    if (prevProps.ui.errors !== this.props.ui.errors && this.props.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }

    if (
      prevProps.ui.errors !== this.props.ui.errors &&
      !this.props.ui.errors &&
      !this.props.ui.loading
    ) {
      this.setState({ body: "" });
    }
  }
  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.postComment(this.props.screamId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={ErrorSharp.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleOnchange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}
const mapStateToProps = (state) => ({
  ui: state.ui,
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
