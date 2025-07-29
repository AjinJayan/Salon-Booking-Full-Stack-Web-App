import React, { useEffect } from "react";
import { salonSelector } from "../../Redux/reducers/salonReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../../Redux/store";
import { getSalonById } from "../../Redux/reducers/salonReducer";

export interface SalonDetailProps {}

export function SalonDetail(props: SalonDetailProps) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (id)
      dispatch(
        getSalonById({
          salonId: Number(id),
          jwtToken: localStorage.getItem("jwt")!,
        })
      );
  }, [id]);
  const { salon } = useSelector(salonSelector);

  return salon == null ? (
    <div>Loading...</div>
  ) : (
    <div className="space-y-5 mb-20">
      <section className="grid grid-col-2 gap-3">
        <div className="col-span-2">
          <img
            className="w-full rounded-md object-cover h-[15rem]"
            src={salon.images![0]}
            alt=""
          />
        </div>
        <div className="col-span-1">
          <img
            className="w-full rounded-md object-cover h-[15rem]"
            src={salon.images![1]}
            alt=""
          />
        </div>

        <div className="col-span-1">
          <img
            className="w-full rounded-md object-cover h-[15rem]"
            src={salon.images![2]}
            alt=""
          />
        </div>
      </section>
      <section className="space-y-3">
        <h1 className="font-bold text-3xl ">{salon.name}</h1>
        <p>{salon.address}</p>
        <p>
          <strong>Timing:</strong>
          &nbsp; {salon.openTime} to {salon.closeTime}
        </p>
      </section>
    </div>
  );
}
