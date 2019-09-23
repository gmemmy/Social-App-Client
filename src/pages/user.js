import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import StaticProfile from '../components/profile/StaticProfile';
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class User extends Component {
  state = {
    profile: null,
    postIdParam: null
  };
  componentDidMount() {
    const username = this.props.match.params.username;
    const postId = this.props.match.params.postId;

    if(postId) this.setState({ postIdParam: postId });
    this.props.getUserData(username);
    axios
      .get(`/user/${username}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <p>Loading data...</p>
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      posts.map(post => {
        if(post.postId !== postIdParam)
        return <Post key={post.postId} post={post} />
        else return <Post key={post.postId} post={post} openDialog />
      })
    )
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
         {this.state.profile === null ? (
           <p>Loading Profile...</p>
          ) : <StaticProfile profile={this.state.profile} />
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
