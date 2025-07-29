import React, { useEffect } from "react";
import EarningChart from "./chart/EarningChart";
import ReportCard from "./ReportCard";
import { AccountBalance } from "@mui/icons-material";
import BookingChart from "./chart/BookingChart";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import { bookingSelector } from "../../Redux/reducers/bookingReducer";
import { getSalonReport } from "../../Redux/reducers/bookingReducer";
import { userSelector } from "../../Redux/reducers/userReducer";

type Props = {};

function SalonDashboardHomePage({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { authUser } = useSelector(userSelector);

  useEffect(() => {
    if (authUser)
      dispatch(getSalonReport({ jwtToken: localStorage.getItem("jwt")! }));
  }, [authUser]);
  const { salonReport } = useSelector(bookingSelector);
  return (
    <div className="space-y-5">
      <div className="lg:flex gap-5">
        <div className="space-y-10 rounded-md w-full lg:w-[70%]">
          <div className="border border-gray-200 rounded-lg p-5 w-full">
            <h1 className="text-lg font-bold pb-5 text-gray-600">
              Total Revenue
            </h1>
            <EarningChart />
          </div>
        </div>
        <section className="space-y-5 w-full lg:w-[30%]">
          <ReportCard
            icon={<AccountBalance />}
            value={"Rs" + salonReport?.totalEarnings}
            title={"Total Earnings"}
          />

          <ReportCard
            icon={<AccountBalance />}
            value={salonReport?.totalBookings}
            title={"Total Bookings"}
          />

          <ReportCard
            icon={<AccountBalance />}
            value={"Rs" + salonReport?.totalRefund}
            title={"Total Refunds"}
          />

          <ReportCard
            icon={<AccountBalance />}
            value={salonReport?.cancelledBookings}
            title={"Cancelled Bookings"}
          />
        </section>
      </div>
      <div className="space-y-10 rounded-md w-full">
        <div className="border border-gray-200 rounded-lg p-5 w-full">
          <h1 className="text-lg font-bold pb-5 text-gray-600">
            Total Booking
          </h1>
          <BookingChart />
        </div>
      </div>
    </div>
  );
}

export default SalonDashboardHomePage;
