import { CourseDTO } from "../dtos/Course.dto";
import CourseRepos from "../course.repos";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class CoursePrismaRepos implements CourseRepos {
  async getCoursesByName(name: string): Promise<CourseDTO | null> {
    const result = await prisma.couser.findUnique({
      where: {
        name,
      },
    });
    return result;
  }
  async createCourse(Course: CourseDTO): Promise<CourseDTO> {
    const result = await prisma.couser.create({
      data: {
        name: Course.name,
        educationLevelId: Course.educationLevelId,
      },
    });
    return result;
  }
  async deleteCourse(id: string): Promise<void> {
    await prisma.couser.delete({
      where: {
        id,
      },
    });
  }

  async getCourse(id: string): Promise<CourseDTO | null> {
    const result = await prisma.couser.findUnique({
      where: {
        id,
      },
    });
    return result;
  }
  async getCourses(): Promise<CourseDTO[]> {
    const result = await prisma.couser.findMany({
      include: {
        educationLevel: {
          select: {
            name: true,
          },
        },
      },
    });
    return result;
  }
  async updateCourse(Course: CourseDTO): Promise<CourseDTO> {
    const result = await prisma.couser.update({
      where: {
        id: Course.id,
      },
      data: {
        name: Course.name,
        educationLevelId: Course.educationLevelId
      },
    });
    return result;
  }
}
