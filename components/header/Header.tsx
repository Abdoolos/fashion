import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  return (
    <header>
      <nav>
        <div className='navbar justify-between bg-base-300'>
          <div className='flex items-center'>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link href='/' className='ml-2 flex items-center gap-2'>
              <Image
                src='/images/logo.jpg'
                alt="Olivia's Verden"
                width={52}
                height={52}
                className='rounded-md object-cover'
                priority
              />
              <span className='text-sm font-semibold tracking-widest text-black sm:text-base'>
                VERDEN
              </span>
            </Link>
          </div>
          <Menu />
        </div>
        <div className='block bg-base-300 pb-3 text-center md:hidden'>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
