"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import useClickOutside from "@/utils/useClickOutside";

export function AuthButton() {
  const { data: session, status } = useSession();
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeDropDown = () => {
    setDropDownOpen(false);
  };

  useClickOutside(dropdownRef, closeDropDown);

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "authenticated") {
    return (
      <div
        onClick={() => setDropDownOpen(!isDropDownOpen)}
        ref={dropdownRef}
        data-testid="profile-dropdown"
        className="relative hidden cursor-pointer md:block"
      >
        <div className="flex items-center space-x-2">
          <Avatar
            size="sm"
            src={session.user?.image}
            alt={session.user?.name}
          />
        </div>
        <div
          data-testid="dropdown-menu"
          className={`bg-light-2 right-0 top-full z-10 translate-y-2 rounded transition-all duration-150 ease-linear md:absolute ${
            isDropDownOpen ? "md:min-h-[104px]" : "overflow-hidden md:h-0"
          } `}
        >
          <ul className="flex flex-col items-center">
            <li className="text-gray-4 w-full px-6 py-4 text-center text-sm font-medium hover:bg-lime-50">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <SignInButton />;
}

export function SignOutButton() {
  return (
    <button className=" text-red-500" onClick={() => signOut()}>
      Sign out
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="w-full rounded-lg border-2 bg-primary-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary-500/90 hover:shadow-md md:w-auto"
    >
      Login
    </button>
  );
}
