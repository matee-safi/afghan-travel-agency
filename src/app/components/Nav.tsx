import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';

const Nav = () => {
  return (
    <nav className="bg-primary sticky z-10">
      <Link href="/">
        <div className="flex items-center h-12 justify-center md:justify-start md:pl-32">
        <Image className="w-fit h-full py-2" src={logo} width={50} height={50} alt="logo" />
          <h1 className="logo-text h-7 pl-px text-2xl">Afghan Travel Agency</h1>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
