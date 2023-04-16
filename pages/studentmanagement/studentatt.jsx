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
  studentAttendanceByDate,
  createStudentAttendance,
  getStudents,
  deleteStudentAttendance,
} from "../../libs/pocketbase";

export default function StudentAttendance() {
  const [isLoading, setLoading] = useState(false);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [AttendStudents, setAttendStudents] = useState(null);
  const [students, setStudents] = useState(null);
  const [allSTD, setAllSTD] = useState(null);
  const router = useRouter();
  const user = useUser();

  function attendanceRatio(att) {
    // console.log(att, allSTD);
    let val = (att / allSTD.length) * 100;
    return val;
  }

  const makeAttend = async (form) => {
    form.preventDefault();
    if (form.target.student.value !== "Select Student") {
      const result = await createStudentAttendance(
        date,
        form.target.student.value
      );
      if (result) {
        studentAttendanceByDateHandler(date);
      }
    }
  };

  const removeAttendance = async (id) => {
    const result = await deleteStudentAttendance(id);
    if (result) {
      studentAttendanceByDateHandler(date);
    }
  };

  const studentAttendanceByDateHandler = async (date) => {
    const attendedStudents = await studentAttendanceByDate(date);
    const students = await getStudents();

    setAllSTD(students);

    // console.log("teachers", teachers);
    // console.log("att teachers", attendedTeachers);

    if (attendedStudents) {
      const final = students?.filter((student) => {
        return !attendedStudents?.some(
          // @ts-ignore
          (aa) => student.id == aa.expand.student.id
        );
      });

      // console.log("filtered", final);

      // @ts-ignore
      setStudents(final);
      // @ts-ignore
      setAttendStudents(attendedStudents);
    }
  };

  useEffect(() => {
    studentAttendanceByDateHandler(date);
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
        <title>Student Attendance</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Student Attendance"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1 className="mb-5">Find Attendance sheet by date</h1>
          <div className="flex flex-row gap-10">
            <div className="flex w-fit gap-5">
              <input
                type="date"
                className="border p-2"
                defaultValue={date}
                onChange={(e) =>
                  setDate(moment(e.target.value).format("YYYY-MM-DD"))
                }
              />
            </div>
            <div className="">
              <span className="mr-3">Attendance</span>
              {AttendStudents && attendanceRatio(AttendStudents.length)} %
            </div>
          </div>
          <div className="mt-5">
            <form className="flex gap-5" onSubmit={(e) => makeAttend(e)}>
              <select
                name="student"
                defaultValue={"Select Student"}
                className="p-2 border"
              >
                <option value="Select Student" disabled>
                  Select Student
                </option>
                {students &&
                  // @ts-ignore
                  students.map((student) => (
                    <option value={student.id} key={student.id}>
                      {student.name}
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
              {AttendStudents &&
                // @ts-ignore
                AttendStudents.map((student) => (
                  <Badge
                    key={student.id}
                    css={{ border: "none" }}
                    color={"primary"}
                    size={"lg"}
                    variant={"default"}
                  >
                    {student.expand.student.name}
                    <button
                      className="absolute -right-1 -top-1 bg-red-600 rounded-full w-4 h-4 text-xs text-white"
                      onClick={() => removeAttendance(student.id)}
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
