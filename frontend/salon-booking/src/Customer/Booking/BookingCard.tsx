import { ArrowRightAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Booking } from "../../Redux/reducers/bookingReducer";

type Props = {
  booking: Booking;
};

function BookingCard({ booking }: Props) {
  return (
    <div className="p-5 rounded-md bg-slate-100 md:flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{booking.salonDto.name}</h1>
        <div>
          {booking.serviceDtos.map((service) => (
            <li key={service.id}>{service.name}</li>
          ))}
        </div>
        <div>
          <p>
            Time & Date <ArrowRightAlt /> {booking.startTime?.split("T")[0]}
          </p>
          <p>
            {booking.startTime?.split("T")[1]} To{" "}
            {booking.endTime?.split("T")[1]}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <img className="h-28 w-28" src={booking.salonDto.images![0]} alt="" />
        <p className="text-center">&#8377;{booking.totalPrice}</p>
        <Button
          color={
            booking.bookingStatus === "CONFIRMED"
              ? "success"
              : booking.bookingStatus === "PENDING"
              ? "warning"
              : "error"
          }
          variant="contained"
        >
          {booking.bookingStatus}
        </Button>
      </div>
    </div>
  );
}

export default BookingCard;
