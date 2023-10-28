import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';

const Nav = () => {
  return (
    <nav>
      <a href="/">
        <div className="flex items-center h-12 justify-center">
          <Image src="/logo.png" width={25} height={25} alt="logo" />
          <h1 className="logo-text h-7 pl-px text-2xl">Afghan Travel Agency</h1>
        </div>
      </a>
    </nav>
  );
}

export default Nav;
