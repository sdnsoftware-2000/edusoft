import { prisma } from "../config/prisma";

export async function getAllStudents() {
  return prisma.student.findMany({
    include: {
      course: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function getStudentById(id: number) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });
}

export async function createStudent(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  batch: string;
  gender: string;
  dob: Date;
  address: string;
  status: string;
  feesStatus: string;
  admissionDate: Date;
  rollNo: string;
  parentName: string;
  parentPhone: string;
  courseId?: number | null;
}) {
  return prisma.student.create({
    data,
    include: {
      course: true,
    },
  });
}

export async function updateStudent(
  id: number,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    batch: string;
    gender: string;
    dob: Date;
    address: string;
    status: string;
    feesStatus: string;
    admissionDate: Date;
    rollNo: string;
    parentName: string;
    parentPhone: string;
    courseId: number | null;
  }>
) {
  return prisma.student.update({
    where: { id },
    data,
    include: {
      course: true,
    },
  });
}

export async function deleteStudent(id: number) {
  return prisma.student.delete({
    where: { id },
  });
}