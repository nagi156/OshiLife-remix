import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Oshi Life" },
    { name: "description", content: "Oshi Life" },
  ];
};

export default function Index() {
  return (
    <>
      {/* OshiLifeのTopページになる予定 */}
      <h1>Oshi Life</h1>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/users">Users Index</Link>
      </div>
    </>
  );
}
