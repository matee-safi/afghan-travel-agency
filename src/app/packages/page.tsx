"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "../globals.css";
import Image from "next/image";
import logo from "public/logo.png";
import whatsapp from "public/whatsapp.png";
import close from "public/cancel.png";
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
  const [selectedPackage, setSelectedPackage] = useState(null);

  const openPopup = (index: any) => {
    setSelectedPackage(index);
    document.body.classList.add('no-scroll'); // Add the CSS class to disable scrolling
  };
  
  const closePopup = () => {
    setSelectedPackage(null);
    document.body.classList.remove('no-scroll'); // Remove the CSS class to enable scrolling
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    // Check if the click occurred outside the popup content
    if (!target.closest('.popup-content')) {
      closePopup();
    }
  };

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
      item.price.toLowerCase().includes(input.toLowerCase()) ||
      item.description.toLowerCase().includes(input.toLowerCase())
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
      <nav className="bg-primary sticky top-0 z-10">
        {showSearch ? (
          <div className="flex items-center w-full h-12 bg-[#212121] justify-start pl-3">
            <button
              className="invert pr-3"
              onClick={() => {
                setShowSearch(!showSearch);
                setSearchTerm(searchParams.get("search") || "");
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
                      <Image className="w- h-full p-1.5" src={logo} width={50} height={50} alt="logo" />
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
                      className="h-8 bg-neutral-800 text-white w-full px-3 ml-1 text-sm rounded-full focus:outline-none focus:border-primary"
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
      <div className="container mx-auto">
        <div className="category-tab-container">
          <div className="category-tab gap-1 no-scrollbar">
            <div className={`${categoryFromURL === "all" || "" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=all">
                <span className="category-tab-text">All</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "visa" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=visa">
                <span className="category-tab-text">Visa</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "ticket" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=ticket">
                <span className="category-tab-text">Ticket</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "scholarship" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=scholarship">
                <span className="category-tab-text">Scholarship</span>
              </Link>
            </div>
            <div className={`${categoryFromURL === "asylum" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=asylum">
                <span className="category-tab-text">Asylum</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="packages">
        <div className="container mx-auto">
          <div className="mt-10 p-2 overflow-none mb-5 lg:mb-10">
            {data.length < 1 && (
              <div className="flex h-40 items-center justify-center">
                <h1 className="text-xl text-gray-500 font-bold text-center p-6">Package Not Found</h1>
              </div>
            )}
            {data.map((item, index) => (
              <div key={index} className="cursor-pointer md:px-10" onClick={() => openPopup(index)}>
                <div className="package-card-content grid grid-cols-12 p-2 mx-2 mt-4 rounded">
                  <div className="package-card-image-container col-span-3 py-1 pr-2">
                    <Image className="rounded-lg h-16 md:h-24 lg:h-32" src={item.image} alt={item.name} width={100} height={50} loading="lazy" />
                  </div>
                  <div className="col-span-8 flex md:pl-4 md:justify-center md:pb-2 flex-col items-start justify-start">
                    <h3 className="package-card-title md:text-2xl lg:text-3xl font-bold">{item.name}</h3>
                    <p className="font-semibold md:text-xl lg:text-2xl text-gray-400">Process time: {item.processTime}</p>
                    <p className="text-gray-400 md:text-xl lg:text-2xl">{item.headline}</p>
                  </div>
                  <div className="price md:text-xl lg:text-2xl md:pt-2 font-mono col-span-1 font-bold flex justify-end">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Package Details Popup */}
      <div className={`popup ${selectedPackage !== null && "pop"}`} onClick={handlePopupClick}>
        <div className={`popup-content max-w-sm md:max-w-lg lg:max-w-xl ${selectedPackage !== null ? "pop" : ""}`}>
          <div className="popup-close flex justify-end">
            <button onClick={closePopup}>
              <Image src={close} alt="close" width={20} height={20} />
            </button>
          </div>
          {selectedPackage !== null && (
            <div>
              <Image className="mb-4 md:m-0 popup-image rounded-t-lg w-full" src={data[selectedPackage].image} alt={data[selectedPackage].name} width={200} height={200} loading="lazy" />
              <div className="px-5 md:px-7">
                <h2 className="text-2xl md:text-3xl md:my-3 font-bold text-center text-orange-500">
                  {data[selectedPackage].name}
                </h2>
                <div className="popup-price md:text-lg my-2 font-bold flex justify-between">
                  <h3>
                    Process Time: {data[selectedPackage].processTime}
                  </h3>
                  <p>
                    Price: {data[selectedPackage].price}
                  </p>
                </div>
                <p className="md:text-lg">{data[selectedPackage].description}</p>
                <h3 className="font-bold text-lg md:text-xl text-center my-2">Requirements:</h3>
                {data[selectedPackage].requiredDocs.map((item, index) => (
                  <div key={index} className="text-slate-700">
                    <li className="ml-2 font-semibold md:text-lg">{item}</li>
                  </div>
                ))}
                <div className="text-center py-4">
                  <button className="md:text-lg">
                    <Link className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"  href="https://wa.me/93785105088" target='_blank'>
                      <Image src={whatsapp} alt="whatsapp" width={20} height={20} />
                      Get This Package
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
