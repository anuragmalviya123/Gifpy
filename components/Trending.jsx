"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../app/context/AuthContext";
import Spinner from "@/components/Spinner";
import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CentralizedData } from "../app/Context";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const Trending = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const router = useRouter();

  const [data, setData] = useContext(CentralizedData);

  const GetImages = async () => {
    try {
      const { data } = await axios.get(
        "https://api.giphy.com/v1/gifs/trending?api_key=jJ38zBynd2pdksckGsGrPnpMTAoJjPdQ&limit=100&offset=0&rating=g&bundle=messaging_non_clips"
      );
      console.log(data);

      setData(data);
      router.push("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4">
        {loading ? (
          <Spinner />
        ) : user ? (
          <div className=" flex items-center justify-center gap-2 h-screen">
            <Link href={"/list"}>
              <Button className="rounded-lg px-3">
                Trend Images
              </Button>
            </Link>

            <Link href="/search">
              <Button className="bg-transparent px-3 text-gray-900 outline outline-1 outline-black">
                SearchImages
              </Button>
            </Link>
          </div>
        ) : (
          <p>You must be logged in to view this page - protected route.</p>
        )}
      </div>
    </>
  );
};

export default Trending;
