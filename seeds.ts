import { log } from "console";
import ClassRoomPrismaRepos from "./src/classrooms/repositories/ClassRoom.prisma";
import CoursePrismaRepos from "./src/classrooms/repositories/Course.prisma";
import EducationLevelPrismaRepos from "./src/classrooms/repositories/educationLevel.prisma";
import UserPrismaRepos from "./src/user/repositories/user.prisma";
import CreateUserService from "./src/user/services/user/create.service";

const seeds = async () => {
  const classRoomRepos = new ClassRoomPrismaRepos();
  const UserRepos = new UserPrismaRepos();
  const educationLevelPrismaRepos = new EducationLevelPrismaRepos();
  const coursePrismaRepos = new CoursePrismaRepos();
  const classRoomPrismaRepos = new ClassRoomPrismaRepos();
  try {
    const educationLevel = await educationLevelPrismaRepos.createEducationLevel(
      {
        name: "Graduação013",
      }
    );

    const course = await coursePrismaRepos.createCourse({
      name: "ADMINISTRAÇÃO",
      educationLevelId: educationLevel.id as any,
    });

    const classRoom = await classRoomPrismaRepos.createClassRoom({
      name: "2º ANO",
      couserId: course.id as any,
      lunch: JSON.stringify(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
    });

    const service = new CreateUserService(UserRepos, classRoomRepos);

    const response = await service.create({
      isActived: true,
      name: "admin",
      dateOfBirth: new Date("2021-01-01"),
      email: "ADMIN@ADMIN.COM",
      password: "123456",
      photoFile: "https://www.google.com",
      isAdmin: true,
      classId: classRoom.couserId,
    });
    console.log(response.body);
  } catch (error: any) {
    console.log(error)
  }
};
seeds();
