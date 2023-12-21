"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { CentralizedData } from "../Context";
import { useContext } from "react";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import Paginate from "@/components/Paginate";
import { data } from "autoprefixer";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useTheme } from "../context/themeContext";
import Masonry from "react-masonry-css";

import { UserAuth } from "../context/AuthContext";
import Spinner from "@/components/Spinner";


const page = () => {

  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [load, setload] = useState("Search");
  const [Images, setImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [page, setpage] = useState(0)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Images.slice(indexOfFirstItem, indexOfLastItem);

  const SearchImages2 = async (e) => {
    e.preventDefault();
    try {
      // const {data} = await axios.get(`https://api.unsplash.com/search/photos?client_id=7PssaL7RBSBlcvASDL3esutmiFBYMg3VLlmwqN8hhwg&page=1&query=${search}`);

      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=jJ38zBynd2pdksckGsGrPnpMTAoJjPdQ&q=${search}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );
      console.log(data);

      setImages(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const SearchImages = async (e) => {
    // e.preventDefault();
    try {
      // const {data} = await axios.get(`https://api.unsplash.com/search/photos?client_id=7PssaL7RBSBlcvASDL3esutmiFBYMg3VLlmwqN8hhwg&page=1&query=${search}`);

      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=jJ38zBynd2pdksckGsGrPnpMTAoJjPdQ&q=${search}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );
      console.log(data);

      setImages(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handlePageClick = (e)=>{
  //     console.log(e)
  //     setpage(e.selected + 1)
  // }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
    SearchImages();
  }, [Images, page]);

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

  let renderImages = load;
  let renderImagesload = <span className="loader"></span>;

  if (Images.length > 0) {
    renderImages = currentItems.map((el, i) => {
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
      <div>

      <div className="Search mt-5">
        <form onSubmit={SearchImages2}>
          <input
            type="search"
            name="search"
            className="rounded-lg"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
              
              {e.target.value.length < 1 ? setload("Search") : setload(renderImagesload)}
            }}
          />
          <button type="submit">Go</button>
          
        </form>
      </div>
      
      <hr />
      <div className="allimages">{renderImages}</div>
      <hr />
      <Paginate
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={Images.length}
          />
      </div>

      
    ) : (
      <p>You must be logged in to view this page - protected route.</p>
    )}
      

    </>
  );
};

export default page;
