import React, { Component } from "react";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayJs from "dayJs";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

import {
  Menu,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import {
  Notification as NotificationIcon,
  Favorite,
  Chat,
} from "@material-ui/icons";
import MyButton from "../../util/MyButton";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (e) => {
    this.setState({ anchorEl: e.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((n) => !n.read)
      .map((n) => n.notificationId);

    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const { notifications } = this.props;
    const anchorElement = this.state.anchorEl;

    let notificationIcon = <NotificationIcon />;
    if (notifications && notifications.length > 0) {
      notifications.filter((n) => n.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter((n) => n.read === false).length
              }
              color="secondary"
            >
              <NotificationIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationIcon />);
    }

    dayJs.extend(relativeTime);

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((n) => {
          const verb = n.type === "like" ? "liked" : "commented on";
          const time = dayjs(n.createdAt).fromNow();
          const iconColor = n.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <Favorite color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={n.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                varian="body1"
                ti={`/user/${n.recipient}/scream/${n.screamId}`}
              >
                {n.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          you have no notifications yet
        </MenuItem>
      );
    return (
      <React.Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorElement ? "simple-menu" : undefined}
            aria-haspopup="true"
            onCick={this.handleOpen}
          />
          {notificationIcon}
        </Tooltip>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </React.Fragment>
    );
  }
}
Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});
export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
