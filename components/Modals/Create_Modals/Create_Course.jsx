import React from "react";
import { Modal } from "@nextui-org/react";
import { createCourse } from "../../../libs/pocketbase";

export default function Create_Course({ visible, setVisible, reset }) {
  const createCourseHandler = async (form) => {
    form.preventDefault();
    await createCourse(form.target.coursename.value);
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Course"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Course"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createCourseHandler(e)}
          >
            <input type="text" placeholder="Course Name" name="coursename" />
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
