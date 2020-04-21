import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayJs from "dayJs";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { AddIcon, Close, UnfoldMore } from "@material-ui/icons";
import MyButton from "../util/MyButton";

const styles = (theme) => ({
  ...theme,
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography color="textSecondary" variant="body2">
            {dayJs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <React.Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
ScreamDialog.propTypes = {
  getScream: Proptypes.func.isRequired,
  screamId: Proptypes.string.isRequired,
  userHandle: Proptypes.string.isRequired,
  scream: Proptypes.object.isRequired,
  ui: Proptypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  scream: state.data.scream,
  ui: state.ui,
});
const mapActionsToProps = {
  getScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
