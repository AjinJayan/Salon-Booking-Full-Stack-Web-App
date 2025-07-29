import {
  AccountBalance,
  Add,
  Category,
  Dashboard,
  Inventory,
  NotificationsNone,
  Notifications,
  Receipt,
  ShoppingBag,
  Logout,
  AccountBox,
} from "@mui/icons-material";
import React, { JSX } from "react";
import DrawerList from "../../Admin Salon/DrawerList";

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactElement;
  activeIcon: React.ReactElement;
}
export type SalonDrawerListProps = {
  toggleDrawer: (value: boolean) => void;
  handleLogout: () => void;
};

const menu: MenuItem[] = [
  {
    name: "Dasboard",
    path: "/salon-dashboard",
    icon: <Dashboard color="secondary" />,
    activeIcon: <Dashboard color="primary" />,
  },
  {
    name: "Bookings",
    path: "/salon-dashboard/bookings",
    icon: <ShoppingBag color="secondary" />,
    activeIcon: <ShoppingBag color="primary" />,
  },
  {
    name: "Services",
    path: "/salon-dashboard/services",
    icon: <Inventory color="secondary" />,
    activeIcon: <Inventory color="primary" />,
  },
  {
    name: "Add Services",
    path: "/salon-dashboard/add-services",
    icon: <Add color="secondary" />,
    activeIcon: <Add color="primary" />,
  },
  {
    name: "Payment",
    path: "/salon-dashboard/payment",
    icon: <AccountBalance color="secondary" />,
    activeIcon: <AccountBalance color="primary" />,
  },
  {
    name: "Transaction",
    path: "/salon-dashboard/transaction",
    icon: <Receipt color="secondary" />,
    activeIcon: <Receipt color="primary" />,
  },
  {
    name: "Category",
    path: "/salon-dashboard/category",
    icon: <Category color="secondary" />,
    activeIcon: <Category color="primary" />,
  },
  {
    name: "Notifications",
    path: "/salon-dashboard/notifications",
    icon: <NotificationsNone color="secondary" />,
    activeIcon: <Notifications color="primary" />,
  },
];

const menu2: MenuItem[] = [
  {
    name: "Account",
    path: "/salon-dashboard/account",
    icon: <AccountBox color="secondary" />,
    activeIcon: <AccountBox color="primary" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout color="secondary" />,
    activeIcon: <Logout color="primary" />,
  },
];

function SalonDrawerList({ toggleDrawer, handleLogout }: SalonDrawerListProps) {
  return (
    <DrawerList
      menu={menu}
      menu2={menu2}
      toggleDrawer={toggleDrawer}
      handleLogout={handleLogout}
    />
  );
}

export default SalonDrawerList;
