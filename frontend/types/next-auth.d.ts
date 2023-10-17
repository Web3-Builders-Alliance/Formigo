import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    walletAddress: string;
    base58Address: string;
    username: string;
    credits: number;
    ecPub: string;

    token: string;
  }
  interface Session {
    user: User & {
      walletAddress: string;
      base58Address: string;
      username: string;
      credits: number;
      ecPub: string;
    };
    token: string;
  }
}
