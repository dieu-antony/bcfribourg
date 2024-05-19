import { Role } from "@prisma/client";
import NextAuth, { DefaultUser } from "next-auth";
import maxAge from "next-auth/jwt";
import callbacks from "next-auth/callbacks";

declare module "next-auth" {
  interface NextAuthOptions {
    adapter: any,
    providers: any[],
    session: {
      strategy: SessionStrategy,
      maxAge: number
    },
    secret: string | undefined,
    debug: boolean,
    pages: Partial<PagesOptions> | undefined
  }
}
  