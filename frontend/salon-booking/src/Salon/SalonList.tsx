import * as React from "react";
import { SalonCard } from "./SalonCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getAllSalons, salonSelector } from "../Redux/reducers/salonReducer";
import store from "../Redux/store";
import { userSelector } from "../Redux/reducers/userReducer";
export interface SalonListProps {}

export function SalonList(props: SalonListProps) {
  const dispatch = useDispatch<typeof store.dispatch>();
  // const { salons } = useSelector(salonSelector);
  const { searchSalons } = useSelector(salonSelector);

  const { authUser } = useSelector(userSelector);
  useEffect(() => {
    if (authUser)
      dispatch(getAllSalons({ jwtToken: localStorage.getItem("jwt")! }));
  }, [authUser]);
  return (
    <div className="flex gap-5 flex-wrap">
      {searchSalons.length === 0 ? (
        <div className="m-20  text-2xl font-semibold flex items-center justify-center w-full">
          No Salons Found
        </div>
      ) : (
        searchSalons.map((salon, index) => (
          <Link key={salon.id} to={`salon/${salon.id}`}>
            <SalonCard salon={salon} />
          </Link>
        ))
      )}
    </div>
  );
}
