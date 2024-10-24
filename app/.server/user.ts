import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
});

//ToDo メアドの重複を確認する関数作る
// この関数は一意なメアドを見つける関数
export const findUserByEmail = async (
  prisma: Prisma.TransactionClient,
  { email }: { email: string }
) => {
  const dbUserEmail = await prisma.user.findUnique({
    where: { email },
    select: userSelect,
  });
  return dbUserEmail;
};

// ユーザー作成の関数
export const createUser = async (
  prisma: Prisma.TransactionClient,
  { name, email }: { name: string; email: string }
) => {
  const dbUser = await prisma.user.create({
    data: { name, email },
    select: userSelect,
  });
  return dbUser;
};

// export const getUser = async (prisma: Prisma.TransactionClient) => {
//   const users = await prisma.user.findMany({
//     select: userSelect,
//   });
//   return users;
// };
