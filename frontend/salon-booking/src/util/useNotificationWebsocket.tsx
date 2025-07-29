import React, { useEffect, useState } from "react";
import { User } from "../Redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import store from "../Redux/store";
import { notificationActions } from "../Redux/reducers/notificationReducer";

import Stomp from "stompjs";

import SockJS from "sockjs-client/dist/sockjs.min.js";

type Props = {
  authUserId: number;
  type: "user" | "salon";
};

function useNotificationWebsocket({ authUserId, type }: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  // const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    // logic to connect frontend with backend
    if (authUserId && localStorage.getItem("jwt")) {
      const sock = new SockJS("http://localhost:8087/api/notifications/ws");
      const stomp = Stomp.over(sock);
      setStompClient(stomp);
    }
  }, [authUserId]);

  useEffect(() => {
    // logic to connect frontend with backend
    if (stompClient) {
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(
            `/notification/${type}/${authUserId}`,
            (message) => {
              const recivedNotification = JSON.parse(message.body);
              console.log(
                "received notification from server",
                recivedNotification
              );
              dispatch(
                notificationActions.addNotification(recivedNotification)
              );
            }
          );
        },
        (error) => console.log("subscription error", error)
      );
    }
  }, [stompClient]);
}

export default useNotificationWebsocket;
