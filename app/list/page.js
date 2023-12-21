"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/themeContext";
import { UserAuth } from "../context/AuthContext";


import { useContext } from "react";
import { CentralizedData } from "../Context";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Paginate from "@/components/Paginate";
import Button from "@/components/Button";
import Nav from "@/components/Nav";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import Link from "next/link";
import Spinner from "@/components/Spinner";


// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };

// const navigation = [
//   { name: "Trending", href: "/list", current: true },
//   { name: "search", href: "/search", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
//   { name: "Reports", href: "#", current: false },
// ];
// const userNavigation = [
//   { name: "Your Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   { name: "Sign out", href: "#" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Trending = () => {


  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useContext(CentralizedData);
  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [page, setpage] = useState(0)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const GetImages = async () => {
    try {
      const { data } = await axios.get(
        "https://api.giphy.com/v1/gifs/trending?api_key=jJ38zBynd2pdksckGsGrPnpMTAoJjPdQ&limit=100&offset=0&rating=g&bundle=messaging_non_clips"
      );
      console.log(data.data);

      setData(data.data);
      router.push("/list");
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
    GetImages();
  }, [user]);

 

  const GiffStyled = styled.div`
    .gif {
      position: relative;
      img {
        width: 100%;
        border-radius: 5px;
      }
     
    }
    .love {
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      i {
        font-size: 1.8rem;
        background: ${(props) => props.theme.colorYellow};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        transform: scale(1.17);
        transition: all 0.3s ease-in-out;
      }
    }
  `;

  const TrendingStyled = styled.article`
    padding: 2rem;
    background-color: ${(props) => props.theme.colorBg2};
    border-radius: 1rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: ${(props) => props.theme.colorWhite};
      display: flex;
      align-items: center;
      gap: 1rem;
      i {
        background: linear-gradient(
          to right,
          ${(props) => props.theme.colorBlue2},
          ${(props) => props.theme.colorGreen2}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .my-masonry-grid {
      display: -webkit-box; /* Not needed if autoprefixing */
      display: -ms-flexbox; /* Not needed if autoprefixing */
      display: flex;
      margin-left: -20px; /* gutter size offset */
      width: auto;
    }
    .my-masonry-grid_column {
      padding-left: 20px; /* gutter size */
      background-clip: padding-box;
    }

    /* Style your items */
    .my-masonry-grid_column > div {
      /* change div to reference your elements you put in <Masonry> */
      margin-bottom: 15px;
    }
  `;

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    977: 2,
    500: 1,
  };

  let renderImages = <span className="loader"></span>;
  if (data.length > 0) {
    renderImages = currentItems.map((el, id) => {
      const theme = useTheme();
      return (
        <TrendingStyled theme={theme}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <GiffStyled key={el.id} theme={theme} className="w-80 flex justify-center items-center flex-col gap-4">
              <div className="images gif">
                <img src={el.images.fixed_height.url} alt={el.title} />
                
              </div>
              <div className="details flex items-baseline gap-2 justify-between w-full ">
              <div className="detail1 flex flex-col justify-start items-start">
              <p className="text-white">{el.title}</p>
              <p className="text-white">Author:-{el.username}</p>


              </div>

              <div className="love">
                  <i className="ri-star-fill"></i>
                </div>
              </div>
              
            </GiffStyled>
          </Masonry>
        </TrendingStyled>
      );
    });
  }

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    {loading ? (
      <Spinner />
    ) : user ? (
      <div className="min-h-full">

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            <Link href={"/"} className="decoration-transparent text-gray-900">TRENDING</Link>
            
          </h1>
          <div className="fetch-btns">
          <Link className="decoration-transparent text-gray-400" href="/liked">
          <Button
              name={"Liked"}
              icon={<i className="ri-star-fill text-yellow-400"></i>}
            />
            </Link>
            
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="Trend">
            <div className="allimages">
            {renderImages}

            </div>
          </div>
          <Paginate
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
          />
        </div>
      </main>
    </div>
    ) : (
      <p>You must be logged in to view this page - protected route.</p>
    )}
    </>

    
    
  );
};

export default Trending;
