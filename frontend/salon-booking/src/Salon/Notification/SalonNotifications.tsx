import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotificationBySalonId,
  notificationSelector,
} from "../../Redux/reducers/notificationReducer";
import store from "../../Redux/store";
import {
  getSalonByOwnerId,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import SalonNotificationsCard from "./SalonNotificationsCard";

type Props = {};

function Notifications({}: Props) {
  // const dispatch = useDispatch<typeof store.dispatch>();
  const { notifications } = useSelector(notificationSelector);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
  //   }
  // }, []);
  // const { salon } = useSelector(salonSelector);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt") && salon)
  //     dispatch(
  //       getAllNotificationBySalonId({
  //         jwtToken: localStorage.getItem("jwt")!,
  //         salonId: salon.id,
  //       })
  //     );
  // }, [salon]);

  return (
    <div className="px-5 md:flex flex-col items-center mt-10 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold py-5">Notifications</h1>
      </div>
      <div className="space-y-4 md:w-[35rem] ">
        {notifications.map((notification) => (
          <SalonNotificationsCard
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
