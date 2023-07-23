import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <p>
        {JSON.stringify(data ?? "")}
      </p>
      <p className="p-16">profile !!</p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);

  return {
    props: {
    }
  }
}