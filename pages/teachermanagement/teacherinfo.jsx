// @ts-nocheck
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getTeachers } from "../../libs/pocketbase";

//modals
import Create_Teacher from "../../components/Modals/Create_Modals/Create_Teacher";
import Edit_Teacher from "../../components/Modals/Edit_Modals/Edit_Teacher";
import Delete_Teacher from "../../components/Modals/Delete_Modals/Delete_Teacher";

export default function TeacherInfo() {
  const [isLoading, setLoading] = useState(false);
  //modal states
  const [Teachers, setTeachers] = useState(null);
  const [AddTeacherVisible, setAddTeacherVisible] = useState(false);
  const [EditTeacherVisible, setEditTeacherVisible] = useState(false);
  const [DeleteTeacherVisible, setDeleteTeacherVisible] = useState(false);
  const [SelectedTeacher, setSelecetedTeacher] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions
  //TODO - parameter teacher
  const EditTeacherModalHandler = (teacher) => {
    setSelecetedTeacher(teacher);
    setEditTeacherVisible(true);
  };

  //TODO - parameter teacher
  const DeleteTeacherModalHandler = (teacher) => {
    setSelecetedTeacher(teacher);
    setDeleteTeacherVisible(true);
  };

  const getTeachersHandler = async () => {
    const result = await getTeachers();
    // @ts-ignore
    setTeachers(result);
  };

  useEffect(() => {
    getTeachersHandler();
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
        <title>Teacher</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Teacher Information"}>
          <div className="">
            <button
              className="bg-green-700 text-white px-2 py-2 rounded"
              onClick={() => setAddTeacherVisible(true)}
            >
              ADD TEACHER
            </button>
          </div>
        </Header>
        <div className="p-5">
          <Table
            aria-label="Teacher"
            css={{
              height: "auto",
              minWidth: "100%",
              dropShadow: "none",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>DESIGNATION</Table.Column>
              <Table.Column>SUBJECT</Table.Column>
              <Table.Column>AGE</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Teachers &&
                Teachers.map((teacher) => (
                  <Table.Row key={teacher.id}>
                    <Table.Cell>{teacher.name}</Table.Cell>
                    <Table.Cell>{teacher.designation}</Table.Cell>
                    <Table.Cell>{teacher.departement}</Table.Cell>
                    <Table.Cell>{teacher.age}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditTeacherModalHandler(teacher)}
                        >
                          EDIT
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteTeacherModalHandler(teacher)}
                        >
                          DELETE
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              {/* <Table.Row key="1">
                <Table.Cell>Tony Reichert</Table.Cell>
                <Table.Cell>Senior Faculty</Table.Cell>
                <Table.Cell>CSE</Table.Cell>
                <Table.Cell>22</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => EditTeacherModalHandler()}
                    >
                      EDIT
                    </button>
                    <button
                      className="bg-red-600 text-white rounded px-2 py-1"
                      onClick={() => DeleteTeacherModalHandler()}
                    >
                      DELETE
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row> */}
            </Table.Body>
          </Table>
        </div>
        {/* modals */}
        <div className="">
          <Create_Teacher
            visible={AddTeacherVisible}
            setVisible={setAddTeacherVisible}
            reset={getTeachersHandler}
          />
          <Edit_Teacher
            visible={EditTeacherVisible}
            setVisible={setEditTeacherVisible}
            teacher={SelectedTeacher}
            reset={getTeachersHandler}
          />
          <Delete_Teacher
            visible={DeleteTeacherVisible}
            setVisible={setDeleteTeacherVisible}
            teacher={SelectedTeacher}
            reset={getTeachersHandler}
          />
        </div>
      </main>
    </>
  );
}
