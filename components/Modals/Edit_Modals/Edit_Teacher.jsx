import React from "react";
import { Modal } from "@nextui-org/react";
import { updateTeacher } from "../../../libs/pocketbase";

// id,
// name,
// departement,
// designation,
// age

export default function Edit_Teacher({ visible, setVisible, teacher, reset }) {
  const updateTeacherHandler = async (form) => {
    form.preventDefault();
    const result = await updateTeacher(
      teacher.id,
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
        aria-labelledby={"Edit Teacher"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Teacher"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => updateTeacherHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
              defaultValue={teacher ? teacher.name : ""}
            />
            <input
              type="text"
              name="deg"
              placeholder="Designation"
              className="px-2 py-1 border rounded"
              defaultValue={teacher ? teacher.designation : ""}
            />
            <input
              type="text"
              name="dep"
              placeholder="Department"
              className="px-2 py-1 border rounded"
              defaultValue={teacher ? teacher.departement : ""}
            />
            <input
              type={"number"}
              name="age"
              placeholder="age"
              className="px-2 py-1 border rounded"
              defaultValue={teacher ? teacher.age : ""}
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
