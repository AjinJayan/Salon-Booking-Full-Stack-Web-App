import React from "react";
import { MenuItem } from "../Salon/Components/SalonDrawerList";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../Redux/store";
import { authActions } from "../Redux/reducers/authReducer";
import { salonActions } from "../Redux/reducers/salonReducer";
import { userActions } from "../Redux/reducers/userReducer";
import { notificationActions } from "../Redux/reducers/notificationReducer";
import { bookingActions } from "../Redux/reducers/bookingReducer";
import { categoryActions } from "../Redux/reducers/categoryReducer";
import { serviceOfferingActions } from "../Redux/reducers/serviceOfferingReducer";
type Props = {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer?: (value: boolean) => void;
  handleLogout: () => void;
};

function DrawerList({ menu, menu2, toggleDrawer, handleLogout }: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  // const [selectedMenu, setSelectedMenu] = React.useState<MenuItem>(menu[0]);
  const handleMenuClick = (menu: MenuItem) => {
    if (menu.name === "Logout") {
      handleLogout();
    }
    // setSelectedMenu(menu);
    navigate(menu.path);
    if (toggleDrawer) {
      toggleDrawer(false);
    }
  };
  return (
    <div className="h-full ">
      <div className="flex flex-col h-full  justify-between w-[300px] border-r border-slate-300 py-5">
        <div className="space-y-2">
          {menu.map((item: MenuItem, index) => (
            <div className="pr-9" key={index}>
              <div
                onClick={() => handleMenuClick(item)}
                className={`cursor-pointer flex items-center px-5 py-3  rounded-r-full ${
                  location.pathname === item.path
                    ? "bg-[#019031] text-white"
                    : "text-[#019031] "
                }`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.icon
                    : item.activeIcon}
                </ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="space-y-2">
          {menu2.map((item: MenuItem, index) => (
            <div className="pr-9" key={index}>
              <div
                onClick={() => handleMenuClick(item)}
                className={`cursor-pointer flex items-center px-5 py-3 rounded-r-full ${
                  location.pathname === item.path
                    ? "bg-[#019031] text-white"
                    : "text-[#019031] "
                }`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.icon
                    : item.activeIcon}
                </ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrawerList;
