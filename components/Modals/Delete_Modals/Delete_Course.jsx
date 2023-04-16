import React from "react";
import { Modal } from "@nextui-org/react";
import { deleteCourse } from "../../../libs/pocketbase";

export default function Delete_Course({ visible, setVisible, course, reset }) {
  const confirmHandler = async () => {
    const result = await deleteCourse(course);
    if (result) {
      reset();
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Delete Course"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Delete Course"}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <span>Do yout want to delete this course?</span>
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
