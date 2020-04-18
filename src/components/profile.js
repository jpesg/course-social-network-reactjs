import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import EditDetails from "./EditDetails";
//MUI
import {
  Grid,
  Button,
  Paper,
  Link as MuiLink,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  EditIcon,
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  KeyboardReturn,
} from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.styles,
});

class Profile extends Component {
  handleImageChange = (e) => {
    const image = e.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append("image", image, image.name);

    this.props.uploadImage(formData);
  };

  handleEditpicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                hidden="hidden"
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
              />
              <Tooltip title="edit profile picture" placement="top">
                <IconButton onCicl={this.handleEditpicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>

                  <hr />
                </Fragment>
              )}
              {createdAt && (
                <Fragment>
                  <CalendarToday color="primary" />{" "}
                  <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                  <hr />
                </Fragment>
              )}
            </div>
            <Tooltip title="logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary"></KeyboardReturn>
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>loading</p>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = { logoutUser, uploadImage };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
