import { Request, Response } from "express";
import UserPrismaRepos from "../../repositories/user.prisma";
import DeleteUserService from "../../services/user/delete.service";

export default class DeleteUser {
  public static async delete(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ message: "unauthorized for this function" });
    }
    const { id } = req.params;

    const repos = new UserPrismaRepos();
    const service = new DeleteUserService(repos);
    const response = await service.execute(id);

    res.status(response.statusCode).json(response.body);
  }
}
