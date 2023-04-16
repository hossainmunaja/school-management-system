import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Header({ title, children }) {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
  }, []);
  return (
    <header className="bg-slate-50 h-20 px-5 flex justify-between items-center  border-b border-gray-200 flex flex-row">
      <div className="">
        <span className="text-xl font-semibold">{title}</span>
      </div>
      <div className="font-bold text-blue-900">{time}</div>
      {children}
    </header>
  );
}
