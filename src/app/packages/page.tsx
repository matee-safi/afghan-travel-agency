import React from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

export default async function Packages({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const q = query(collection(db, "items"));
  const querySnapshot = await getDocs(q);
  const fetchedItems = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as any)
  );

  let displayItems = fetchedItems;
  const category = searchParams?.category;
  if (category && category !== "all") {
    displayItems = fetchedItems.filter(
      (item) => item.category.toLowerCase() === category
    );
  }

  return (
    <>
      <main className="py-20">
        <div className="container mx-auto">
          <div className="category-tab-container">
            <div className="category-tab gap-1 no-scrollbar backdrop-blur-lg bg-black/50 border-b border-gray-800">
              <div
                className={`${
                  category === "all" || "" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=all">
                  <span className="category-tab-text">All</span>
                </Link>
              </div>
              <div
                className={`${
                  category === "visa" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=visa">
                  <span className="category-tab-text">Visa</span>
                </Link>
              </div>
              <div
                className={`${
                  category === "ticket" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=ticket">
                  <span className="category-tab-text">Ticket</span>
                </Link>
              </div>
              <div
                className={`${
                  category === "scholarship" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=scholarship">
                  <span className="category-tab-text">Scholarship</span>
                </Link>
              </div>
              <div
                className={`${
                  category === "asylum" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=asylum">
                  <span className="category-tab-text">Asylum</span>
                </Link>
              </div>
              <div
                className={`${
                  category === "form" ? "active" : ""
                } category-tab-item`}
              >
                <Link className="p-3" href="/packages?category=form">
                  <span className="category-tab-text">Online Form</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 p-2 overflow-none">
            {displayItems.length < 1 ? (
              <div className="flex h-40 items-center justify-center">
                <h1 className="text-xl text-gray-500 font-bold text-center p-6">
                  Package Not Found
                </h1>
              </div>
            ) : (
              <>
                {displayItems.map((item) => (
                  <Link key={item.id} href={`packages/${item.id}`}>
                    <div className="cursor-pointer md:px-10">
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
      </main>
      <Footer />
    </>
  );
}
