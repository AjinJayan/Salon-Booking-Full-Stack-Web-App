import * as React from "react";
import { Banner } from "./Banner";
import { HomeServiceCard } from "./HomeServiceCard";
import { Service, services } from "../../Data/service";
import { SalonList } from "../../Salon/SalonList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../Redux/reducers/userReducer";
import { Button, InputAdornment, TextField } from "@mui/material";
import {
  getSalonsByKeyword,
  salonActions,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import store from "../../Redux/store";
import { Close } from "@mui/icons-material";

export interface IAppProps {}

export function Home(props: IAppProps) {
  const { authUser } = useSelector(userSelector);
  const dispatch = useDispatch<typeof store.dispatch>();
  const { searchKeyword } = useSelector(salonSelector);

  React.useEffect(() => {
    if (authUser) handleSearch(searchKeyword);
  }, [authUser]);

  const handleSearch = (keyword: string) => {
    dispatch(
      getSalonsByKeyword({
        jwtToken: localStorage.getItem("jwt")!,
        keyword: keyword,
      })
    );
    dispatch(salonActions.setSearchKeyword(keyword));
  };
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>
      <section className="space-y-10 lg:space-y-0 lg:flex items-center gap-5 px-20">
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold pb-9">
            what are you looking for, Bestie? &#128064;
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {services.map((item: Service) => (
              <HomeServiceCard item={item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 grid gap-3 grid-cols-2 grid-rows-12 h-[45vh] md:h-[90vh] ">
          <div className="row-span-7">
            <img
              className="w-full h-full object-cover rounded-md"
              src="https://images.pexels.com/photos/29555682/pexels-photo-29555682/free-photo-of-professional-hair-coloring-session-in-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="row-span-5">
            <img
              className="w-full h-full object-cover rounded-md"
              src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="row-span-7">
            <img
              className="w-full h-full object-cover rounded-md"
              src="https://images.pexels.com/photos/2809652/pexels-photo-2809652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="row-span-5">
            <img
              className="w-full h-full object-cover rounded-md"
              src="https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="px-20">
        <h1 className="text-3xl font-bold pb-10">Book Your Favourite Salon</h1>
        {authUser && (
          <TextField
            fullWidth
            sx={{ marginBottom: "2rem" }}
            size="small"
            variant="outlined"
            type="text"
            value={searchKeyword}
            placeholder="Search Salon Service"
            onChange={(e) => handleSearch(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => handleSearch("")}>
                      <Close />
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {authUser ? (
          <SalonList />
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 m-7">
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-center  text-lg md:text-xl">
                Have an account?
              </h1>
              <Link to="/login">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ width: "300px" }}
                >
                  Login
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-center text-lg md:text-xl">
                Don't have an account?
              </h1>
              <Link to="/register">
                <Button variant="contained" fullWidth sx={{ width: "300px" }}>
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
        <div></div>
      </section>
    </div>
  );
}
