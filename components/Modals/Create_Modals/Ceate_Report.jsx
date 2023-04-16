import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import { createGradeSheet } from "../../../libs/pocketbase";

export default function Create_Report({
  visible,
  setVisible,
  grades,
  courses,
  reset,
  studentid,
}) {
  const makeAvailable = (grades) => {
    const fn = courses?.filter((course) => {
      return !grades?.some(
        // @ts-ignore
        (aa) => course.id == aa.course
      );
    });
    console.log("studentid", studentid);
    return fn;
  };

  const createReportHandler = async (form) => {
    form.preventDefault();
    const result = await createGradeSheet(
      form.target.marks.value,
      studentid,
      form.target.course.value
    );
    if (result) {
      reset(studentid);
      setVisible(false);
    }
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Gradesheet"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Gradesheet"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createReportHandler(e)}
          >
            <input
              type={"number"}
              name="marks"
              placeholder="Marks"
              className="px-2 py-1 border rounded"
            />

            <select
              name="course"
              defaultValue={"Select Course"}
              className="p-2 border"
            >
              <option value="Select Course" disabled>
                Select Course
              </option>
              {grades &&
                // @ts-ignore
                makeAvailable(grades).map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.course_name}
                  </option>
                ))}
            </select>

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
