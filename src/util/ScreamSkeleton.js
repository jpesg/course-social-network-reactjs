import React, { Fragment } from "react";
import PropTypes from "prop-types";
import NoImg from "../images/no-img.png";
import { Card, CardMedia, CardContent, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  ...theme,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    width: 100,
    height: 14,
    backgroundColor: "rgba(0,0,0,0.4)",
    marginBottom: 10,
  },
  defaultLine: {
    width: "90%",
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
  halfLine: {
    width: "50%",
    height: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 7,
  },
});

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card key={index} className={classes.card}>
      <CardMedia className={classes.cover} imgae={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{fragment}</Fragment>;
};
ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
