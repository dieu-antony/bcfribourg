import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req
      ) {
        const username = credentials?.username;
        const password = credentials?.password;
        const recaptchaToken = (req.body as { recaptchaToken?: string })?.recaptchaToken;

        if (!username || !password || !recaptchaToken) {
          console.warn("Missing credentials or reCAPTCHA token");
          return null;
        }

        try {
          const verifyRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            { method: "POST" }
          );

          const recaptcha = (await verifyRes.json()) as {
            success: boolean;
            score: number;
            action?: string;
            hostname?: string;
          };

          if (!recaptcha.success || recaptcha.score < 0.5) {
            console.warn("reCAPTCHA failed:", recaptcha);
            return null;
          }

          const user = await db.user.findUnique({ where: { username } });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;

          return user;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
