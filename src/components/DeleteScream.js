import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../util/MyButton";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { deleteScream } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};
class DeleteScream extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const { clasess, screamId, deleteScream } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="delete scream"
          onClikc={this.handleOpen}
          btnClassName={clasess.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete the scream?</DialogTitle>
          <DialogActions>
            <Button onClick={this.deleteScream} color="primary">
              delete
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  clasess: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};
export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
