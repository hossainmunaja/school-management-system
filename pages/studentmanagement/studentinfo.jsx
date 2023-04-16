import PocketBase from "pocketbase";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getStudents } from "../../libs/pocketbase";

//Modals import
import Delete_Student from "../../components/Modals/Delete_Modals/Delete_Student";
import Create_Student from "../../components/Modals/Create_Modals/Create_Student";
import Edit_Student from "../../components/Modals/Edit_Modals/Edit_Student";

export default function StudentInformation() {
  const [isLoading, setLoading] = useState(false);

  //modal states
  const [Students, setStudents] = useState(null);
  const [AddStudentsVisible, setAddStudentsVisible] = useState(false);
  const [EditStudentVisible, setEditStudentVisible] = useState(false);
  const [DeleteStudentVisible, setDeleteStudentVisible] = useState(false);
  const [SelectedStudent, setSelecetedStudent] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions
  //TODO - parameter student
  const EditStudentModalHandler = (student) => {
    setSelecetedStudent(student);
    setEditStudentVisible(true);
  };

  //TODO - parameter Student
  const DeleteStudentModalHandler = (student) => {
    setSelecetedStudent(student);
    setDeleteStudentVisible(true);
  };

  const getStudentsHandler = async () => {
    const result = await getStudents();
    // @ts-ignore
    setStudents(result);
  };

  useEffect(() => {
    getStudentsHandler();
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
        <title>Student</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Student Information"}>
          <div className="">
            <button
              className="bg-green-700 text-white px-2 py-2 rounded"
              onClick={() => setAddStudentsVisible(true)}
            >
              ADD Student
            </button>
          </div>
        </Header>
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
              <Table.Column>NAME</Table.Column>
              <Table.Column>STUDENT ID</Table.Column>
              <Table.Column>GRADE</Table.Column>
              <Table.Column>BLOOD GROUP</Table.Column>
              <Table.Column>AGE</Table.Column>
              <Table.Column>ADDRESS</Table.Column>
              <Table.Column>GUARDIAN</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Students &&
                Students.map((student) => (
                  <Table.Row key={student.id}>
                    <Table.Cell>{student.name}</Table.Cell>
                    <Table.Cell>{student.student_id}</Table.Cell>
                    <Table.Cell>{student.grade}</Table.Cell>
                    <Table.Cell>{student.blood_group}</Table.Cell>
                    <Table.Cell>{student.age}</Table.Cell>
                    <Table.Cell>{student.address}</Table.Cell>
                    <Table.Cell>{student.guardian_name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditStudentModalHandler(student)}
                        >
                          EDIT
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteStudentModalHandler(student)}
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
        {/* modals */}
        <div className="">
          <Create_Student
            visible={AddStudentsVisible}
            setVisible={setAddStudentsVisible}
            reset={getStudentsHandler}
          />
          <Edit_Student
            visible={EditStudentVisible}
            setVisible={setEditStudentVisible}
            student={SelectedStudent}
            reset={getStudentsHandler}
          />
          <Delete_Student
            visible={DeleteStudentVisible}
            setVisible={setDeleteStudentVisible}
            student={SelectedStudent}
            reset={getStudentsHandler}
          />
        </div>
      </main>
    </>
  );
}
