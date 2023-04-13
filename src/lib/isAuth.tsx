import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import Auth from "../components/Auth/Auth";

export default function Home({ children, session }: any) {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <main>
      {session?.user?.username ? (
        <>{children}</>
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
