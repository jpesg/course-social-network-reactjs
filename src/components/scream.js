import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ChatIcon from "@material-ui/icons/Chat";
import ScreamDialog from "./ScreamDialog";
import DeleteScream from "./DeleteScream";
import MyButton from "../util/MyButton";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  image: {
    minWidth: 200,
  },
};

function Scream(props) {
  const {
    classes,
    scream: {
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
      createdAt,
      body,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>

        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>

        <MyButton tip="comments">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{comentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classess: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
