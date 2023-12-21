"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../app/context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link className="decoration-transparent text-black hover:text-gray-700 text-xl" href="/">Home</Link>
        </li>

        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link className="decoration-transparent text-black hover:text-gray-700 text-xl" href="/list">Trending</Link>
          </li>
        )}
        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link className="decoration-transparent text-black hover:text-gray-700 text-xl" href="/search">Search</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Login
          </li>
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign up
          </li>
        </ul>
      ) : (
        <div>
          <p className=" font-semibold">Welcome, {user.displayName}</p>
          <p className="cursor-pointer font-bold text-red-600" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;