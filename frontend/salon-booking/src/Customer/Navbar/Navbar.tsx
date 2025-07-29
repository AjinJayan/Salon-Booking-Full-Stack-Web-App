import { AccountCircle, NotificationsActive } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { getUser } from "../../Redux/reducers/userReducer";
import store from "../../Redux/store";
import {
  authActions,
  authSelector,
  getNewTokenFromRefreshToken,
} from "../../Redux/reducers/authReducer";
import { salonActions } from "../../Redux/reducers/salonReducer";
import {
  getAllNotificationByUserId,
  notificationActions,
  notificationSelector,
} from "../../Redux/reducers/notificationReducer";
import {
  paymentActions,
  paymentSelector,
} from "../../Redux/reducers/paymentReducer";
import { UserRole } from "../../Redux/reducers/userReducer";
import { bookingActions } from "../../Redux/reducers/bookingReducer";
import { categoryActions } from "../../Redux/reducers/categoryReducer";
import { serviceOfferingActions } from "../../Redux/reducers/serviceOfferingReducer";
import useNotificationWebsocket from "../../util/useNotificationWebsocket";

type Props = {};

function Navbar({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { jwt, refreshExpiryIn, expiryIn } = useSelector(authSelector);
  const navigate = useNavigate();
  const { authUser } = useSelector(userSelector);
  const { isReadCount } = useSelector(notificationSelector);
  // const { paymentSuccess } = useSelector(paymentSelector);

  // const isReadCount = notifications.reduce((count, notification) => {
  //   if (!notification.isRead) {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(
        getUser({ jwtToken: localStorage.getItem("jwt")!, navigate: navigate })
      );
    }
  }, []);

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

  useEffect(() => {
    if (localStorage.getItem("jwt") && authUser)
      dispatch(
        getAllNotificationByUserId({
          jwtToken: localStorage.getItem("jwt")!,
          userId: authUser.id,
        })
      );
    // if (paymentSuccess) dispatch(paymentActions.clearPaymentSuccess());
  }, [authUser]);

  useNotificationWebsocket({ authUserId: authUser?.id, type: "user" });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(authActions.logout());
    dispatch(userActions.clearUser());
    dispatch(salonActions.clearSalon());
    dispatch(notificationActions.clearNotification());
    dispatch(bookingActions.clearBooking());
    dispatch(categoryActions.clearCategory());
    dispatch(serviceOfferingActions.clearServiceOffering());
    navigate("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSalonDashboard = () => {
    handleClose();
    navigate("/salon-dashboard");
  };
  return (
    <>
      <div className="z-50 px-6 flex items-center justify-between py-2 gap-5">
        <div className="flex items-center gap-10 ">
          <h1 className="cursor-pointer font-bold text-2xl">
            <Link to="/">Salon Service</Link>
          </h1>
          <div className="flex items-center gap-5 ">
            <h1>
              <Link to="/">Home</Link>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <Link to="/become-partner">
            <Button variant="outlined">Become Partner</Button>
          </Link>
          <Link to="notifications">
            <IconButton>
              <Badge badgeContent={isReadCount}>
                <NotificationsActive color="primary" />
              </Badge>
            </IconButton>
          </Link>

          {authUser ? (
            <div className="flex gap-1 items-center">
              <h1 className="font-semibold text-lg">
                {authUser.fullName.split(" ")[0]}
              </h1>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar sx={{ bgcolor: "green" }}>
                  {authUser.fullName[0].toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/myBookings">My Bookings </Link>
                </MenuItem>
                {authUser.role === UserRole.SALON_OWNER && (
                  <MenuItem onClick={handleSalonDashboard}>
                    <Link to="/salon-dashboard">Salon Dashboard </Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <IconButton>
                <AccountCircle sx={{ fontSize: "45px", color: "green" }} />
              </IconButton>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
