import { Request, Response } from "express";
import UserPrismaRepos from "../../repositories/user.prisma";
import CreateUserService from "../../services/user/create.service";
import ClassRoomPrismaRepos from "../../../classrooms/repositories/ClassRoom.prisma";

export default class CreateUser {
  public static async create(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ message: "unauthorized for this function" });
    }
    const { name, dateOfBirth, email, password, classId } = req.body;
    const file = {
      file: req.file?.buffer,
      filename: req.file?.originalname,
      mimetype: req.file?.mimetype,
    };

    const repos = new UserPrismaRepos();
    const classRoomRepos = new ClassRoomPrismaRepos();
    const service = new CreateUserService(repos, classRoomRepos);
    const response = await service.create({
      isActived: true,
      name,
      dateOfBirth,
      email,
      password,
      photoFile: file.file?.toString("base64"),
      isAdmin: false,
      classId,
    });

    res.status(response.statusCode).json(response.body);
  }
}
