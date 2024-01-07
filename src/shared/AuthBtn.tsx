"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { status } = useSession();

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "authenticated") {
    return <SignOutButton />;
  }
  return <SignInButton />;
}

export function SignOutButton() {
  return (
    <button
      className="rounded border-2 border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-red-500/90 md:w-auto"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="rounded border-2 border-primary-500 bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-500/90 md:w-auto"
    >
      Login
    </button>
  );
}
