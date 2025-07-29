import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";
import { salonReducer } from "./reducers/salonReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { serviceOfferingReducer } from "./reducers/serviceOfferingReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { bookingReducer } from "./reducers/bookingReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { paymentReducer } from "./reducers/paymentReducer";

const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    salonReducer,
    categoryReducer,
    serviceOfferingReducer,
    reviewReducer,
    bookingReducer,
    notificationReducer,
    paymentReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
