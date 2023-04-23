import bcrypt from "bcrypt";

export class HASH {
  static async create(password: string, salt: number) {
    return await bcrypt.hash(password, 10);
  }
  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
