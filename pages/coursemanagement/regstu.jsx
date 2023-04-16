import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { Table, Badge } from "@nextui-org/react";
import {
  getCourses,
  getStudents,
  StudentTakenUpdate,
} from "../../libs/pocketbase";
import Create_Assign_Student from "../../components/Modals/Create_Modals/Create_Assign_Student";
import Create_Course from "../../components/Modals/Create_Modals/Create_Course";
import Delete_Course from "../../components/Modals/Delete_Modals/Delete_Course";

export default function RegisterStudent() {
  const [isLoading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  const [Students, setStudents] = useState(null);
  const [allStudnets, setAllStudents] = useState(null);
  const [SelectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();
  const user = useUser();

  const getCourseHandler = async () => {
    const result = await getCourses();
    setCourses(result);
  };

  const courseChangeHandler = async (courseid) => {
    // console.log(courseid);
    getCourseHandler();
    const scourse = courses.find((course) => course.id == courseid);
    setSelectedCourse(scourse);
    setStudents(scourse.expand?.student_taken);
    const result2 = await getStudents();
    setAllStudents(result2);
  };

  const registerStudentHandler = async (form) => {
    form.preventDefault();
    // console.log("asdf");
    let stdT = [];
    // console.log(form.target.student.value);
    if (Students) {
      const result = Students.find(
        (std) => std.id == form.target.student.value
      );
      if (result) {
        console.log("do not submit");
      } else {
        // console.log(" submit");
        // console.log(Students);
        Students.forEach((s) => {
          stdT.push(s.id);
        });
        stdT.push(form.target.student.value);
        //todo submit
        registerStudentSubmit(stdT);
      }
    } else {
      stdT.push(form.target.student.value);
      //todo submit
      registerStudentSubmit(stdT);
    }
  };

  const registerStudentSubmit = async (s) => {
    // console.log(s);
    const result = await StudentTakenUpdate(SelectedCourse.id, s);
    if (result) {
      courseChangeHandler(SelectedCourse.id);
    }
  };

  useEffect(() => {
    getCourseHandler();
  }, []);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Register Student</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Register Student"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <div className="">
            <select
              onChange={(e) => courseChangeHandler(e.target.value)}
              className="px-2 py-1 mb-5"
            >
              <option value="Select Course">Select Course</option>
              {courses &&
                courses.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.course_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <div className="">
              {SelectedCourse && (
                <div className="text-xl font-semibold my-5">
                  {SelectedCourse.course_name}
                </div>
              )}
            </div>
            {allStudnets && (
              <form className="" onSubmit={(e) => registerStudentHandler(e)}>
                <select
                  className="px-2 py-1 mb-5"
                  defaultValue={"Select Student"}
                  name="student"
                >
                  <option value="Select Student">Select Student</option>
                  {allStudnets.map((student) => (
                    <option value={student.id} key={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <input
                  type="submit"
                  value={"Register"}
                  className="px-2 py-1 bg-green-500 text-white rounded ml-5"
                />
              </form>
            )}
            <Table
              aria-label="Course"
              headerLined
              lined
              css={{
                height: "auto",
                minWidth: "100%",
                dropShadow: "none",
              }}
            >
              <Table.Header>
                <Table.Column>Student</Table.Column>
              </Table.Header>
              <Table.Body>
                {Students &&
                  Students.map((student) => (
                    <Table.Row key={student.id}>
                      <Table.Cell>{student.name}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        {/* modals */}
        <div className="">
          {/* <Create_Assign_Teacher
            visible={CreateAssignTeacherVisible}
            setVisible={setCreateAssignTeacherVisible}
            reset={getCourseHandler}
            allTeachers={Teachers}
            assigned_teacher={SelectedTeachers}
            courseid={SelectedCourseId}
          />
          <Create_Course
            visible={createCourseVisible}
            setVisible={setCreateCourseVisible}
            reset={getCourseHandler}
          />
          <Delete_Course
            visible={deleteCourseVisible}
            setVisible={setDeleteCourseVisible}
            course={SelectedCourseId}
            reset={getCourseHandler}
          /> */}
        </div>
      </main>
    </>
  );
}
