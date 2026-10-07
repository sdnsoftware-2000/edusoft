import { Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
  getAllBookIssues,
  getBookIssueById,
  getActiveBookIssues,
  getOverdueBookIssues,
} from "../services/bookService";

export async function getBooks(req: Request, res: Response) {
  try {
    const books = await getAllBooks();

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    res.status(500).json({
      message: "Failed to fetch books",
    });
  }
}

export async function createBookController(
  req: Request,
  res: Response
) {
  try {
    const book = await createBook(req.body);

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);

    res.status(500).json({
      message: "Failed to create book",
    });
  }
}

export async function getBook(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const book = await getBookById(id);

    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
      return;
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);

    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
}

export async function updateBookController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const book = await updateBook(id, req.body);

    res.json(book);
  } catch (error) {
    console.error("Error updating book:", error);

    res.status(500).json({
      message: "Failed to update book",
    });
  }
}

export async function deleteBookController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    await deleteBook(id);

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    res.status(500).json({
      message: "Failed to delete book",
    });
  }
}

export async function issueBookController(
  req: Request,
  res: Response
) {
  try {
    const issue = await issueBook({
      bookId: Number(req.body.bookId),
      memberId: Number(req.body.memberId),
      memberType: req.body.memberType,
      memberName: req.body.memberName,
      issueDate: new Date(req.body.issueDate),
      dueDate: new Date(req.body.dueDate),
      finePerDay: req.body.finePerDay
        ? Number(req.body.finePerDay)
        : 5,
    });

    res.status(201).json(issue);
  } catch (error) {
    console.error("Error issuing book:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to issue book";

    res.status(400).json({
      message,
    });
  }
}

export async function returnBookController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const returnDate = req.body.returnDate
      ? new Date(req.body.returnDate)
      : new Date();

    const issue = await returnBook(id, returnDate);

    res.json(issue);
  } catch (error) {
    console.error("Error returning book:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to return book";

    res.status(400).json({ message });
  }
}

export async function getBookIssues(
  req: Request,
  res: Response
) {
  try {
    const issues = await getAllBookIssues();
    res.json(issues);
  } catch (error) {
    console.error("Error fetching book issues:", error);
    res.status(500).json({
      message: "Failed to fetch book issues",
    });
  }
}

export async function getBookIssue(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const issue = await getBookIssueById(id);

    if (!issue) {
      res.status(404).json({
        message: "Book issue not found",
      });
      return;
    }

    res.json(issue);
  } catch (error) {
    console.error("Error fetching book issue:", error);
    res.status(500).json({
      message: "Failed to fetch book issue",
    });
  }
}

export async function getActiveIssues(
  req: Request,
  res: Response
) {
  try {
    const issues = await getActiveBookIssues();
    res.json(issues);
  } catch (error) {
    console.error("Error fetching active issues:", error);
    res.status(500).json({
      message: "Failed to fetch active issues",
    });
  }
}

export async function getOverdueIssues(
  req: Request,
  res: Response
) {
  try {
    const issues = await getOverdueBookIssues();
    res.json(issues);
  } catch (error) {
    console.error("Error fetching overdue issues:", error);
    res.status(500).json({
      message: "Failed to fetch overdue issues",
    });
  }
}