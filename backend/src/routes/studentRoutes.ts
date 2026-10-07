import { Router } from "express";

import {
  getStudents,
  getStudent,
  createStudentRecord,
  updateStudentRecord,
  deleteStudentRecord,
} from "../controllers/studentController";

const router = Router();

// GET /api/students
router.get("/", getStudents);

// GET /api/students/:id
router.get("/:id", getStudent);

// POST /api/students
router.post("/", createStudentRecord);

// PUT /api/students/:id
router.put("/:id", updateStudentRecord);

// DELETE /api/students/:id
router.delete("/:id", deleteStudentRecord);

export default router;