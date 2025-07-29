import React from "react";
import Navbar from "../Customer/Navbar/Navbar";

type Props = {};

function NotFound({}: Props) {
  return (
    <>
      <Navbar />
      <div className="w-[100vw] h-[90vh] flex justify-center items-center text-black text-3xl">
        Page Not Found
      </div>
    </>
  );
}

export default NotFound;
