import React from "react";
import { Modal } from "@nextui-org/react";
import { StudentTakenUpdate } from "../../../libs/pocketbase";

export default function Create_Assign_Student({
  visible,
  setVisible,
  StudentTaken,
  allStudents,
  courseid,
  reset,
}) {
  let final = null;
  if (StudentTaken && allStudents) {
    final = allStudents?.filter((Student) => {
      return !StudentTaken?.some(
        // @ts-ignore
        (aa) => Student.id == aa.id
      );
    });
  } else if (StudentTaken == undefined) {
    final = allStudents;
  }

  const assignStudentHandler = async (form) => {
    form.preventDefault();
    let students_id = [];
    if (StudentTaken) {
      StudentTaken.forEach((astudent) => {
        students_id.push(astudent.id);
      });
    }
    students_id.push(form.target.Student.value);
    const result = await StudentTakenUpdate(courseid, students_id);
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Assign Student"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Assign Student"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => assignStudentHandler(e)}
          >
            <select name="teacher" defaultValue={"Select Student"}>
              <option value="Select Student" disabled>
                Select Student
              </option>
              {final &&
                final.map((student) => (
                  <option value={student.id} key={student.id}>
                    {student.name}
                  </option>
                ))}
            </select>
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
              value={"Add"}
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
