// @ts-nocheck
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
  getTeachers,
  assignTeacherUpdate,
} from "../../libs/pocketbase";
import Create_Assign_Teacher from "../../components/Modals/Create_Modals/Create_Assign_Teacher";
import Create_Course from "../../components/Modals/Create_Modals/Create_Course";
import Delete_Course from "../../components/Modals/Delete_Modals/Delete_Course";

export default function CourseInfo() {
  const [isLoading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  const [CreateAssignTeacherVisible, setCreateAssignTeacherVisible] =
    useState(false);
  const [createCourseVisible, setCreateCourseVisible] = useState(false);
  const [deleteCourseVisible, setDeleteCourseVisible] = useState(false);
  const [Teachers, setTeachers] = useState(null);
  const [SelectedTeachers, setSelectedTeachers] = useState(null);
  const [SelectedCourseId, setSelectedCourseId] = useState(null);
  const router = useRouter();
  const user = useUser();

  const getCourseHandler = async () => {
    const result = await getCourses();
    const teachers = await getTeachers();
    setTeachers(teachers);
    setCourses(result);
  };

  const CreateAssginedTeacherHandler = (course) => {
    setSelectedTeachers(course.expand.assigned_teacher);
    setSelectedCourseId(course.id);
    setCreateAssignTeacherVisible(true);
  };

  const removeAssignedTeacher = async (course, teacherid) => {
    const result = course.assigned_teacher.filter(
      (teacher) => teacher !== teacherid
    );
    await assignTeacherUpdate(course.id, result);
    getCourseHandler();
  };

  const DeleteCourseHandler = (course) => {
    setSelectedCourseId(course.id);
    setDeleteCourseVisible(true);
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
        <title>Course Info</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Course Info"}>
          <div className="">
            <button
              className="bg-green-700 text-white px-2 py-2 rounded"
              onClick={() => setCreateCourseVisible(true)}
            >
              Create Course
            </button>
          </div>
        </Header>
        <div className="p-5">
          <div className="">
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
                <Table.Column>Course Name</Table.Column>
                <Table.Column>Assigned Teacher</Table.Column>
                <Table.Column>Option</Table.Column>
              </Table.Header>
              <Table.Body>
                {courses &&
                  courses.map((course) => (
                    <Table.Row key={course.id}>
                      <Table.Cell>{course.course_name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-3 flex-wrap">
                          {course.expand.assigned_teacher &&
                            course.expand.assigned_teacher.map((teacher) => (
                              <Badge
                                key={teacher.id}
                                css={{ border: "none" }}
                                color={"primary"}
                                size={"lg"}
                                variant={"default"}
                              >
                                {teacher.name}
                                <button
                                  className="absolute -right-1 -top-1 bg-red-600 rounded-full w-4 h-4 text-xs text-white"
                                  onClick={() =>
                                    removeAssignedTeacher(course, teacher.id)
                                  }
                                >
                                  x
                                </button>
                              </Badge>
                            ))}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-3">
                          <button
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                            onClick={() => CreateAssginedTeacherHandler(course)}
                          >
                            Assgin new Teacher
                          </button>
                          <button
                            className="bg-red-600 text-white rounded px-2 py-1"
                            onClick={() => DeleteCourseHandler(course)}
                          >
                            DELETE
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        {/* modals */}
        <div className="">
          <Create_Assign_Teacher
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
          />
        </div>
      </main>
    </>
  );
}
