import { Role } from "@prisma/client";
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface NextAuthOptions {
    adapter: any,
    providers: any[],
    session: {
      strategy: SessionStrategy,
    },
    secret: string | undefined,
    debug: boolean,
    pages: Partial<PagesOptions> | undefined
  }
}
  