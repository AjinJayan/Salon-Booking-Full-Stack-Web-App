import * as React from "react";
import StarIcon from "@mui/icons-material/Star";
import { textFieldClasses } from "@mui/material";
import { Salon } from "../Redux/reducers/salonReducer";
export interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <div className="">
      <div className="w-56 md:w-80 rounded-md bg-slate-100">
        <img
          className="w-full h-[15rem] object-cover rounded-t-md"
          src={salon.images![0]}
          alt=""
        />
        <div className="p-5 space-y-2">
          <h1 className="font-bold">{salon.name}</h1>
          <div className="text-white text-sm p-1 bg-green-700 rounded-full w-14 flex item-center justify-center gap-1">
            4.5 <StarIcon sx={{ fontSize: "16px" }} />
          </div>
          <p>Professional haircut and ...</p>
          <p>{salon.address}</p>
        </div>
      </div>
    </div>
  );
}
