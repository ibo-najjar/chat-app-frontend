import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          prompt: "consent",
        },
      },
    }),
  ],
  secret: "fsdukityr364835v4wedyuf78234vuydsf67234",
  callbacks: {
    // fire whenever session is checked
    async session({ session, token, user }) {
      console.log("in session callback");
      return { ...session, user: { ...session.user, ...user } };
    },
  },
});
