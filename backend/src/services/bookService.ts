import { prisma } from "../config/prisma";

export async function getAllBooks() {
  return prisma.book.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function createBook(data: {
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
  category: string;
  edition?: string;
  total: number;
  available: number;
  rack?: string;
  price?: number;
}) {
  return prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      publisher: data.publisher,
      category: data.category,
      edition: data.edition,
      total: data.total,
      available: data.available,
      rack: data.rack,
      price: data.price,
    },
  });
}

export async function getBookById(id: number) {
  return prisma.book.findUnique({
    where: { id },
  });
}

export async function updateBook(
  id: number,
  data: {
    title?: string;
    author?: string;
    isbn?: string;
    publisher?: string;
    category?: string;
    edition?: string;
    total?: number;
    available?: number;
    rack?: string;
    price?: number;
  }
) {
  return prisma.book.update({
    where: { id },
    data,
  });
}

export async function deleteBook(id: number) {
  return prisma.book.delete({
    where: { id },
  });
}

export async function issueBook(data: {
  bookId: number;
  memberId: number;
  memberType: string;
  memberName: string;
  issueDate: Date;
  dueDate: Date;
  finePerDay?: number;
}) {
  return prisma.$transaction(async (tx) => {
    const book = await tx.book.findUnique({
      where: {
        id: data.bookId,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.available <= 0) {
      throw new Error("Book is not available");
    }

    const issue = await tx.bookIssue.create({
      data: {
        bookId: data.bookId,
        memberId: data.memberId,
        memberType: data.memberType,
        memberName: data.memberName,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        finePerDay: data.finePerDay ?? 5,
        fine: 0,
        fineCollected: 0,
        status: "active",
      },
    });

    await tx.book.update({
      where: {
        id: data.bookId,
      },
      data: {
        available: {
          decrement: 1,
        },
      },
    });

    return issue;
  });
}

export async function returnBook(id: number, returnDate: Date) {
  return prisma.$transaction(async (tx) => {
    const issue = await tx.bookIssue.findUnique({
      where: { id },
    });

    if (!issue) {
      throw new Error("Book issue not found");
    }

    if (issue.status === "returned") {
      throw new Error("Book already returned");
    }

    const dueDate = new Date(issue.dueDate);

    // Calculate overdue days
    const returnDay = new Date(returnDate);
    const dueDay = new Date(dueDate);

    returnDay.setHours(0, 0, 0, 0);
    dueDay.setHours(0, 0, 0, 0);

    const difference =
      returnDay.getTime() - dueDay.getTime();

    const overdueDays =
      difference > 0
        ? Math.ceil(difference / (1000 * 60 * 60 * 24))
        : 0;

    const fine =
      overdueDays * Number(issue.finePerDay);

    const updatedIssue = await tx.bookIssue.update({
      where: { id },
      data: {
        returnDate,
        fine,
        fineCollected: fine,
        status: "returned",
      },
    });

    await tx.book.update({
      where: { id: issue.bookId },
      data: {
        available: {
          increment: 1,
        },
      },
    });

    return updatedIssue;
  });
}

export async function getAllBookIssues() {
  return prisma.bookIssue.findMany({
    include: {
      book: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getBookIssueById(id: number) {
  return prisma.bookIssue.findUnique({
    where: { id },
    include: {
      book: true,
    },
  });
}

export async function getActiveBookIssues() {
  return prisma.bookIssue.findMany({
    where: {
      status: "active",
    },
    include: {
      book: true,
    },
    orderBy: {
      dueDate: "asc",
    },
  });
}

export async function getOverdueBookIssues() {
  const now = new Date();

  return prisma.bookIssue.findMany({
    where: {
      status: "active",
      dueDate: {
        lt: now,
      },
    },
    include: {
      book: true,
    },
    orderBy: {
      dueDate: "asc",
    },
  });
}