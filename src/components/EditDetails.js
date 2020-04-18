import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import {
  Tooltip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { EditIcon } from "@material-ui/icons";
const styles = (theme) => ({
  ...theme,
  button: {
    float: "right",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    };

    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip tile="edit details">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholde="shor bio"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholde="web site"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholde="location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classess: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
