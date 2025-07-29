import React from "react";
import SellerAccount from "./SellerAccount";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

function BecomePartner({}: Props) {
  const navigate = useNavigate();
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        <SellerAccount />
        <div className="mt-10 space-y-2 text-center text-sm font-medium">
          <h1>have account</h1>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="outlined"
          >
            login
          </Button>
        </div>
      </section>
    </div>
  );
}

export default BecomePartner;
