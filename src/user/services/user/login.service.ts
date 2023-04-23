import config from "../../../../config/config";
import { HASH } from "../../../utils/hash";
import { JWT } from "../../../utils/jwt";
import UserRepos from "../../user.repos";

interface loginData {
  email: string;
  password: string;
}

export default class LoginUserService {
  constructor(private readonly repos: UserRepos) {}

  async execute(data: loginData) {
    try {
      const existEmail = await this.repos.findByEmail(data.email);
      if (!existEmail) {
        throw new Error("Email not found");
      }

      const isPassword = await HASH.compare(
        data.password,
        existEmail.password as string
      );

      if (!isPassword) {
        throw new Error("Password incorrect");
      }

      const payLoad = {
        id: existEmail.id,
        name: existEmail.name,
        email: existEmail.email,
        isAdmin: existEmail.isAdmin,
      };
      const token = await JWT.create(payLoad, config.JWT_TOKEN, "1d");

      return {
        statusCode: 200,
        body: {
          message: "Login successfully",
          isAdmin: existEmail.isAdmin ? "ADMIN" : "USER",
          id: existEmail.id,
          token,
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
