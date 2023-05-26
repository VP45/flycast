import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";

export const authOptions:NextAuthOptions = {
  session : {
    strategy : 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as any),

    CredentialsProvider({
      async authorize(credentials: any, req: any) {
        dbConnect();
        const { email, password } = credentials
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('Invalid email or password!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password!')
        }

        return user;
      }
    } as any)
  ]
}

export default NextAuth(authOptions)