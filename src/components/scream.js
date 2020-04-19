import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import DeleteScream from "./DeleteScream";
import MyButton from "../util/MyButton";

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
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    }
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  likeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

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
  const likeButton = !authenticated ? (
    <MyButton tip="like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : this.likedScream() ? (
    <MyButton tipe="undo like" onClick={this.unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tipe="like" onClick={this.likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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

        {likeButton}
        <span>{likeCount} Likes</span>

        <MyButton tip="comments">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{comentCount} comments</span>
      </CardContent>
    </Card>
  );
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classess: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
