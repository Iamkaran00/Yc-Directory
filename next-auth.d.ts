 
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;  
    } & DefaultSession["user"];
  }
  interface JWT {
    id?: string;
  }
  interface User extends DefaultUser {
    id: string;
  }
}
