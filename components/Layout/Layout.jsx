import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useUserLogout } from "../../context/UserContextProvider";
import Image from "next/image";
import { Dropdown, Avatar, Tooltip, Divider } from "@nextui-org/react";
import { useUser } from "../../context/UserContextProvider";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import Dropdownli from "./Dropdownli";

const navDetail = [
  {
    title: "Course Management",
    dropdowns: [
      {
        id: 0,
        title: "Course Info",
        link: "/coursemanagement/courseinfo",
      },
      {
        id: 1,
        title: "Register Student",
        link: "/coursemanagement/regstu",
      },
    ],
  },
  {
    title: "Teacher Management",
    dropdowns: [
      {
        id: 0,
        title: "Teacher Info",
        link: "/teachermanagement/teacherinfo",
      },
      {
        id: 1,
        title: "Attendance",
        link: "/teachermanagement/teacheratt",
      },
    ],
  },
  {
    title: "Student Management",
    dropdowns: [
      {
        id: 0,
        title: "Student Info",
        link: "/studentmanagement/studentinfo",
      },
      {
        id: 1,
        title: "Attendance",
        link: "/studentmanagement/studentatt",
      },
      {
        id: 2,
        title: "Report",
        link: "/studentmanagement/studentreport",
      },
    ],
  },
];

export default function Layout({ children }) {
  const logout = useUserLogout();
  const router = useRouter();
  const user = useUser();

  const onSelectHandler = (e) => {
    // @ts-ignore
    if (e === "logout") logout();
  };

  if (router.pathname === "/login") {
    return (
      <div className="font-hind">
        {children}
        <ToastContainer />
      </div>
    );
  }
  return (
    <>
      <div className="h-screen w-full flex font-hind">
        <div
          className="sidebar h-full lg:w-1/5 md:w-1/4 w-0 flex flex-col justify-between bg-no-repeat bg-cover bg-center bg-blend-overlay bg-white bg-opacity-90"
          style={{ backgroundImage: "url('/img/school1.jpg')" }}
        >
          <Link
            href={"/"}
            className="w-full flex justify-center items-center flex-col p-3"
          >
            <Image
              src={"/img/logo.png"}
              width={80}
              height={80}
              alt={"sayemlogo"}
            />
            <span className="text-[18px] font-bold mt-3">School Management System</span>
          </Link>
          <ul className="mt-5 h-full px-4">
            <li className="border-b border-gray-300">
              <Link
                href={"/"}
                className="py-2 flex justify-between items-center"
              >
                <span>Dashboard</span>
                <GrFormNext />
              </Link>
            </li>

            {navDetail.map((navIndi) => (
              <Dropdownli
                list={navIndi}
                key={navIndi.title}
                current={router.pathname}
              />
            ))}
          </ul>
          <div className=" border-t border-gray-300 h-24 flex justify-center">
            <Dropdown>
              <Dropdown.Trigger>
                <div className="px-5 w-full profile cursor-pointer flex justify-between items-center">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <span className="text-[18px] text-center font-semibold text-green-600">
                      Account
                    </span>
                  </div>
                  <GrFormNext />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu
                // color="primary"
                textColor="default"
                aria-label="Avatar Actions"
                onAction={onSelectHandler}
              >
                <Dropdown.Item textValue="Profile" key="Profile">
                  <span className="font-hind">Profile</span>
                </Dropdown.Item>

                <Dropdown.Item
                  textValue="logout"
                  key="logout"
                  color="error"
                  withDivider
                >
                  <span className="font-hind">Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <ToastContainer />
    </>
  );
}
