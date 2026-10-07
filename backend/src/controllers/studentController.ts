import { Request, Response } from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

function parseId(value: unknown): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function getStudents(
  _req: Request,
  res: Response
) {
  try {
    const students = await getAllStudents();

    return res.json(students);
  } catch (error) {
    console.error("Get students error:", error);

    return res.status(500).json({
      message: "Failed to fetch students",
    });
  }
}

export async function getStudent(
  req: Request,
  res: Response
) {
  try {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.json(student);
  } catch (error) {
    console.error("Get student error:", error);

    return res.status(500).json({
      message: "Failed to fetch student",
    });
  }
}

export async function createStudentRecord(
  req: Request,
  res: Response
) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      batch,
      gender,
      dob,
      address,
      status,
      feesStatus,
      admissionDate,
      rollNo,
      parentName,
      parentPhone,
      courseId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !batch ||
      !gender ||
      !dob ||
      !address ||
      !status ||
      !feesStatus ||
      !admissionDate ||
      !rollNo ||
      !parentName ||
      !parentPhone
    ) {
      return res.status(400).json({
        message: "All required student fields must be provided",
      });
    }

    const parsedDob = parseDate(dob);
    const parsedAdmissionDate = parseDate(admissionDate);

    if (!parsedDob || !parsedAdmissionDate) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    let parsedCourseId: number | null = null;

    if (
      courseId !== undefined &&
      courseId !== null &&
      courseId !== ""
    ) {
      parsedCourseId = parseId(courseId);

      if (parsedCourseId === null) {
        return res.status(400).json({
          message: "Invalid courseId",
        });
      }
    }

    const student = await createStudent({
      firstName,
      lastName,
      email,
      phone,
      batch,
      gender,
      dob: parsedDob,
      address,
      status,
      feesStatus,
      admissionDate: parsedAdmissionDate,
      rollNo,
      parentName,
      parentPhone,
      courseId: parsedCourseId,
    });

    return res.status(201).json(student);
  } catch (error) {
    console.error("Create student error:", error);

    return res.status(500).json({
      message: "Failed to create student",
    });
  }
}

export async function updateStudentRecord(
  req: Request,
  res: Response
) {
  try {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const body = req.body;

    const data: Record<string, unknown> = {};

    const stringFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "batch",
      "gender",
      "address",
      "status",
      "feesStatus",
      "rollNo",
      "parentName",
      "parentPhone",
    ];

    for (const field of stringFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    if (body.dob !== undefined) {
      const date = parseDate(body.dob);

      if (!date) {
        return res.status(400).json({
          message: "Invalid date of birth",
        });
      }

      data.dob = date;
    }

    if (body.admissionDate !== undefined) {
      const date = parseDate(body.admissionDate);

      if (!date) {
        return res.status(400).json({
          message: "Invalid admission date",
        });
      }

      data.admissionDate = date;
    }

    if (body.courseId !== undefined) {
      if (body.courseId === null || body.courseId === "") {
        data.courseId = null;
      } else {
        const courseId = parseId(body.courseId);

        if (courseId === null) {
          return res.status(400).json({
            message: "Invalid courseId",
          });
        }

        data.courseId = courseId;
      }
    }

    const student = await updateStudent(
      id,
      data as Parameters<typeof updateStudent>[1]
    );

    return res.json(student);
  } catch (error) {
    console.error("Update student error:", error);

    return res.status(500).json({
      message: "Failed to update student",
    });
  }
}

export async function deleteStudentRecord(
  req: Request,
  res: Response
) {
  try {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    await deleteStudent(id);

    return res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);

    return res.status(500).json({
      message: "Failed to delete student",
    });
  }
}