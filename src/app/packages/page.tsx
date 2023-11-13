"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import "../globals.css";
import Image from "next/image";
import logo from "public/logo.png";
import whatsapp from "public/whatsapp.png";
import close from "public/cancel.png";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    let items: Item[] = [];
    // Fetch all data
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setAllData(items);

    if (categoryFromURL !== "all") {
      const filteredData = items.filter(
        (item) => item.category === categoryFromURL
      );
      setData(filteredData);
      setIsLoading(false);
      return;
    }
    setData(items);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const setDataCategory = () => {
    if (categoryFromURL === "all") {
      setData(allData);
      return;
    }
    const filteredData = allData.filter((item) => item.category === categoryFromURL);
    setData(filteredData);
  };

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

  const performSearch = (input: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("search", input);
    router.push(`/packages?${searchParams.toString()}`);
    const filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.category.toLowerCase().includes(input.toLowerCase()) ||
      item.headline.toLowerCase().includes(input.toLowerCase()) ||
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

  return (
    <main>
      <nav className="nav sticky top-0 bg-primary">
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
        <div className="container">
          <div className="mt-10 p-2 overflow-none">
            {isLoading ? (
              <div className="flex h-screen justify-center items-center">
                <div className="sk-chase mb-20">
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                </div>
              </div>
            ) : (
              <>
                {data.length < 1 && (
                  <div className="flex h-40 items-center justify-center">
                    <h1 className="text-xl text-gray-500 font-bold text-center p-6">Package Not Found</h1>
                  </div>
                )}
                {data.map((item, index) => (
                  <div key={index} className="cursor-pointer" onClick={() => openPopup(index)}>
                    <div className="package-card-content grid grid-cols-12 p-2 mx-2 mt-4 rounded">
                      <div className="package-card-image-container col-span-3 py-1 pr-2">
                        <Image className="rounded-lg" src={item.image} alt={item.name} width={100} height={50} loading="lazy" />
                      </div>
                      <div className="col-span-8 flex flex-col items-start justify-start">
                        <h3 className="package-card-title font-bold">{item.name}</h3>
                        <p className="font-semibold text-gray-400">Process time: {item.processTime}</p>
                        <p className="text-gray-400">{item.headline}</p>
                      </div>
                      <div className="price col-span-1 font-bold flex justify-end">
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
      {/* Package Details Popup */}
      <div className={`popup ${selectedPackage !== null && "pop"}`} onClick={handlePopupClick}>
        <div className={`popup-content ${selectedPackage !== null ? "pop" : ""}`}>
          <div className="popup-close flex justify-end">
            <button onClick={closePopup}>
              <Image src={close} alt="close" width={20} height={20} />
            </button>
          </div>
          {selectedPackage !== null && (
            <>
              <h2 className="text-2xl font-semibold text-center">
                {data[selectedPackage].name}
              </h2>
              <Image className="my-4 rounded-lg popup-image" src={data[selectedPackage].image} alt={data[selectedPackage].name} width={500} height={50} loading="lazy" />
              <div className="popup-price my-2 font-bold flex justify-between font-price price">
                <h3>
                  Process Time: {data[selectedPackage].processTime}
                </h3>
                <p>
                  Price: {data[selectedPackage].price}
                </p>
              </div>
              <p className="popup-text">{data[selectedPackage].description}</p>
              <h3 className="font-bold text-lg text-center my-2">Required Documents:</h3>
              {data[selectedPackage].requiredDocs.map((item, index) => (
                <div key={index} className="">
                  <p className="ml-2">- {item}</p>
                </div>
              ))}
            </>
          )}
          <div className="text-center pt-3 pb-1">
            <button><Link className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"  href="https://wa.me/93785105088" target='_blank'><Image src={whatsapp} alt="whatsapp" width={20} height={20} />Get This Package</Link></button>
          </div>
        </div>
      </div>
    </main>
  );
}
