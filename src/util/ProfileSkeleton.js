import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImage from '../images/NoImage.png';

// MUI Stuff
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  paper: {
    width: 300,
    padding: 20
  },
  username: {
    height: 20,
    backgroundColor: '#00bcd4',
    width: 60,
    margin: '0, auto, 7px, auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '50%',
    marginBottom: 10
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  ImageWrapper: {
    textAlign: "center",
    position: "relative",
    "& button": {
      position: "absolute",
      top: "80%",
      left: "70%"
    }
  },
  profileDetails: {
    textAlign: "center",
    verticalAlign: "middle",
    "& span, svg": {
      textAlign: "center",
      verticalAlign: "middle"
    },
    "& a": {
      color: theme.palette.primary.main
    }
  },
  "& hr": {
    border: "none",
    margin: "0 0 10px 0"
  },
})

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.ImageWrapper}>
          <img src={NoImage} alt='Profile' className={classes.profileImage} />
        </div>
        <hr className={classes.invisibleSeparator} />
        <div className={classes.profileDetails}>
          <div className={classes.username} />
          <hr className={classes.invisibleSeparator} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr className={classes.invisibleSeparator} />
          <LocationOn color='primary' /> <span>Location</span>
          <hr className={classes.invisibleSeparator} />
          <LinkIcon color='primary' /> https://twitter.com
          <hr className={classes.invisibleSeparator} />
          <CalendarToday color='primary' /> Joined date
        </div>
      </div>
    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
