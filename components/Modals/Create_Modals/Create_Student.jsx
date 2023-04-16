import React from "react";
import { Modal } from "@nextui-org/react";
import { createStudent } from "../../../libs/pocketbase";

export default function Create_Student({ visible, setVisible, reset }) {
  const createStudentHandler = async (form) => {
    form.preventDefault();
    const result = await createStudent(
      form.target.name.value,
      form.target.s_id.value,
      form.target.class.value,
      form.target.b_group.value,
      form.target.age.value,
      form.target.address.value,
      form.target.guardian.value
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
        aria-labelledby={"Create Student"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Teacher"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createStudentHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type={"number"}
              name="s_id"
              placeholder="Student ID"
              className="px-2 py-1 border rounded"
            />
            <input
              type={"number"}
              name="class"
              placeholder="Grade"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="b_group"
              placeholder="Blood Group"
              className="px-2 py-1 border rounded"
            />

            <input
              type={"number"}
              name="age"
              placeholder="age"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="guardian"
              placeholder="Guardian Name"
              className="px-2 py-1 border rounded"
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
