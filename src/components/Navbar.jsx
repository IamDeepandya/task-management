'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = () => {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    window.location.reload();
  };

  return (
    <nav className='flex items-ccenter justify-end w-full '>
      {localStorage.getItem('token') ? (
        <button className='bg-red-500 py-2 px-5 m-5 rounded-md text-white' onClick={handleLogout}>Logout</button>
      ) : (
        <button className='bg-green-500 py-2 px-5 m-5 rounded-md text-white' onClick={() => router.push('/login')}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;