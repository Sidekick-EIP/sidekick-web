import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      id: number;
      sidekick: string;
      access_token: string;
      refresh_token: string;
    }
  }
}