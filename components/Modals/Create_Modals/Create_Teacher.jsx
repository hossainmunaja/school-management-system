import React from "react";
import { Modal } from "@nextui-org/react";
import { createTeacher } from "../../../libs/pocketbase";

// name, departement, designation, age

export default function Create_Teacher({ visible, setVisible, reset }) {
  const createTeacherHandler = async (form) => {
    form.preventDefault();
    const result = await createTeacher(
      form.target.name.value,
      form.target.dep.value,
      form.target.deg.value,
      form.target.age.value
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
        aria-labelledby={"Create Teacher"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Teacher"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createTeacherHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="deg"
              placeholder="Designation"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="dep"
              placeholder="Subject"
              className="px-2 py-1 border rounded"
            />
            <input
              type={"number"}
              name="age"
              placeholder="age"
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
