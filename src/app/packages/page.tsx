"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "../globals.css";
import Image from "next/image";
import logo from "public/logo.png";
import visa from "../data/visa.json";
import ticket from "../data/ticket.json";
import scholarship from "../data/scholarship.json";
import asylum from "../data/asylum.json";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([...visa, ...ticket, ...scholarship, ...asylum]);
  const [showSearch, setShowSearch] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromURL = searchParams.get("category");

  const setDataCategory = () => {
    switch (categoryFromURL) {
      case "all":
        setData([...visa, ...ticket, ...scholarship, ...asylum]);
        break;
      case "visa":
        setData(visa);
        break;
      case "ticket":
        setData(ticket);
        break;
      case "scholarship":
        setData(scholarship);
        break;
      case "asylum":
        setData(asylum);
        break;
      default:
        setData([...visa, ...ticket, ...scholarship, ...asylum]);
        break;
    }
  }

  useEffect(() => {
    const searchValue = searchParams.get("search");
    if (searchValue !== null) {
      performSearch(searchValue);
      setSearchTerm(searchValue);
    } else if (categoryFromURL) {
      setDataCategory();
      setSearchTerm("");
    }
  }, [categoryFromURL, searchParams, useSearchParams()]);

  // Search function
  const performSearch = (input: string) => {
    const allData = [...visa, ...ticket, ...scholarship, ...asylum];
    setData(allData);
    const searchParams = new URLSearchParams();
    searchParams.set("search", input);
    router.push(`/packages?${searchParams.toString()}`);
    const filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.category.toLowerCase().includes(input.toLowerCase()) ||
      item.price.toLowerCase().includes(input.toLowerCase())
      // item.description.toLowerCase().includes(input.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Escape") {
      setShowSearch(!showSearch);
    }
    else if (e.type === "submit") {
      e.preventDefault();
      if (e.target.search.value) {
        setSearchTerm(e.target.search.value);
        performSearch(e.target.search.value);
        setShowSearch(!showSearch);
      }
    }
  };

  return (
    <main>
      <nav className="nav sticky top-0 bg-primary">
        {showSearch ? (
          <div className="flex items-center w-full h-12 bg-[#212121] justify-start pl-3">
            <button
              className="invert pr-3"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
              aria-label="Close search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M21,11v1H5.64l6.72,6.72l-0.71,0.71L3.72,11.5l7.92-7.92l0.71,0.71L5.64,11H21z"></path>
              </svg>
            </button>
            <form
              className="w-full flex items-center"
              onSubmit={(e) => handleSearch(e)}
            >
              <input
                id="search"
                className="h-8 w-full px-3 bg-[#383838] text-sm rounded-full focus:outline-none focus:border-primary"
                name="search"
                autoFocus={true}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => handleSearch(e)}
              />
              <button
                className="invert p-3"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
                </svg>
              </button>
            </form>
          </div>
        ) : (
            <div>
              {searchTerm ? (
                <div>
                  <div className="flex items-center h-12 justify-start pl-2">
                    <Link href="/">
                      <Image className="w- h-full p-1" src={logo} width={50} height={50} alt="logo" />
                    </Link>
                    <form
                      className="w-full flex items-center"
                      action="submit"
                      onSubmit={(e) => {
                        e.preventDefault();
                        performSearch(searchTerm);
                      }}
                    >
                      <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => {
                        setShowSearch(!showSearch);
                        
                      }}
                      type="search"
                      className="h-8 bg-neutral-800 text-white w-full px-3 ml-1 text-sm text-gray-700 rounded-full focus:outline-none focus:border-primary"
                      />
                    <button
                      className="invert p-3"
                      type="submit"
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        >
                        <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              ) : (
              <div className="flex justify-between">
                <Link href="/">
                  <div className="flex items-center h-12 justify-start pl-3">
                    <Image className="w-fit h-full py-2" src={logo} width={50} height={50} alt="logo" />
                    <h1 className="logo-text h-7 pl-px text-2xl">Afghan Travel Agency</h1>
                  </div>
                </Link>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="invert p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="container">
        <div className="category-tab-container">
          <div className="category-tab gap-1 no-scrollbar">
            <div className={`${categoryFromURL === "all" || "" ? "active" : ""} category-tab__item`}>
              <Link className="p-3" href="/packages?category=all">
                <span className="category-tab-text">All</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "visa" ? "active" : ""} category-tab__item`}>
              <Link className="p-3" href="/packages?category=visa">
                <span className="category-tab-text">Visa</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "ticket" ? "active" : ""} category-tab__item`}>
              <Link className="p-3" href="/packages?category=ticket">
                <span className="category-tab-text">Ticket</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "scholarship" ? "active" : ""} category-tab__item`}>
              <Link className="p-3" href="/packages?category=scholarship">
                <span className="category-tab-text">Scholarship</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "asylum" ? "active" : ""} category-tab__item`}>
              <Link className="p-3" href="/packages?category=asylum">
                <span className="category-tab-text">Asylum</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="packages">
        <div className="container">
          <div className="mt-10 p-2 overflow-none">
            {data.length < 1 && (
              <div className="flex h-40 items-center justify-center">
                <h1 className="text-xl text-gray-500 font-bold text-center p-6">Package Not Found</h1>
              </div>
            )}
            {data.map((item, index) => (
              <div className="package-card border-gray-600 border-b" key={index}>
                <div className="package-card__content grid grid-cols-12 p-2 mx-2 my-4 rounded">
                  <div className="package-card__image-container col-span-3 items-center flex">
                    <Image className="rounded-lg" src={item.image} alt={item.name} width={74} height={74} />
                  </div>
                  <div className="col-span-8 flex flex-col items-start justify-start">
                    <h3 className="package-card__title font-bold">{item.name}</h3>
                    <p className="font-semibold text-gray-400">Process time: {item.processTime}</p>
                    <p className="text-gray-400">medical 90 days</p>
                  </div>
                  <div className="package-card__price col-span-1 font-bold flex justify-end font-price price">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
