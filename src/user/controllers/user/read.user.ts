import { Request, Response } from "express";
import UserPrismaRepos from "../../repositories/user.prisma";
import ReadUserService from "../../services/user/read.service";

export default class ReadUser {
  public static async unique(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ message: "unauthorized for this function" });
    }
    const { id } = req.params;

    const repos = new UserPrismaRepos();
    const service = new ReadUserService(repos);
    const response = await service.uniquie(id);

    res.status(response.statusCode).json(response.body);
  }

  public static async all(req: Request, res: Response) {
    const repos = new UserPrismaRepos();
    const service = new ReadUserService(repos);
    const response = await service.all();

    res.status(response.statusCode).json(response.body);
  }
}
