import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import  EmailProvider  from "next-auth/providers/email";

export const authOpions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],

 
}

const handler = NextAuth(authOpions);
export {handler as GET, handler as POST}
