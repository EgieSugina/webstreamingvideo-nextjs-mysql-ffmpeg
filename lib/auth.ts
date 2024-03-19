import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import M_User from "@/db/models/m_user";
import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
// import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user: any = await M_User.findOne({
          where: {
            email: credentials.email
          }
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          email: user.email,
          name: `${user.fullname} (${user.username})`,
          image: user.img,
          role: user.role,
          id: user.user_id,
          key: uuidv4()
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          key: token.key,
          role: token.role
        }
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          key: u.key,
          role: u.role
        };
      }
      return token;
    }
  }
};
