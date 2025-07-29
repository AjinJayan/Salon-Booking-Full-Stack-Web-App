import { Card } from "@mui/material";
import React from "react";
import { NotificationsActive } from "@mui/icons-material";
import {
  markNotificationAsRead,
  Notification,
  notificationActions,
} from "../../Redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import store from "../../Redux/store";
import { useNavigate } from "react-router-dom";

type Props = {
  notification: Notification;
};

function NotificationsCard({ notification }: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const handleClick = (notification: Notification) => {
    if (!notification.isRead) {
      dispatch(
        markNotificationAsRead({
          notificationId: notification.id!,
          jwtToken: localStorage.getItem("jwt")!,
        })
      );
    }
    navigate("/myBookings");
  };
  return (
    <Card
      onClick={() => handleClick(notification)}
      sx={{ bgcolor: `${notification.isRead ? "white" : "#F0FFFF"}` }}
      className="cursor-pointer p-5 flex items-center gap-5"
    >
      <NotificationsActive />
      <div>
        <p>{notification.description}</p>
        <h1 className="space-x-3">
          {notification.booking.serviceDtos.map((service) => (
            <span key={service.id}>{service.name}</span>
          ))}
        </h1>
      </div>
    </Card>
  );
}
export default NotificationsCard;
