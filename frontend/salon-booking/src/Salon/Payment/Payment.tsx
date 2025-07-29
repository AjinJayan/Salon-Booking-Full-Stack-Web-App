import { Card, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  bookingSelector,
  getSalonReport,
} from "../../Redux/reducers/bookingReducer";

type Props = {};

function Payment({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    if (localStorage.getItem("jwt"))
      dispatch(getSalonReport({ jwtToken: localStorage.getItem("jwt")! }));
  }, []);
  const { salonReport } = useSelector(bookingSelector);

  return (
    <div className="">
      <div className="lg:w-[70%]">
        <Card className="rounded-md space-y-4 p-5">
          <h1 className="text-gray-600 font-medium">Total Earning</h1>
          <h1 className="font-bold text-xl pb-1">
            &#8377;{salonReport?.totalEarnings}
          </h1>
          <Divider />
          <p>
            Last Payment: <strong>&#8377;0</strong>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Payment;
