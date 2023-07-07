'use client';

import { signOut } from "next-auth/react";

interface UserProps {
  propName: string;
}
export default function User({}:UserProps) {
  return (
    <>
      {/* Create a beautiful logout button with tailwind */}
      <div className="flex items-center justify-center w-full"></div>
      <button onClick={() => signOut()} className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600">Logout</button>
    </>
  );
}