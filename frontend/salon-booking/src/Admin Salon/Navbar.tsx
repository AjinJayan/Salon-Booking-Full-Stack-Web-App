import { Menu, NotificationsActive } from "@mui/icons-material";
import { Badge, Drawer, IconButton } from "@mui/material";
import React from "react";
import { SalonDrawerListProps } from "../Salon/Components/SalonDrawerList";
import { useDispatch, useSelector } from "react-redux";
import store from "../Redux/store";
import {
  getAllNotificationBySalonId,
  notificationActions,
  notificationSelector,
} from "../Redux/reducers/notificationReducer";
import {
  getSalonByOwnerId,
  salonActions,
  salonSelector,
} from "../Redux/reducers/salonReducer";
import { useEffect } from "react";
import {
  getUser,
  userActions,
  userSelector,
} from "../Redux/reducers/userReducer";
import useNotificationWebsocket from "../util/useNotificationWebsocket";
import {
  authActions,
  authSelector,
  getNewTokenFromRefreshToken,
} from "../Redux/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";
import { serviceOfferingActions } from "../Redux/reducers/serviceOfferingReducer";
import { bookingActions } from "../Redux/reducers/bookingReducer";
import { categoryActions } from "../Redux/reducers/categoryReducer";

type Props = {
  DrawerList: React.ComponentType<SalonDrawerListProps>;
  handleLogout: () => void;
  toggleDrawer: (value: boolean) => void;
  open: boolean;
};

function Navbar({ DrawerList, handleLogout, toggleDrawer, open }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  // const [open, setOpen] = React.useState<boolean>(false);
  const { jwt, refreshExpiryIn, expiryIn } = useSelector(authSelector);
  // const toggleDrawer = (value: boolean) => {
  //   setOpen(value);
  // };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(
        getUser({ jwtToken: localStorage.getItem("jwt")!, navigate: navigate })
      );
    }
  }, []);

  const { authUser } = useSelector(userSelector);

  useEffect(() => {
    if (authUser)
      dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
  }, [authUser]);

  const { salon } = useSelector(salonSelector);

  useEffect(() => {
    if (salon)
      dispatch(
        getAllNotificationBySalonId({
          jwtToken: localStorage.getItem("jwt")!,
          salonId: salon.id,
        })
      );
  }, [salon]);

  useEffect(() => {
    if (jwt) {
      const timer = setTimeout(() => {
        console.log("akasdn", expiryIn);

        dispatch(
          getNewTokenFromRefreshToken({
            jwtToken: localStorage.getItem("jwt")!,
            refreshToken: localStorage.getItem("refreshToken")!,
            navigate: navigate,
            handleLogout: handleLogout,
          })
        );
      }, (expiryIn - 10) * 1000);
      return () => clearTimeout(timer);
    }
  }, [jwt]);

  useNotificationWebsocket({ authUserId: authUser?.id, type: "salon" });

  return (
    <div className="h-[10vh] flex items-center justify-between px-5 boarder-b">
      <div className="flex items-center gap-3">
        <IconButton onClick={() => toggleDrawer(true)}>
          <Menu color="primary"></Menu>
        </IconButton>
        <h1 className="text-xl cursor-pointer font-bold">Salon Booking</h1>
      </div>
      <Link to="/salon-dashboard/notifications">
        <IconButton>
          <Badge color="secondary">
            <NotificationsActive color="primary" />
          </Badge>
        </IconButton>
      </Link>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} handleLogout={handleLogout} />
      </Drawer>
    </div>
  );
}

export default Navbar;
