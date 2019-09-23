import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// MUI Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/ToolTip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Reduc Stuff
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
	state = {
		anchorEl: null
  };
  
  handleOpen = (event) => {
     this.setState({ anchorEl: event.target })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  onMenuOpened = () => {
     let unreadNotificationIds = this.props.notifications
     .filter(notification => !notification.read)
     .map(notification => notification.notificationId);
    this.props.markNotificationsRead(unreadNotificationIds);
  }
  
	render() {
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		dayjs.extend(relativeTime);

		let notificationsIcon;
		if (notifications && notifications.length > 0) {
			notifications.filter(notification => notification.read === false).length >
			0
				? (notificationsIcon = (
						<Badge
							badgeContent={
								notifications.filter(
									notification => notification.read === false
								).length
							}
							color="secondary"
						>
							<NotificationsIcon />
						</Badge>
				  ))
				: (notificationsIcon = <NotificationsIcon />);
		} else {
			notificationsIcon = <NotificationsIcon />;
		}

		let notificationsMarkUp =
			notifications && notifications.length > 0 ? (
				notifications.map(notification => {
					const verb = notification.type === "like" ? "liked" : "commented on";
					const time = dayjs(notification.createdAt).fromNow();
					const iconColor = notification.read ? "primary" : "secondary";
					const icon =
						notification.type === "like" ? (
							<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
						) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
						);

					return (
						<MenuItem key={notification.createdAt} onClick={this.handleClose}>
							{icon}
							<Typography
								component={Link}
								color="default"
								variant="body1"
								to={`/users/${notification.recipient}/post/${notification.postId}`}
							>
                {notification.sender} {verb} your post {time}
              </Typography>
						</MenuItem>
					);
				})
			) : (
				<MenuItem onClick={this.handleClose}>
					You have no notifications yet
				</MenuItem>
			);

		return (
			<Fragment>
				<ToolTip placement="top" title="Notifications">
					<IconButton
						aria-owns={anchorEl ? "simple-menu" : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						{notificationsIcon}
					</IconButton>
				</ToolTip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpened}
				>
					{notificationsMarkUp}
				</Menu>
			</Fragment>
		);
	}
}

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	notifications: state.user.notifications
});

export default connect(
	mapStateToProps,
	{ markNotificationsRead }
)(Notifications);
