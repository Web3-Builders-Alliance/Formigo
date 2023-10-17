'use client';
import { IoChevronDown, IoLogOut } from 'react-icons/io5';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import useUserStore from '@/stores/useUserStore';
import { signOut, useSession } from 'next-auth/react';
import { magic } from '@/lib/magic';

const Navbar = () => {
  const { data } = useSession();

  const user = useUserStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    let usingMagic = await magic.user.isLoggedIn();
    if (usingMagic) {
      await signOut({ callbackUrl: '/' });
      await magic.user.logout();
    }
  };
  return (
    <nav className='sticky top-0 flex h-[70px] w-full items-center justify-between border border-b-border bg-card px-[135px] py-3.5 xl:px-[240px]'>
      <div className='flex cursor-pointer items-center gap-2 text-txt-secondary hover:text-txt'>
        <Button variant='secondary' className='text-txt'>
          F
        </Button>
        <p className=' font-sans font-semibold'>Formigo</p>
      </div>
      <div className='flex items-center gap-4'>
        <Button
          onClick={() => router.push('/dashboard')}
          variant={pathname == '/dashboard' ? 'ghost-active' : 'ghost'}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => router.push('/forms')}
          variant={pathname == '/forms' ? 'ghost-active' : 'ghost'}
        >
          Forms
        </Button>
        {/* <Button variant='ghost'>
          Account <IoChevronDown className='ml-2.5 h-5 w-5' />
        </Button> */}
      </div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback className='cursor-pointer'>
              {data?.user.base58Address?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className='flex w-full items-center' onClick={logout}>
            <IoLogOut className='mr-2 h-5 w-5' />
            <p className='cursor-pointer font-sans font-medium text-txt'>
              Logout
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
