import { NextAuthOptions } from 'next-auth';
import { api } from './axios';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 60 * 60 // 7 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {...session, ...token};
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        message: { label: 'message', type: 'text' },
        walletAddress: { label: 'wallet', type: 'text' },
        signature: { label: 'signature' },
        wallet: { label: 'walletType', type: 'text' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let sig;

        if (credentials?.wallet === 'magic') {
          const parts = credentials?.signature.split(',').map(Number);

          sig = new Uint8Array(parts);
        } else {
          sig = credentials?.signature;
        }

        const { data } = await api.post(
          '/api/auth/',
          {
            message: credentials?.message,
            walletAddress: credentials?.walletAddress,
            signature: sig,
            wallet: credentials?.wallet,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (data.data) {
          return data.data;
        } else {
          return null;
        }
      },
    }),
  ],
};
