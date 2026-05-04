// File: src/app/api/auth/[...nextauth]/route.ts

import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { pool } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const client = await pool.connect();
        try {
          // Cari user dan gabungkan dengan tabel observer agar kita dapat observer_id-nya
          const query = `
            SELECT u.id as user_id, u.username, u.password_hash, u.role, 
                   o.id as observer_id, o.observer_name
            FROM users u
            LEFT JOIN observers o ON u.id = o.user_id
            WHERE u.username = $1
          `;
          const result = await client.query(query, [credentials.username]);
          const user = result.rows[0];

          if (!user) return null;

          // Cek kecocokan password
          const passwordsMatch = await bcrypt.compare(credentials.password, user.password_hash);
          if (!passwordsMatch) return null;

          // Kembalikan data yang akan disimpan di dalam "Session"
          return {
            id: user.user_id,
            name: user.observer_name,
            username: user.username,
            role: user.role,
            observerId: user.observer_id, // Ini data krusial untuk menyimpan form!
          };
        } finally {
          client.release();
        }
      },
    }),
  ],
  callbacks: {
    // Memasukkan data tambahan ke dalam token (Cookie)
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.observerId = (user as any).observerId;
      }
      return token;
    },
    // Memasukkan token ke dalam Session agar bisa dibaca di seluruh aplikasi
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).observerId = token.observerId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Nanti kita arahkan halaman login custom ke sini
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
