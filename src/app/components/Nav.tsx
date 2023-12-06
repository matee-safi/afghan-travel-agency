'use client'
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
  const [user] = useAuthState(auth)
  return (
    <nav className={`sticky flex container mx-auto px-4 items-center ${user ? 'justify-between pr-4' : 'justify-center  md:justify-end'} z-10`}>
      {user && 
        <Link className="mr-[5%] text-lg bg-blue-700 px-2 py-1 rounded-lg hover:bg-blue-800 transition" href="/admin">
          Admin Page
        </Link>
      }
      <Link href="/">
        <div className="flex h-12 items-center mt-2 md:mt-4 justify-center">
          <h1 className="logo-text h-7 pr-2 text-lg md:text-xl flex items-center">شرکت سیاحتی افغان</h1>
          <Image src={logo} width={30} height={50} alt="logo" />
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
