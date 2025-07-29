import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import store from "../../Redux/store";
import { proceedPayment } from "../../Redux/reducers/paymentReducer";

type Props = {};

function PayementSuccess({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const location = useLocation();
  const getQueryParams = (key: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  const paymentId = getQueryParams("razorpay_payment_id");
  const paymentLinkId = getQueryParams("razorpay_payment_link_id");

  useEffect(() => {
    if (paymentId && paymentLinkId)
      dispatch(
        proceedPayment({
          jwtToken: localStorage.getItem("jwt")!,
          paymentId: paymentId!,
          paymentLinkId: paymentLinkId!,
        })
      );
  }, []);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="bg-green-700 p-8 text-white w-[90%] lg:w-[25%] border rounded-md h-[49vh] flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Congratulation!</h1>
        <h1 className="text-xl font-semibold">Your booking got success!</h1>
        <div>
          <Link to="/">
            <Button color="secondary" variant="contained">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PayementSuccess;
