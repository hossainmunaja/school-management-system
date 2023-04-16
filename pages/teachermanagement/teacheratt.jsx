import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { Badge } from "@nextui-org/react";
import moment from "moment";
import {
  teacherAttendanceByDate,
  getTeachers,
  createTeacherAttendance,
  deleteTeacherAttendance,
} from "../../libs/pocketbase";

export default function TeacherAttendance() {
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [AttendTeachers, setAttendTeachers] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const router = useRouter();
  const user = useUser();

  const makeAttend = async (form) => {
    form.preventDefault();
    if (form.target.teacher.value !== "Select Teacher") {
      const result = await createTeacherAttendance(
        date,
        form.target.teacher.value
      );
      if (result) {
        teacherAttendanceByDateHandler(date);
      }
    }
  };

  const removeAttendance = async (id) => {
    const result = await deleteTeacherAttendance(id);
    if (result) {
      teacherAttendanceByDateHandler(date);
    }
  };

  const teacherAttendanceByDateHandler = async (date) => {
    const attendedTeachers = await teacherAttendanceByDate(date);
    const teachers = await getTeachers();

    // console.log("teachers", teachers);
    // console.log("att teachers", attendedTeachers);

    if (attendedTeachers) {
      console.log(attendedTeachers);
      const final = teachers?.filter((teacher) => {
        return !attendedTeachers?.some(
          // @ts-ignore
          (aa) => teacher.id == aa.expand.teacher.id
        );
      });

      // console.log("filtered", final);

      // @ts-ignore
      setTeachers(final);
      // @ts-ignore
      setAttendTeachers(attendedTeachers);
    }
  };

  useEffect(() => {
    teacherAttendanceByDateHandler(date);
  }, [date]);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Teacher Attendance</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Teacher Attendance"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1 className="mb-5">Find Attendance sheet by date</h1>
          <form className="flex w-fit gap-5">
            <input
              type="date"
              className="border p-2"
              defaultValue={date}
              onChange={(e) =>
                setDate(moment(e.target.value).format("YYYY-MM-DD"))
              }
            />
            <input
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded"
            />
          </form>
          <div className="mt-5">
            <form className="flex gap-5" onSubmit={(e) => makeAttend(e)}>
              <select
                name="teacher"
                defaultValue={"Select Teacher"}
                className="p-2 border"
              >
                <option value="Select Teacher" disabled>
                  Select Teacher
                </option>
                {teachers &&
                  // @ts-ignore
                  teachers.map((teacher) => (
                    <option value={teacher.id} key={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
              </select>
              <input
                type="submit"
                className="px-3 py-2 bg-green-600 text-white rounded"
                value={"Present"}
              />
            </form>
            <div className="mt-5 bg-gray-100 w-1/2 rounded p-5">
              <span className="text-md font-semibold">
                Date - {moment(date).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="bg-gray-100 mt-5 w-1/2 p-5 rounded flex gap-4 flex-wrap">
              {AttendTeachers &&
                // @ts-ignore
                AttendTeachers.map((teacher) => (
                  <Badge
                    key={teacher.id}
                    css={{ border: "none" }}
                    color={"primary"}
                    size={"lg"}
                    variant={"default"}
                  >
                    {teacher.expand.teacher.name}
                    <button
                      className="absolute -right-1 -top-1 bg-red-600 rounded-full w-4 h-4 text-xs text-white"
                      onClick={() => removeAttendance(teacher.id)}
                    >
                      x
                    </button>
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
