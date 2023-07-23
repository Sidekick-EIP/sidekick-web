import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <p className="p-16">This is the home page</p>
      {session.data && <p className="p-16">You are logged in as {session.data?.user.email}</p>}
    </div>
  );
}