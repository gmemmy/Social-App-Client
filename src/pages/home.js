import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Post from "../components/Post";
import Profile from "../components/Profile";

class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        this.setState({
          posts: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map(post => <Post post={post} key={post.postId} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;
