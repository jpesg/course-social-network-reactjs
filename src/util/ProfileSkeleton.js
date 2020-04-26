import React, { Fragment } from "react";
import PropTypes from "prop-types";
import NoImg from "../images/no-img.png";
import { Paper, CardMedia, CardContent, withStyles } from "@material-ui/core";
import {
  EditIcon,
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";
const styles = (theme) => ({
  ...theme,

  handle: {
    width: 60,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    margin: "0px auto 7px auto",
  },
  fullLine: {
    width: "100%",
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
  halfLine: {
    width: "50%",
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={"image-wrapper"}>
          <img src={NoImg} alt="profile" className={"profile-imgae"} />
        </div>
        <hr />
        <div className={"profile-details"}>
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
          <hr />
          <LocationOn color="primary" />
          <span>Location</span>
          <hr />
          <LinkIcon color="primary" />
          https://website.com
          <hr />
          <CalendarToday color="primary" />
          Joined date
        </div>
      </div>
    </Paper>
  );
};
ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
