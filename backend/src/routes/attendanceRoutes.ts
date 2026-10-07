import { Router } from "express";
import {
  getAttendance,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  saveAttendanceBulkRecord,
} from "../controllers/attendanceController";

const router = Router();

// GET /api/attendance
// GET /api/attendance?date=2026-10-05
// GET /api/attendance?studentId=1
router.get("/", getAttendance);

// POST /api/attendance
router.post("/", createAttendanceRecord);

// POST /api/attendance/bulk
router.post("/bulk", saveAttendanceBulkRecord);

// PUT /api/attendance/:id
router.put("/:id", updateAttendanceRecord);

// DELETE /api/attendance/:id
router.delete("/:id", deleteAttendanceRecord);



export default router;