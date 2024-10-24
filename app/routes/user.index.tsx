import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/user";

export const loader = async () => {
  return await prisma.user.findMany();
};
const data = useLoaderData<typeof loader>();
export default function UsersIndex() {
  return (
    <>
      <div>
        <h1 className="bg-blue-300 text-yellow-50 w-100 h-100 text-center text-6xl">
          一覧
        </h1>

        <p>ユーザー一覧</p>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.name} / {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
