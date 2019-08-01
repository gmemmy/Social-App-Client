import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import CustomButton from "../util/customButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux Stuff
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    left: '90%',
    top: '10%',
    position: 'absolute'
  }
};

class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CustomButton
          tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this post?
            </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapActionsToProps = { deletePost };

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeletePost));
