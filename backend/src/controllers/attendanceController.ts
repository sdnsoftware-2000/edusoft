import { Request, Response } from "express";
import {
  getAllAttendance,
  getAttendanceByDate,
  getAttendanceByStudent,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  saveAttendanceBulk,
} from "../services/attendanceService";

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

function parseId(value: unknown): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export async function getAttendance(req: Request, res: Response) {
  try {
    const { date, studentId } = req.query;

    if (studentId !== undefined) {
      const id = parseId(studentId);

      if (id === null) {
        return res.status(400).json({
          message: "Invalid studentId",
        });
      }

      const attendance = await getAttendanceByStudent(id);
      return res.json(attendance);
    }

    if (date !== undefined) {
      const parsedDate = parseDate(date);

      if (!parsedDate) {
        return res.status(400).json({
          message: "Invalid date",
        });
      }

      const attendance = await getAttendanceByDate(parsedDate);
      return res.json(attendance);
    }

    const attendance = await getAllAttendance();

    return res.json(attendance);
  } catch (error) {
    console.error("Get attendance error:", error);

    return res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
}

export async function createAttendanceRecord(
  req: Request,
  res: Response
) {
  try {
    const { studentId, date, status } = req.body;

    const parsedStudentId = parseId(studentId);
    const parsedDate = parseDate(date);

    if (parsedStudentId === null) {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    if (!parsedDate) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    if (!status || typeof status !== "string") {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const attendance = await createAttendance({
      studentId: parsedStudentId,
      date: parsedDate,
      status,
    });

    return res.status(201).json(attendance);
  } catch (error) {
    console.error("Create attendance error:", error);

    return res.status(500).json({
      message: "Failed to create attendance",
    });
  }
}

export async function updateAttendanceRecord(
  req: Request,
  res: Response
) {
  try {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        message: "Invalid attendance ID",
      });
    }

    const { date, status } = req.body;

    const parsedDate =
      date !== undefined ? parseDate(date) : undefined;

    if (date !== undefined && !parsedDate) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    if (status !== undefined && typeof status !== "string") {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const attendance = await updateAttendance(id, {
      ...(parsedDate ? { date: parsedDate } : {}),
      ...(status !== undefined ? { status } : {}),
    });

    return res.json(attendance);
  } catch (error) {
    console.error("Update attendance error:", error);

    return res.status(500).json({
      message: "Failed to update attendance",
    });
  }
}

export async function deleteAttendanceRecord(
  req: Request,
  res: Response
) {
  try {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        message: "Invalid attendance ID",
      });
    }

    await deleteAttendance(id);

    return res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("Delete attendance error:", error);

    return res.status(500).json({
      message: "Failed to delete attendance",
    });
  }
}

export async function saveAttendanceBulkRecord(
  req: Request,
  res: Response
) {
  try {
    const { date, studentIds, records } = req.body;

    const parsedDate = parseDate(date);

    if (!parsedDate) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        message: "studentIds must be a non-empty array",
      });
    }

    if (!Array.isArray(records)) {
      return res.status(400).json({
        message: "records must be an array",
      });
    }

    const parsedStudentIds = studentIds.map((id: unknown) =>
      parseId(id)
    );

    if (parsedStudentIds.some((id) => id === null)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const parsedRecords = records.map(
      (record: { studentId: unknown; status: unknown }) => ({
        studentId: parseId(record.studentId),
        status: record.status,
      })
    );

    if (
      parsedRecords.some(
        (record) =>
          record.studentId === null ||
          typeof record.status !== "string"
      )
    ) {
      return res.status(400).json({
        message: "Invalid attendance record",
      });
    }

    const attendance = await saveAttendanceBulk({
      date: parsedDate,
      studentIds: parsedStudentIds as number[],
      records: parsedRecords as {
        studentId: number;
        status: string;
      }[],
    });

    return res.json(attendance);
  } catch (error) {
    console.error("Save bulk attendance error:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to save attendance",
    });
  }
}