import Head from "next/head";
import { Inter } from "@next/font/google";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { NextPage, NextPageContext } from "next";
import Chat from "../components/Chat/Chat";
import Auth from "../components/Auth/Auth";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  console.log(status, session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <>
      <main className={inter.className + " min-h-screen w-full"}>
        {session?.user?.username ? (
          <Chat session={session} />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
      </main>
    </>
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
