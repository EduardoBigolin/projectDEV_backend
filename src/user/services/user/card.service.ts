import UserRepos from "../../user.repos";

export default class CardUserService {
  constructor(private readonly repos: UserRepos) {}

  private validate(id: string) {
    if (!id) {
      throw new Error("Id is required");
    }
  }

  async execute(id: string): Promise<any> {
    try {
      this.validate(id);
      const result = await this.repos.findByCard(id);
      console.log(result);

      const FinalReturn = {
        name: result?.name,
        group: result?.class.name,
        dateOfBirth: result?.dateOfBirth,
        link: `http://localhost:${5173}/card/public/${result?.id}`,
        course: result?.class.Couser.name,
        photo: result?.photoFile,
        lunch: result?.class.lunch,
      };
      return {
        statusCode: 200,
        body: { message: FinalReturn },
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { message: error.message },
      };
    }
  }
}
