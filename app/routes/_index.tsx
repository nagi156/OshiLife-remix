import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Oshi Life" },
    { name: "description", content: "Oshi Life" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>一覧</h1>
    </>
  );
}
