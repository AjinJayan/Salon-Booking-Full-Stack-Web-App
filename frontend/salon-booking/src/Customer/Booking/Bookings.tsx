import React, { useEffect } from "react";
import BookingCard from "./BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { bookingSelector } from "../../Redux/reducers/bookingReducer";
import store from "../../Redux/store";
import { getAllBookingsByUserId } from "../../Redux/reducers/bookingReducer";

type Props = {};

function Bookings({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    if (localStorage.getItem("jwt"))
      dispatch(
        getAllBookingsByUserId({ jwtToken: localStorage.getItem("jwt")! })
      );
  }, []);
  const { bookings } = useSelector(bookingSelector);

  return (
    <div className="px-5 md:flex flex-col items-center mt-10 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold py-5">My Bookings</h1>
      </div>
      <div className="space-y-4 md:w-[35rem] ">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;
