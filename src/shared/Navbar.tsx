import { Plus } from "lucide-react";
import Link from "next/link";
import { AuthButton } from "./AuthBtn";

export default function Navbar() {
  return (
    <header className="mx-auto max-w-screen-xl py-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-gray-800">
          <span className="text-2xl">🍍</span>
          <span>Painappuru</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/new-recipe"
            className="flex items-center space-x-1 rounded  border-2 border-primary-500 px-4 py-2 text-center text-sm font-bold text-primary-500  hover:bg-primary-500/90 hover:text-white md:w-auto"
          >
            <Plus size={16} />
            <span>Add</span>
          </Link>
          {/* <button className="rounded bg-primary-500 px-4 py-2 text-sm font-bold text-white shadow hover:bg-green-400 focus:bg-green-600">
            Login
          </button> */}
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
