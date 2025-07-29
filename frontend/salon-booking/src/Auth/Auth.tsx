import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Button } from "@mui/material";
type Props = {};

function Auth({}: Props) {
  const location = useLocation();
  return (
    <div className="flex justify-center items-center h-[95vh]">
      <div className="shadow-lg p-5">
        {location.pathname === "/register" ? (
          <>
            <SignupForm />
            <div className="text-center pt-5 ">
              Already have Account?
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <LoginForm />
            <div className="text-center pt-5 ">
              Not have Account?
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
