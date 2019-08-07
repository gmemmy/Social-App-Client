import React, { Component } from "react";
import { Link } from "react-router-dom/";
import PropTypes from "prop-types";
import CustomButton from "../../util/customButton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeAPost, unlikeAPost } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  // Checks if a user has liked a post
  alreadyLikedPost = () => {
    const {
      user: { likes }
    } = this.props;
    if (likes && likes.find(like => like.postId === this.props.postId)) {
      return true;
    } else return false;
  };
  // Enables a user like a post
  likePost = () => {
    this.props.likeAPost(this.props.postId);
  };
  // Enables a user to unlike a post
  unlikePost = () => {
    this.props.unlikeAPost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <CustomButton tip="like">
          <FavoriteBorder color="primary" />
        </CustomButton>
      </Link>
    ) : this.alreadyLikedPost() ? (
      <CustomButton tip="undo like" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likeAPost: PropTypes.func.isRequired,
  unlikeAPost: PropTypes.func.isRequired
};

const mapActionsToProps = {
  likeAPost,
  unlikeAPost
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
