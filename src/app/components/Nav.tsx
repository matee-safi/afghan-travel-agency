"use client";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const Nav = () => {
  const [user, setUser] = useState<User | null>(null);
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div
                className={`${bebasNeue.className} antialiased flex items-center text-xl`}
              >
                <Image
                  alt="Logo"
                  width={32}
                  height={32}
                  src="/logo.png"
                  className="w-8 h-8"
                />
                Afghan Travel Agency
              </div>
            </Link>
            <div className="hidden md:flex text-sm text-gray-400 gap-4">
              <Link
                href="/packages"
                className="hover:text-white transition-colors"
              >
                Packages
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                onClick={() => {
                  handleLogout();
                }}
                href="/login"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
