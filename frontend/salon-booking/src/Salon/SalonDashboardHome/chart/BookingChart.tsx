import React, { useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { getBookingsChartData } from "../../../Redux/reducers/bookingReducer";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../Redux/store";
import { bookingSelector } from "../../../Redux/reducers/bookingReducer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { userSelector } from "../../../Redux/reducers/userReducer";
type Props = {};

function BookingChart({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { bookingsChartData, isLoading } = useSelector(bookingSelector);
  const { authUser } = useSelector(userSelector);

  useEffect(() => {
    if (authUser)
      dispatch(
        getBookingsChartData({ jwtToken: localStorage.getItem("jwt")! })
      );
  }, [authUser]);

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div className="h-[40vh] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={bookingsChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="daily" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BookingChart;
