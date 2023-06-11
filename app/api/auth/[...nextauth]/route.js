import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'


export const authOpions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
   
  ],

 
}

const handler = NextAuth(authOpions);
export {handler as GET, handler as POST}
