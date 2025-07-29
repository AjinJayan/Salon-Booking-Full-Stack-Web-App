import React, { useEffect } from "react";
import ProfileFieldCard from "./ProfileFieldCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../Redux/reducers/authReducer";
import { userSelector } from "../../Redux/reducers/userReducer";
import store from "../../Redux/store";
import { getUser } from "../../Redux/reducers/userReducer";
import {
  getSalonByOwnerId,
  salonSelector,
} from "../../Redux/reducers/salonReducer";

type Props = {};

function Profile({}: Props) {
  // const dispatch = useDispatch<typeof store.dispatch>();

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
  //     dispatch(getUser({ jwtToken: localStorage.getItem("jwt")! }));
  //   }
  // }, []);
  const { salon } = useSelector(salonSelector);
  const { authUser } = useSelector(userSelector);

  return (
    <div className="lg:px-20 lg:pb-10 space-y-20">
      <div className="w-full lg:w-[70%]">
        <h1 className="font-bold text-5xl pb-5">{salon?.name}</h1>
        <section className="grid grid-col-2 gap-3">
          <div className="col-span-2">
            <img
              className="w-full rounded-md object-cover h-[15rem]"
              src={salon?.images![0]}
              alt=""
            />
          </div>
          <div className="col-span-1">
            <img
              className="w-full rounded-md object-cover h-[15rem]"
              src={salon?.images![1]}
              alt=""
            />
          </div>

          <div className="col-span-1">
            <img
              className="w-full rounded-md object-cover h-[15rem]"
              src={salon?.images![2]}
              alt=""
            />
          </div>
        </section>
      </div>
      <div className="mt-10 lg:w-[70%] ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Salon Details</h1>
        </div>
        <div>
          <ProfileFieldCard value={salon?.name} keys="salon name" />
          <Divider />
          <ProfileFieldCard value={salon?.address} keys="salon address" />
          <Divider />
          <ProfileFieldCard value={salon?.openTime} keys="open time" />
          <Divider />
          <ProfileFieldCard value={salon?.closeTime} keys="close time" />
        </div>
      </div>

      <div className="mt-10 lg:w-[70%] ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Owner Details</h1>
        </div>
        <div>
          <ProfileFieldCard value={authUser?.fullName} keys="owner name" />
          <Divider />
          <ProfileFieldCard value={authUser?.email} keys="email" />
          <Divider />
          <ProfileFieldCard value={authUser?.role} keys="role" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
