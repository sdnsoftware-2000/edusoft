import { prisma } from "../config/prisma";

export async function getAllAttendance() {
  return prisma.attendance.findMany({
    include: {
      student: true,
    },
    orderBy: [
      { date: "desc" },
      { studentId: "asc" },
    ],
  });
}

export async function getAttendanceByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      student: true,
    },
    orderBy: {
      studentId: "asc",
    },
  });
}

export async function getAttendanceByStudent(studentId: number) {
  return prisma.attendance.findMany({
    where: {
      studentId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function createAttendance(data: {
  studentId: number;
  date: Date;
  status: string;
}) {
  return prisma.attendance.create({
    data: {
      studentId: data.studentId,
      date: data.date,
      status: data.status,
    },
  });
}

export async function updateAttendance(
  id: number,
  data: {
    status?: string;
    date?: Date;
  }
) {
  return prisma.attendance.update({
    where: { id },
    data,
  });
}

export async function deleteAttendance(id: number) {
  return prisma.attendance.delete({
    where: { id },
  });
}

export async function saveAttendanceBulk(data: {
  date: Date;
  studentIds: number[];
  records: {
    studentId: number;
    status: string;
  }[];
}) {
  return prisma.$transaction(async (tx) => {
    const studentIds = [...new Set(data.studentIds)];

    if (studentIds.length === 0) {
      throw new Error("No students selected");
    }

    const students = await tx.student.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (students.length !== studentIds.length) {
      throw new Error("One or more students do not exist");
    }

    await tx.attendance.deleteMany({
      where: {
        date: data.date,
        studentId: {
          in: studentIds,
        },
      },
    });

    if (data.records.length > 0) {
      await tx.attendance.createMany({
        data: data.records.map((record) => ({
          studentId: record.studentId,
          date: data.date,
          status: record.status,
        })),
      });
    }

    return tx.attendance.findMany({
      where: {
        date: data.date,
        studentId: {
          in: studentIds,
        },
      },
      include: {
        student: true,
      },
      orderBy: {
        studentId: "asc",
      },
    });
  });
}