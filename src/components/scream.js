import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  image: {
    minWidth: 200
  }
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
      body
    }
  } = props;

  dayjs.extend(relativeTime);

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
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
