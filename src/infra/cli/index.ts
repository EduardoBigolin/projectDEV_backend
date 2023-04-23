import inquirer from "inquirer";
import UserPrismaRepos from "../../user/repositories/user.prisma";
import { randomUUID } from "crypto";
import CreateAdminService from "../../user/services/admin/create.service";
import ClassRoomPrismaRepos from "../../classrooms/repositories/ClassRoom.prisma";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Instanciar o PrismaClient
// const prisma = new PrismaClient();

const resposta = inquirer.prompt([
  {
    type: "input",
    name: "nome",
    message: "Digite o nome do admin:",
  },
  {
    type: "input",
    name: "email",
    message: "Digite o email do admin:",
  },
  {
    type: "password",
    name: "senha",
    message: "Digite a senha do admin:",
  },
  {
    type: "input",
    name: "dataDeAniversario",
    message: "Digite a data de aniversário do admin (YYYY-MM-DD):",
  },
]);

resposta.then(async (answers) => {
  try {
    const classes = await prisma.classRoom.findFirst();
    const result = await prisma.user.create({
      data: {
        name: answers.nome,
        email: answers.email,
        password: answers.senha as string,
        photoFile: "ADMIN",
        dateOfBirth: answers.dataDeAniversario,
        isAdmin: true,
        isActived: true,
        classId: classes?.id as string,
      },
    });

    console.log(`
    User Created with success,
    Your credential for login is  email: ${answers.email} and your register
    `);
  } catch (error: any) {
    console.error(`
      Fatal Error: ${error.message}
  `);
  }
});
