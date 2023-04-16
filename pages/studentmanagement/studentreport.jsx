import PocketBase from "pocketbase";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { getStudents, getGradeSheet, getCourses } from "../../libs/pocketbase";
import { Table } from "@nextui-org/react";
import Edit_Grade from "../../components/Modals/Edit_Modals/Edit_Grade";
import Create_Report from "../../components/Modals/Create_Modals/Ceate_Report";

export default function StudentReport() {
  const [isLoading, setLoading] = useState(false);

  //all student state
  const [Students, setStudents] = useState(null);

  //selected student
  const [SelectedStudent, setSelectedStudent] = useState(null);

  //all courses pass
  const [allCourses, setAllCourses] = useState(null);

  //gradesheet student pass
  const [gradeSheet, setGradeSheet] = useState(null);

  //gradesheet edit
  const [EditGradeVisible, setEditGradeVisible] = useState(false);
  const [SelectedGradesheet, setSelecetedGradesheet] = useState(null);
  const [addGradeVisible, setAddGradeVisible] = useState(false);

  const router = useRouter();
  const user = useUser();

  const getStudentHandler = async () => {
    const result = await getStudents();
    setStudents(result);
  };

  const ChangeStudentHandler = async (element) => {
    getGradeSheetHandler(element.target.value);
  };

  const getGradeSheetHandler = async (studentid) => {
    const result = await getGradeSheet(studentid);
    const result2 = await getCourses();
    // console.log("all courses", result2);
    setSelectedStudent(studentid);
    setAllCourses(result2);
    setGradeSheet(result);
  };

  const EditGradeHandler = (grades) => {
    setSelecetedGradesheet(grades);
    setEditGradeVisible(true);
  };

  const createGradeHandler = (grades) => {
    setSelecetedGradesheet(grades);
    setAddGradeVisible(true);
  };

  const getGrade = (marks) => {
    if (marks >= 90) {
      return "A+";
    } else if (marks >= 80) {
      return "A";
    } else if (marks >= 70) {
      return "B+";
    } else if (marks >= 60) {
      return "B";
    } else if (marks >= 50) {
      return "C+";
    } else if (marks >= 40) {
      return "C";
    } else if (marks >= 33) {
      return "D";
    } else {
      return "Fail";
    }
    return "";
  };

  useEffect(() => {
    getStudentHandler();
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
        <title>Student Report</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Student Grade Report"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <div className="flex flex-row gap-4">
            <div className="">
              <select onChange={(e) => ChangeStudentHandler(e)}>
                <option value="Select Student" disabled>
                  Select Student
                </option>
                {Students &&
                  Students.map((student) => (
                    <option value={student.id} key={student.id}>
                      {student.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="">
              <button
                className="bg-green-700 text-white px-2 py-2 rounded"
                onClick={() => setAddGradeVisible(true)}
              >
                ADD GRADE
              </button>
            </div>
          </div>

          <div className="p-5">
            <Table
              aria-label="Student"
              css={{
                height: "auto",
                minWidth: "100%",
                dropShadow: "none",
              }}
            >
              <Table.Header>
                <Table.Column>STUDENT NAME</Table.Column>
                <Table.Column>STUDENT ID</Table.Column>
                <Table.Column>COURSE</Table.Column>
                <Table.Column>MARKS</Table.Column>
                <Table.Column>GRADE</Table.Column>
                <Table.Column>OPTION</Table.Column>
              </Table.Header>
              <Table.Body>
                {gradeSheet &&
                  gradeSheet.map((grades) => (
                    <Table.Row key={grades.id}>
                      <Table.Cell>{grades.expand.student.name}</Table.Cell>
                      <Table.Cell>
                        {grades.expand.student.student_id}
                      </Table.Cell>
                      <Table.Cell>
                        {grades.expand.course.course_name}
                      </Table.Cell>
                      <Table.Cell>{grades.marks}</Table.Cell>
                      <Table.Cell>{getGrade(grades.marks)}</Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-3">
                          <button
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                            onClick={() => EditGradeHandler(grades)}
                          >
                            EDIT
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="">
          <Create_Report
            visible={addGradeVisible}
            setVisible={setAddGradeVisible}
            grades={gradeSheet}
            courses={allCourses}
            reset={getGradeSheetHandler}
            studentid={SelectedStudent}
          />

          <Edit_Grade
            visible={EditGradeVisible}
            setVisible={setEditGradeVisible}
            grade={SelectedGradesheet}
            reset={getGradeSheetHandler}
          />
        </div>
      </main>
    </>
  );
}
