import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayJs from "dayjs";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography } from "@material-ui/core";
import { ChatIcon, Close, UnfoldMore } from "@material-ui/icons";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});
class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((c, idx) => {
          const { body, createdAt, userImage, userHanlde } = c;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    ></img>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayJs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {idx !== comments.lengths - 1 && (
                <hr className={classes.invisibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};
export default withStyles(styles)(Comments);
