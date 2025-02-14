"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import { collection, getDocs, query } from "@firebase/firestore";
import "../globals.css";
import Footer from "../components/Footer";

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
  const [data, setData] = useState<Item[]>([]);
  const [allData, setAllData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");

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
    if (categoryFromURL) {
      setDataCategory();
    }
  }, [categoryFromURL, searchParams, allData]);

  return (
    <>
      <main className="py-20">
        <div className="container mx-auto">
          <div className="category-tab-container">
            <div className="category-tab gap-1 no-scrollbar backdrop-blur-lg bg-black/50 border-b border-gray-800">
              <div
                className={`${
                  categoryFromURL === "all" || "" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=all">
                  <span className="category-tab-text">All</span>
                </Link>
              </div>
              <div
                className={`${
                  categoryFromURL === "visa" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=visa">
                  <span className="category-tab-text">Visa</span>
                </Link>
              </div>
              <div
                className={`${
                  categoryFromURL === "ticket" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=ticket">
                  <span className="category-tab-text">Ticket</span>
                </Link>
              </div>
              <div
                className={`${
                  categoryFromURL === "scholarship" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=scholarship">
                  <span className="category-tab-text">Scholarship</span>
                </Link>
              </div>
              <div
                className={`${
                  categoryFromURL === "asylum" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=asylum">
                  <span className="category-tab-text">Asylum</span>
                </Link>
              </div>
              <div
                className={`${
                  categoryFromURL === "form" ? "active" : ""
                } category-tab-item`}
              >
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
                      <h1 className="text-xl text-gray-500 font-bold text-center p-6">
                        Package Not Found
                      </h1>
                    </div>
                  )}
                  {data.map((item, index) => (
                    <Link href={`packages/${item.id}`}>
                      <div key={index} className="cursor-pointer md:px-10">
                        <div className="grid grid-cols-12 p-2 mx-2 mt-4 rounded">
                          <div className="col-span-3 py-1 pr-2">
                            <Image
                              className="w-full object-cover rounded-lg h-16 md:h-24 lg:h-32"
                              src={item.image}
                              alt={item.name}
                              width={500}
                              height={500}
                              loading="lazy"
                            />
                          </div>
                          <div className="col-span-8 flex md:pl-4 md:justify-center md:pb-2 flex-col items-start justify-start">
                            <h3 className="md:text-2xl lg:text-3xl font-bold">
                              {item.name}
                            </h3>
                            <p className="font-semibold md:text-xl lg:text-2xl text-gray-400">
                              Process time: {item.processTime}
                            </p>
                            <p className="text-gray-400 md:text-xl lg:text-2xl">
                              {item.headline}
                            </p>
                          </div>
                          <div className="price md:text-xl lg:text-2xl md:pt-2 font-mono font-bold flex justify-end">
                            {item.price}$
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
