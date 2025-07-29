import React, { useEffect, useRef, useState } from "react";
import NotificationsCard from "./NotificationsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotificationByUserId,
  notificationActions,
  notificationSelector,
} from "../../Redux/reducers/notificationReducer";
import store from "../../Redux/store";
import { userSelector } from "../../Redux/reducers/userReducer";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

// import SockJS from "sockjs-client/dist/sockjs.min.js";
// import useNotificationWebsocket from "../../util/useNotificationWebsocket";
// import { Client } from "@stomp/stompjs";

type Props = {};

function Notifications({}: Props) {
  // const dispatch = useDispatch<typeof store.dispatch>();
  // const { authUser } = useSelector(userSelector);
  const { notifications } = useSelector(notificationSelector);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt") && authUser)
  //     dispatch(
  //       getAllNotificationByUserId({
  //         jwtToken: localStorage.getItem("jwt")!,
  //         userId: authUser.id,
  //       })
  //     );
  // }, [authUser]);

  // realtime notifications

  // useEffect(() => {
  //   // Replace with your WebSocket server URL
  //   if (authUser && localStorage.getItem("jwt")) {
  //     socketRef.current = new WebSocket(
  //       "http://localhost:8087/api/notifications/ws"
  //     );

  //     socketRef.current.onopen = () => {
  //       console.log("WebSocket connection opened");
  //     };

  //     socketRef.current.onmessage = (event) => {
  //       // setMessages((prev) => [...prev, event.data]);
  //       console.log(event.data);
  //     };

  //     socketRef.current.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };

  //     socketRef.current.onclose = () => {
  //       console.log("WebSocket connection closed");
  //     };

  //     return () => {
  //       socketRef.current?.close();
  //     };
  //   }
  // }, [authUser]);
  return (
    <div className="px-5 md:flex flex-col items-center mt-10 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold py-5">Notifications</h1>
      </div>
      <div className="space-y-4 md:w-[35rem] ">
        {notifications.map((notification) => (
          <NotificationsCard
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
