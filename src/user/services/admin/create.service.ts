import ClassRoomRepos from "../../../classrooms/classRoom.repos";
import { HASH } from "../../../utils/hash";
import { ResponseServer } from "../../response";
import { UserDTO } from "../../user.dto";
import UserRepos from "../../user.repos";

export default class CreateAdminService {
  private userRepos: UserRepos;
  private classRoomRepos: ClassRoomRepos;

  constructor(userRepos: UserRepos, classRoomRepos: ClassRoomRepos) {
    this.userRepos = userRepos;
    this.classRoomRepos = classRoomRepos;
  }

  private validate(user: UserDTO) {
    if (!user.name) {
      throw new Error("Name is required");
    }
    if (!user.email) {
      throw new Error("Email is required");
    }
    if (!user.password) {
      throw new Error("Password is required");
    }
    if (!user.dateOfBirth) {
      throw new Error("Date of birth is required");
    }
    if (!user.classId) {
      throw new Error("Class is required");
    }
  }

  async create(user: UserDTO): Promise<ResponseServer<any>> {
    try {
      this.validate(user);
      const existClassRoom = await this.classRoomRepos.findById(user.classId);
      if (!existClassRoom) {
        throw new Error("Class not found");
      }

      const exist = await this.userRepos.findByEmail(user.email);
      if (exist) {
        throw new Error("Email already exists");
      }

      const inputUser: UserDTO = {
        name: user.name,
        email: user.email,
        password: await HASH.create(user.password, 10),
        photoFile: user.photoFile,
        dateOfBirth: new Date(Date.now()),
        isAdmin: user.isAdmin,
        isActived: true,
        classId: user.classId,
      };
      const newUser = await this.userRepos.create(inputUser);

      const payLoad = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      };
      return {
        statusCode: 201,
        body: { message: newUser },
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
}
