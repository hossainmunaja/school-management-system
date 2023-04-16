import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

//........................Users...................

//User Information update
export const updateUser = async (
  id,
  name,
  password,
  passwordConfirm,
  oldPassword
) => {
  try {
    const data = {
      name: name,
      password: password,
      passwordConfirm: passwordConfirm,
      oldPassword: oldPassword,
    };

    const record = await pb.collection("users").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//..............Student.....................

//fetching all Students
export const getStudents = async () => {
  try {
    const records = await pb.collection("student").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//student update
export const updateStudent = async (
  id,
  name,
  student_id,
  grade,
  blood_group,
  age,
  address,
  guardian_name
) => {
  try {
    const data = {
      name: name,
      student_id: student_id,
      grade: grade,
      blood_group: blood_group,
      age: age,
      address: address,
      guardian_name: guardian_name,
    };

    const record = await pb.collection("student").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Student Addition
export const createStudent = async (
  name,
  student_id,
  grade,
  blood_group,
  age,
  address,
  guardian_name
) => {
  try {
    const data = {
      name: name,
      student_id: student_id,
      grade: grade,
      blood_group: blood_group,
      age: age,
      address: address,
      guardian_name: guardian_name,
    };

    const record = await pb.collection("student").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Student
export const deleteStudent = async (id) => {
  try {
    await pb.collection("student").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//........................Teacher...................

//fetching all Teachers
export const getTeachers = async () => {
  try {
    const records = await pb.collection("teacher").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Teacher update
export const updateTeacher = async (
  id,
  name,
  departement,
  designation,
  age
) => {
  try {
    const data = {
      name: name,
      departement: departement,
      designation: designation,
      age: age,
    };

    const record = await pb.collection("teacher").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Teacher Addition
export const createTeacher = async (name, departement, designation, age) => {
  try {
    const data = {
      name: name,
      departement: departement,
      designation: designation,
      age: age,
    };

    const record = await pb.collection("teacher").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Teacher
export const deleteTeacher = async (id) => {
  try {
    await pb.collection("teacher").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//........................Courses...................

//Fetching all Courses
export const getCourses = async () => {
  try {
    const records = await pb.collection("course").getFullList({
      sort: "-created",
      expand: "assigned_teacher, student_taken",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Course details update
export const updateCourse = async (
  id,
  course_name,
  assigned_teacher, // type=array=[assigned_teacher]
  student_taken // type=array=[student_taken]
) => {
  try {
    const data = {
      course_name: course_name,
      assigned_teacher: assigned_teacher,
      student_taken: student_taken,
    };

    const record = await pb.collection("course").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Course details assignTeacher
export const assignTeacherUpdate = async (
  id,
  assigned_teacher // type=array=[assigned_teacher]
) => {
  try {
    const data = {
      assigned_teacher: assigned_teacher,
    };

    const record = await pb.collection("course").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Course details Student Taken
export const StudentTakenUpdate = async (
  id,
  student_taken // type=array=[student_taken]
) => {
  try {
    const data = {
      student_taken: student_taken,
    };

    const record = await pb.collection("course").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Course Addition
export const createCourse = async (course_name) => {
  try {
    const data = {
      course_name: course_name,
    };

    const record = await pb.collection("course").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Course
export const deleteCourse = async (id) => {
  try {
    await pb.collection("course").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//........................Students Attendance...................

//Fetching all Student attendance
export const getStudentAttendance = async () => {
  try {
    const records = await pb.collection("student_attendance").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Fetching all Student attendance by date
export const studentAttendanceByDate = async (date) => {
  try {
    const resultList = await pb.collection("student_attendance").getFullList({
      filter: `date ~ "${date}"`,
      expand: "student",
    });
    return resultList;
  } catch (e) {
    console.log(e);
  }
};

//Student Attendance update
export const updateStudentAttendance = async (
  id,
  date, //date type variable
  student, // type=array=[student_taken]
  grade
) => {
  try {
    const data = {
      date: date,
      student: student,
      grade: grade,
    };

    const record = await pb.collection("student_attendance").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Student attendance creation for another date
export const createStudentAttendance = async (
  date, //date type variable
  student, // type=array=[student_taken]
  grade
) => {
  try {
    const data = {
      date: date,
      student: student,
      grade: grade,
    };

    const record = await pb.collection("student_attendance").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete Student Attendance
export const deleteStudentAttendance = async (id) => {
  try {
    const record = await pb.collection("student_attendance").delete(id);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//........................Teacher Attendance...................

//Fetching all Teachers attendance
export const getTeacherAttendance = async () => {
  try {
    const records = await pb.collection("student_attendance").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Fetching all Teachers attendance by date
export const teacherAttendanceByDate = async (date) => {
  try {
    const resultList = await pb.collection("teacher_attendance").getFullList({
      filter: `date ~ "${date}"`,
      expand: "teacher",
    });
    return resultList;
  } catch (e) {
    console.log(e);
  }
};

//Teachers attendance delete
export const deleteTeacherAttendance = async (id) => {
  try {
    const record = await pb.collection("teacher_attendance").delete(id);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Teachers attendance creation for another date
export const createTeacherAttendance = async (
  date, //date type variable
  teacher // teacher id
) => {
  try {
    const data = {
      date: date,
      teacher: teacher,
    };

    const record = await pb.collection("teacher_attendance").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//........................Grade Sheet...................

//Fetching all Grade Sheet
export const getGradeSheet = async (studentid) => {
  try {
    const records = await pb.collection("grade_sheet").getFullList({
      sort: "-created",
      filter: `student ~ "${studentid}"`,
      expand: "student,course",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Grade Sheet details update
export const updateGradeSheet = async (id, marks) => {
  try {
    const data = {
      marks: marks,
    };

    const record = await pb.collection("grade_sheet").update(id, data, {
      expand: "student",
    });
    return record;
  } catch (e) {
    console.log(e);
  }
};

//New Grade Sheet Addition
export const createGradeSheet = async (
  marks,
  student, // type=array=[student]
  course
) => {
  try {
    const data = {
      marks: marks,
      student: student,
      course: course,
    };

    const record = await pb.collection("grade_sheet").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Grade Sheet
export const deleteGradeSheet = async (id) => {
  try {
    await pb.collection("grade_sheet").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//Query Completed
