//メアドの重複を確認する関数作る
import { Prisma, PrismaClient } from "@prisma/client";

const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
});

export const findUserByEmail = async (
  prisma: Prisma.TransactionClient,
  { email }: { email: string }
) => {
  const dbUserEmail = await prisma.user.findUnique({
    where: { email },
    select: userSelect,
  });
};
