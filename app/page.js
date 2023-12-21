"use client"
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { UserAuth } from "../app/context/AuthContext";
import Trending from'@/components/Trending'
import { useEffect, useState } from 'react';

export default function Home() {



  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <main className="p-4">
      <h1 className='text-center'>Home Page</h1>
      {loading ? null : !user ? (
        <h1>You Need to sign In</h1>
      ) : (
        <Trending/>
      )}
    </main>
  )
}