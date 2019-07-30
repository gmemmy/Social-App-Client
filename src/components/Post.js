import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import CustomButton from "../util/customButton";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux Stuff
import { connect } from "react-redux";
import { likeAPost, unlikeAPost } from "../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    minHeight: 100,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
};

class Post extends Component {
  // Checks if a user has liked a post
  alreadyLikedPost = () => {
    const {
      user: { likes },
      post
    } = this.props;
    if (likes && likes.find(like => like.postId === post.postId)) {
      return true;
    } else return false;
  };
  // Enables a user like a post
  likePost = () => {
    this.props.likeAPost(this.props.post.postId);
  };
  // Enables a user to unlike a post
  unlikePost = () => {
    this.props.unlikeAPost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, username, likeCount, commentCount },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <CustomButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </CustomButton>
    ) : this.alreadyLikedPost() ? (
      <CustomButton tip="undo like" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            component={Link}
            to={`/users/${username}`}
            color="primary"
          >
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>
            {likeCount === 1 ? `${likeCount} Like` : `${likeCount} Likes`}{" "}
          </span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>
            {commentCount === 1
              ? `${commentCount} Comment`
              : `${commentCount} Comments`}{" "}
          </span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likeAPost: PropTypes.func.isRequired,
  unlikeAPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeAPost,
  unlikeAPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
