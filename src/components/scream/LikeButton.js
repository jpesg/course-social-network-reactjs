import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MyButton from "../../util/MyButton";

class LikeButton extends PureComponent {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    ) {
      return true;
    }
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  likeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };

  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tipe="undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tipe="like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.stringg.isRequired,
  classess: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
