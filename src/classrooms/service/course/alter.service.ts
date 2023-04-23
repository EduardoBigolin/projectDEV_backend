import { CourseDTO } from "../../dtos/Course.dto";
import CourseRepos from "../../repositories/Course.prisma";
import { ResponseServer } from "../../response";

export default class AlterCourseService {
  constructor(private repos: CourseRepos) {}
  public validateData(data: CourseDTO) {
    if (!data.educationLevelId) {
      throw new Error("Education level is required");
    }
    if (!data.id) {
      throw new Error("Id is required");
    }
    if (!data.name) {
      throw new Error("Name is required");
    }
    if (!data.name.trim()) {
      throw new Error("Name is required");
    }
    if (data.name.length > 100) {
      throw new Error("Name is too long");
    }
    if (data.name.length < 3) {
      throw new Error("Name is too short");
    }
  }

  public async alter(data: CourseDTO): Promise<ResponseServer<any>> {
    try {
      
      this.validateData(data);
      const exist = await this.repos.getCourse(data.id as string);
      if (!exist) {
        throw new Error("Course not found");
      }
      
      const returnValue = await this.repos.updateCourse(data);

      return {
        statusCode: 200,
        body: {
          message: "Course updated with success",
          data: returnValue,
        },
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
}
