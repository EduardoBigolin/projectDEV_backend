import { UserDTO } from "../../user.dto";
import UserRepos from "../../user.repos";

export default class AlterUserService {
  constructor(private readonly repos: UserRepos) {}

  private validate(user: UserDTO) {
    if (!user.name) {
      throw new Error("Name is required");
    }
    if (!user.email) {
      throw new Error("Email is required");
    }
    if (!user.dateOfBirth) {
      throw new Error("Date of birth is required");
    }
    if (!user.classId) {
      throw new Error("Class is required");
    }
  }

  async execute(data: UserDTO): Promise<any> {
    try {
      this.validate(data);
      const result = await this.repos.update(data);
      return {
        statusCode: 200,
        body: { message: result },
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
}
