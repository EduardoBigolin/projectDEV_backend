import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../user.dto";
import UserRepos from "../user.repos";

const prisma = new PrismaClient();

export default class UserPrismaRepos implements UserRepos {
  async findByCard(id: string): Promise<UserDTO | null> {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        class: {
          include: {
            Couser: {
              include: {
                educationLevel: true,
              },
            },
          },
        },
      },
    });

    const finalData: any = {
      ...data,
      class: {
        ...data?.class,
        lunch: JSON.parse(data?.class.lunch as string),
      },
    };

    return finalData;
  }
  async create(data: UserDTO): Promise<UserDTO> {
    console.log(data);

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password as string,
        photoFile: data.photoFile as string,
        dateOfBirth: data.dateOfBirth,
        isAdmin: data.isAdmin as boolean,
        isActived: true,
        classId: data.classId,
      },
    });
  }
  async update(data: UserDTO): Promise<UserDTO> {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        isAdmin: data.isAdmin,
        isActived: true,
        classId: data.classId,
      },
    });
    return data;
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async findById(id: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        class: {
          include: {
            Couser: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return user;
  }
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async findAll(): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      include: {
        class: {
          select: {
            name: true,
            Couser: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return users;
  }
}
