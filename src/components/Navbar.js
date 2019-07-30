import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "../util/customButton";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <CustomButton tip="Create a Post">
                <AddIcon />
              </CustomButton>
              <Link to="/"> 
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <CustomButton tip="Notifications">
                <Notifications />
              </CustomButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                SignUp
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Navbar);
