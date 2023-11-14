import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';

const Nav = () => {
  return (
    <nav className="sticky z-10">
      <Link href="/">
        <div className="flex h-12 items-center mt-2 md:mt-4 justify-center md:justify-start md:pl-8 lg:pl-24 xl:pl-32">
          <Image className="flex items-center" src={logo} width={30} height={50} alt="logo" />
          <h1 className="logo-text h-7 pl-px text-2xl md:text-3xl flex items-center">Afghan Travel Agency</h1>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
