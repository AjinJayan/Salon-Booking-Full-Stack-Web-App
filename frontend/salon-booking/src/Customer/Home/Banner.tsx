import * as React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/reducers/userReducer";
import {
  getSalonsByKeyword,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import { useDispatch } from "react-redux";
import store from "../../Redux/store";

export interface IAppProps {}

export function Banner(props: IAppProps) {
  const { authUser } = useSelector(userSelector);
  const { searchSalons } = useSelector(salonSelector);
  const dispatch = useDispatch<typeof store.dispatch>();

  // const handleSearch = (keyword: string) => {
  //   dispatch(
  //     getSalonsByKeyword({
  //       jwtToken: localStorage.getItem("jwt")!,
  //       keyword: keyword,
  //     })
  //   );
  // };

  return (
    <div className="w-full relative h-[80vh]">
      <video
        className="w-full h-full object-cover "
        src="https://videos.pexels.com/video-files/3997198/3997198-uhd_2732_1440_25fps.mp4"
        muted
        autoPlay
        autoFocus
      />

      <div className="absolute flex flex-col items-center justify-center inset-0 text-white z-20 space-y-3 px-5">
        <h1 className="text-5xl font-bold">Be your self</h1>
        <p className="text-2xl text-slate-400 font-semibold text-center">
          Discover and Book Beauty, wellness near you
        </p>
        {/* {authUser && (
          <input
            className="border-none p-4 w-[15rem] md:w-[33rem] text-center outline-none bg-white text-black rounded-md"
            type="text"
            placeholder="Search Salon Service"
            onChange={(e) => handleSearch(e.target.value)}
          />
        )} */}
      </div>
    </div>
  );
}
