import React, { Fragment } from "react";
import PropTypes from "prop-types";
import NoImage from "../images/NoImage.png";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  username: {
    width: 60,
    height: 18,
    backgroundColor: '#00bcd4',
    marginBottom: 7 
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 7
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10
  }
});

const PostSkeleton = props => {
	const { classes } = props;
	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.cover} image={NoImage} />
			<CardContent className={classes.cardContent}>
				<div className={classes.username} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	));

	return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
