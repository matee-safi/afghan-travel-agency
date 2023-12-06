"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../firebase";
import { collection, getDocs, query } from "@firebase/firestore";
import logo from "public/logo.png";
import whatsapp from "public/whatsapp.png";
import close from "public/cancel.png";
import "../globals.css";

interface Item {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  processTime: string;
  price: string;
  image: string;
  requiredDocs: string[];
}

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [allData, setAllData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const getData = async () => {
    setIsLoading(true);
    let items: Item[] = [];
    // Fetch all data
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as Item);
    });
    setAllData(items);
    setData(items);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const setDataCategory = () => {
    if (categoryFromURL === "all") {
      setData(allData);
    } else {
      const filteredData = allData.filter(
        (item) => item.category.toLowerCase() === categoryFromURL
      );
      setData(filteredData);
    }
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
  }, [categoryFromURL, searchParams, allData]);

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent) => {
    if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Escape") {
      setShowSearch(!showSearch);
    } else if (e.type === "submit") {
      e.preventDefault();
      const formElement = e.currentTarget as HTMLFormElement;
      const searchInput = formElement.querySelector<HTMLInputElement>('#search');
  
      if (searchInput && searchInput.value) {
        setSearchTerm(searchInput.value);
        performSearch(searchInput.value);
        setShowSearch(!showSearch);
      }
    }
  };

  const openPopup = (index: number) => {
    setSelectedPackage(index);
  };

  const closePopup = () => {
    setSelectedPackage(null);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.popup-content')) {
      closePopup();
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
                enableBackground="new 0 0 24 24"
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
                  enableBackground="new 0 0 24 24"
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
                      <Image className="h-full p-1.5" src={logo} width={50} height={50} alt="logo" />
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
                        enableBackground="new 0 0 24 24"
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
                    enableBackground="new 0 0 24 24"
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
            <div className={`${categoryFromURL === "form" ? "active" : ""} category-tab-item`}>
              <Link className="p-3" href="/packages?category=form">
                <span className="category-tab-text">Online Form</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="packages">
        <div className="container mx-auto">
          <div className="mt-10 p-2 overflow-none">
            {isLoading ? (
              <>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-12 p-2 mx-2 mt-4 md:px-10">
                  <div className="col-span-3 bg-gray-700 rounded-lg h-16 md:h-28 lg:h-32"></div>
                  <div className="col-span-9 ml-2 md:ml-4 flex flex-col justify-center">
                    <div className="bg-gray-700 text-gray-700 rounded-full h-3 md:h-6 w-1/2"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 my-2.5 md:my-5"></div>
                    <div className="bg-gray-700 text-gray-700 rounded-full h-2.5 md:h-5 w-3/5"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {data.length < 1 && (
                  <div className="flex h-40 items-center justify-center">
                    <h1 className="text-xl text-gray-500 font-bold text-center p-6">Package Not Found</h1>
                  </div>
                )}
                {data.map((item, index) => (
                  <div key={index} className="cursor-pointer md:px-10" onClick={() => openPopup(index)}>
                    <div className="grid grid-cols-12 p-2 mx-2 mt-4 rounded">
                      <div className="col-span-3 py-1 pr-2">
                        <Image className="w-full object-cover rounded-lg h-16 md:h-24 lg:h-32" src={item.image} alt={item.name} width={100} height={50} loading="lazy" />
                      </div>
                      <div className="price md:text-xl lg:text-2xl pt-2 font-mono font-bold flex">
                        {item.price}
                      </div>
                      <div className="col-span-8 flex md:pl-4 md:justify-center md:pb-2 flex-col items-end">
                        <h3 className="md:text-2xl lg:text-3xl font-bold">{item.name}</h3>
                        {item.processTime && <p className="font-semibold md:text-xl lg:text-2xl text-gray-400">مدت پروسس: {item.processTime}</p>}
                        <p className="text-gray-400 md:text-xl lg:text-2xl">{item.headline}</p>
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
        <div className={`popup-content max-w-sm md:max-w-lg lg:max-w-xl ${selectedPackage !== null ? "pop" : ""}`}>
          <div className="popup-close flex justify-end">
            <button onClick={closePopup}>
              <Image src={close} alt="close" width={20} height={20} />
            </button>
          </div>
          {selectedPackage !== null && (
            <div>
              <Image className="mb-4 md:m-0 popup-image rounded-t-lg w-full" src={data[selectedPackage].image} alt={data[selectedPackage].name} width={500} height={500} loading="lazy" />
              <div className="px-5 md:px-7">
                <h2 className="text-2xl md:text-3xl md:my-3 font-bold text-center text-orange-500">
                  {data[selectedPackage].name}
                </h2>
                <div className="popup-price md:text-lg my-2 font-bold flex justify-between">
                  {
                    data[selectedPackage].processTime &&
                    <h3>
                      مدت پروسس: {data[selectedPackage].processTime}
                    </h3>
                  }
                  <p>
                    قیمت: {data[selectedPackage].price}
                  </p>
                </div>
                <p className="md:text-lg">{data[selectedPackage].description}</p>
                {
                  data[selectedPackage].requiredDocs.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg md:text-xl text-center my-2">اسناد مورد نیاز</h3>
                      {data[selectedPackage].requiredDocs.map((item, index) => (
                        <div key={index} className="text-slate-700">
                          <li className="mr-2 list-none text-right font-semibold md:text-lg">{item} -</li>
                        </div>
                      ))}
                    </>
                  )
                }
                <div className="text-center py-4">
                  <button className="md:text-lg">
                    <Link className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"  href="https://wa.me/93785105088" target='_blank'>
                      <Image src={whatsapp} alt="whatsapp" width={20} height={20} />
                      دریافت این بسته
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
