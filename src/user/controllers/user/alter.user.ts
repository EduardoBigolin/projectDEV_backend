import { Request, Response } from "express";
import UserPrismaRepos from "../../repositories/user.prisma";
import DeleteUserService from "../../services/user/delete.service";
import AlterUserService from "../../services/user/alter.service";

export default class AlertUser {
  public static async alert(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ message: "unauthorized for this function" });
    }
    const { id } = req.params;
    const { dateOfBirth, classId, password, email, name } = req.body;

    const repos = new UserPrismaRepos();
    const service = new AlterUserService(repos);
    const response = await service.execute({
      dateOfBirth,
      classId,
      password,
      email,
      name,
      id,
    });

    res.status(response.statusCode).json(response.body);
  }
}
