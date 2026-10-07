import { Router } from "express";
import {
  getBooks,
  createBookController,
  getBook,
  updateBookController,
  deleteBookController,
  issueBookController,
  returnBookController,
  getBookIssues,
  getBookIssue,
  getActiveIssues,
  getOverdueIssues,
} from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);

router.post("/", createBookController);

router.get("/issues", getBookIssues);
router.get("/issues/active", getActiveIssues);
router.get("/issues/overdue", getOverdueIssues);
router.get("/issues/:id", getBookIssue);

router.post("/issues", issueBookController);
router.post("/issues/:id/return", returnBookController);

router.get("/:id", getBook);
router.put("/:id", updateBookController);
router.delete("/:id", deleteBookController);

export default router;