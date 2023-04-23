import { PrismaClient } from "@prisma/client";
import { HASH } from "./src/utils/hash";
import { password } from "promptly";
import ClassRoomPrismaRepos from "./src/classrooms/repositories/ClassRoom.prisma";
import UserPrismaRepos from "./src/user/repositories/user.prisma";
import CreateAdminService from "./src/user/services/admin/create.service";

const prisma = new PrismaClient();

async function main() {
  try {
    const EducationLevel = await prisma.educationLevel.create({
      data: {
        name: "ADMIN",
      },
    });

    const Course = await prisma.couser.create({
      data: {
        name: "ADMIN",
        educationLevelId: EducationLevel.id,
      },
    });
    const ClassRoom = await prisma.classRoom.create({
      data: {
        name: "ADMIN",
        lunch: JSON.stringify([
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
        ]),
        couserId: Course.id,
      },
    });
    ClassRoom.id;

    const CreateUserService = new CreateAdminService(
      new UserPrismaRepos(),
      new ClassRoomPrismaRepos()
    ).create({
      name: "ADMIN",
      email: "ADMIN@ADMIN.COM",
      password: "ADMIN",
      photoFile: "ADMIN",
      dateOfBirth: "2021-01-01",
      isAdmin: true,
      isActived: true,
      classId: ClassRoom.id,
    });

    console.log(
      `
    User Created with success,
    Your credential for login is  email: ${CreateUserService} and your register
    `
    );
  } catch (error: any) {
    console.error(`
      Fatal Error: ${error.message}
  `);
  }
}
main();
