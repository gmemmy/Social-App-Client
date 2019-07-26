import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
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
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image="https://firebasestorage.googleapis.com/v0/b/social-app-d3eeb.appspot.com/o/no-img.png?alt=media"
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
