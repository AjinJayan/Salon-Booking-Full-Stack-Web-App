import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme/greenTheme";
import React from "react";
import { Home } from "./Customer/Home/Home";
import { SalonDetails } from "./Salon/Salon Details/SalonDetails";
import Bookings from "./Customer/Booking/Bookings";
import Notifications from "./Customer/Notification/Notifications";
import Navbar from "./Customer/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SalonDashBoard from "./Salon/SalonDashBoard";
import BookingTables from "./Salon/Booking/BookingTable";
import ServiceTables from "./Salon/Services/ServiceTable";
import TransactionTables from "./Salon/Transaction/TransactionTable";
import Category from "./Salon/Category/Category";
import CreateServicesForm from "./Salon/Services/CreateServicesForm";
import Payment from "./Salon/Payment/Payment";
import Profile from "./Salon/Profile/Profile";
import Auth from "./Auth/Auth";
import PayementSuccess from "./Customer/Payement/PayementSuccess";
import SalonNotifications from "./Salon/Notification/SalonNotifications";
import SalonDashboardHomePage from "./Salon/SalonDashboardHome/SalonDashboardHomePage";
import BecomePartner from "./Salon/BecomePartner/BecomePartner";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/myBookings", element: <Bookings /> },
        { path: "/notifications", element: <Notifications /> },
        { path: "/salon/:id", element: <SalonDetails /> },
        { path: "/payment-success/:id", element: <PayementSuccess /> },
      ],
      errorElement: <NotFound />,
    },

    {
      path: "/salon-dashboard",
      element: <SalonDashBoard />,
      children: [
        { index: true, element: <SalonDashboardHomePage /> },
        { path: "/salon-dashboard/bookings", element: <BookingTables /> },
        { path: "/salon-dashboard/services", element: <ServiceTables /> },
        {
          path: "/salon-dashboard/add-services",
          element: <CreateServicesForm />,
        },
        { path: "/salon-dashboard/payment", element: <Payment /> },
        {
          path: "/salon-dashboard/transaction",
          element: <TransactionTables />,
        },
        { path: "/salon-dashboard/category", element: <Category /> },
        {
          path: "/salon-dashboard/notifications",
          element: <SalonNotifications />,
        },
        {
          path: "/salon-dashboard/account",
          element: <Profile />,
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Auth />,
    },
    {
      path: "/register",
      element: <Auth />,
    },

    {
      path: "/become-partner",
      element: <BecomePartner />,
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
