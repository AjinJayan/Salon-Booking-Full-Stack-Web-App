import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { bookingSelector } from "../../../Redux/reducers/bookingReducer";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../Redux/store";
import { getEarningsChartData } from "../../../Redux/reducers/bookingReducer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { authSelector } from "../../../Redux/reducers/authReducer";
type Props = {};

const EarningChart = (props: Props) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { earningsChartData, isLoading } = useSelector(bookingSelector);
  const { jwt } = useSelector(authSelector);

  useEffect(() => {
    if (jwt) dispatch(getEarningsChartData({ jwtToken: jwt }));
  }, []);

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
          data={earningsChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="daily" />
          <YAxis dataKey="earnings" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
