import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import CustomButton from "../../util/customButton";
import DeletePost from "./DeletePost";
import PostDetails from "./PostDetails";
import LikeButton from "./LikeButton";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux Stuff
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 170,
    minHeight: 100,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        username,
        postId,
        likeCount,
        commentCount
      },
      user: { authenticated }
    } = this.props;

    const deleteButton =
      authenticated && username === this.props.user.credentials.username ? (
        <DeletePost postId={postId} />
      ) : null;

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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <Fragment />
          <LikeButton postId={postId} />
          <span>
            {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}{" "}
          </span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span> 
            {commentCount === 1
              ? `${commentCount} comment`
              : `${commentCount} comments`}{" "}
          </span>
          <PostDetails postId={postId} username={username} openDialog={this.props.openDialog} />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
