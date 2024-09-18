'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/utils/auth-context';
import LogoutButton from './logout-button';

const Header: FC = () => {
  const { user } = useAuth();
  return (
    <header className="bg-gray-400 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h2 className="text-2xl font-bold">Car Catalog</h2>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            <ul className="flex gap-4">
              {user && (
                <li key="add">
                  <Link href="/add-car" className="hover:text-gray-300">
                    Add Car
                  </Link>
                </li>
              )}
              {!user && (
                <li key="login">
                  <Link href="/login" className="hover:text-gray-300">
                    Log In
                  </Link>
                </li>
              )}
            </ul>
            {user && <LogoutButton />}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
