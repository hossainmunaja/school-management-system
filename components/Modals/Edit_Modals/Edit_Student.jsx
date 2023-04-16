import React from "react";
import { Modal } from "@nextui-org/react";
import { updateStudent } from "../../../libs/pocketbase";

export default function Edit_Student({ visible, setVisible, student, reset }) {
  const updateStudentHandler = async (form) => {
    form.preventDefault();
    const result = await updateStudent(
      student.id,
      form.target.name.value,
      form.target.student_id.value,
      form.target.grade.value,
      form.target.blood_group.value,
      form.target.age.value,
      form.target.address.value,
      form.target.guardian_name.value
    );
    if (result) {
      reset();
      setVisible(false);
    }
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Student"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Student"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => updateStudentHandler(e)}
          >
            {/* { id,
  name,
  student_id,
  grade,
  blood_group,
  age,
  address,
  guardian_name} */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.name : ""}
            />
            <input
              type={"number"}
              name="student_id"
              placeholder="Student ID"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.student_id : ""}
            />
            <input
              type={"number"}
              name="grade"
              placeholder="Grade"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.grade : ""}
            />
            <input
              type="text"
              name="blood_group"
              placeholder="Blood Group"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.blood_group : ""}
            />
            <input
              type={"number"}
              name="age"
              placeholder="Age"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.age : ""}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.address : ""}
            />
            <input
              type="text"
              name="guardian_name"
              placeholder="Guardian Name"
              className="px-2 py-1 border rounded"
              defaultValue={student ? student.guardian_name : ""}
            />
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
