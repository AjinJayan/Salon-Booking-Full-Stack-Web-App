import React from "react";
import SalonDrawerList from "./Components/SalonDrawerList";
import { Outlet } from "react-router-dom";
import Navbar from "../Admin Salon/Navbar";
import { useDispatch, useSelector } from "react-redux";
import store from "../Redux/store";
import { authSelector } from "../Redux/reducers/authReducer";
import { userActions } from "../Redux/reducers/userReducer";
import { salonActions } from "../Redux/reducers/salonReducer";
import { notificationActions } from "../Redux/reducers/notificationReducer";
import { bookingActions } from "../Redux/reducers/bookingReducer";
import { categoryActions } from "../Redux/reducers/categoryReducer";
import { serviceOfferingActions } from "../Redux/reducers/serviceOfferingReducer";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Redux/reducers/authReducer";
type Props = {};

function SalonDashBoard({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  // const { jwt, refreshExpiryIn, expiryIn } = useSelector(authSelector);
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(userActions.clearUser());
    dispatch(salonActions.clearSalon());
    dispatch(notificationActions.clearNotification());
    dispatch(bookingActions.clearBooking());
    dispatch(categoryActions.clearCategory());
    dispatch(serviceOfferingActions.clearServiceOffering());
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar
          DrawerList={SalonDrawerList}
          handleLogout={handleLogout}
          toggleDrawer={toggleDrawer}
          open={open}
        />
        <section className="lg:flex lg:h-[90vh]">
          <div className="hidden lg:block h-full">
            <SalonDrawerList
              handleLogout={handleLogout}
              toggleDrawer={toggleDrawer}
            />
          </div>
          <div className="w-full p-10">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}

export default SalonDashBoard;
