import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-white bg-opacity-50">
      <AiOutlineLoading3Quarters color="black" className="animate-spin" />
    </div>
  );
}
