import React from "react";
import { Modal } from "@nextui-org/react";
import { deleteTeacher } from "../../../libs/pocketbase";

export default function Delete_Teacher({
  visible,
  setVisible,
  teacher,
  reset,
}) {
  const confirmHandler = async () => {
    const result = await deleteTeacher(teacher.id);
    if (result) {
      reset();
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Delete Teacher"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Delete Teacher"}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <span>Do yout want to delete {teacher ? teacher.name : ""}?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-2 py-1 bg-red-600 text-white rounded"
            onClick={confirmHandler}
          >
            Yes
          </button>
          <button
            className="px-2 py-1 bg-gray-600 text-white rounded"
            onClick={() => setVisible(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
