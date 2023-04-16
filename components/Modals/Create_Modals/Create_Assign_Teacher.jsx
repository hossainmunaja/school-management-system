import React from "react";
import { Modal } from "@nextui-org/react";
import { assignTeacherUpdate } from "../../../libs/pocketbase";

export default function Create_Assign_Teacher({
  visible,
  setVisible,
  assigned_teacher,
  allTeachers,
  courseid,
  reset,
}) {
  let final = null;
  if (assigned_teacher && allTeachers) {
    final = allTeachers?.filter((teacher) => {
      return !assigned_teacher?.some(
        // @ts-ignore
        (aa) => teacher.id == aa.id
      );
    });
  } else if (assigned_teacher == undefined) {
    final = allTeachers;
  }

  const assignTeacherHandler = async (form) => {
    form.preventDefault();
    let teachers_id = [];
    if (assigned_teacher) {
      assigned_teacher.forEach((ateacher) => {
        teachers_id.push(ateacher.id);
      });
    }
    teachers_id.push(form.target.teacher.value);
    const result = await assignTeacherUpdate(courseid, teachers_id);
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Assign Teacher"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Assign Teacher"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => assignTeacherHandler(e)}
          >
            <select name="teacher" defaultValue={"Select Teacher"}>
              <option value="Select Teacher" disabled>
                Select Teacher
              </option>
              {final &&
                final.map((teacher) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.name}
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
