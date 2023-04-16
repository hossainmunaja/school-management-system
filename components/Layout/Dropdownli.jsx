import Link from "next/link";
import React, { useState } from "react";
import { GrFormNext, GrFormDown } from "react-icons/gr";

export default function Dropdownli({ list, current }) {
  const [ShowDropDownList, setShowDropDownList] = useState(false);
  const toggleDropDownList = () => {
    setShowDropDownList(!ShowDropDownList);
  };
  return (
    <>
      <li className="border-b">
        <button
          className="py-2 flex w-full justify-between items-center"
          onClick={toggleDropDownList}
        >
          <span
            className={`${ShowDropDownList ? "text-gray-400" : "text-black"}`}
          >
            {list.title}
          </span>
          {ShowDropDownList ? <GrFormDown /> : <GrFormNext />}
        </button>
        {ShowDropDownList ? (
          <>
            <ul className="pl-5">
              {list.dropdowns.map((list) => (
                <li className="" key={list.id}>
                  <Link
                    href={list.link}
                    className={`py-2 flex justify-between items-center ${
                      current == list.link ? "font-semibold" : ""
                    }`}
                  >
                    <span>{list.title}</span>
                    <GrFormNext />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </li>
    </>
  );
}
