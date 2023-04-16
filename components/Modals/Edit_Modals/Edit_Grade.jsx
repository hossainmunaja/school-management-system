import React from "react";
import { Modal } from "@nextui-org/react";
import { updateGradeSheet } from "../../../libs/pocketbase";

// id,
//   marks,
//   student, // type=array=[student]
//   course

export default function Edit_Grade({ visible, setVisible, grade, reset }) {
  const updateGradeHandler = async (form) => {
    form.preventDefault();
    const result = await updateGradeSheet(grade.id, form.target.marks.value);
    if (result) {
      console.log(result);
      reset(result.expand.student.id);
      setVisible(false);
    }
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Gradesheet"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Gradesheet"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => updateGradeHandler(e)}
          >
            <input
              type={"number"}
              name="marks"
              placeholder="Marks"
              className="px-2 py-1 border rounded"
              defaultValue={grade ? grade.marks : ""}
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
