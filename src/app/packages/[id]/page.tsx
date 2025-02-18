"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import AppointmentForm from "@/app/components/AppointmentForm";
import { useParams } from "next/navigation";
import { useItemStore, Item } from "../../store/itemStore";

export default function Product() {
  const { id } = useParams();
  const { items } = useItemStore();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    // Try to locate the item in the global store
    const found = items.find((it) => it.id === id);
    if (found) {
      setItem(found);
    }
  }, [id, items]);

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 container mx-auto py-28 px-4">
        <div className="flex justify-center">
          <Image
            loading="lazy"
            src={item.image}
            width={1000}
            height={1000}
            alt={item.name}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex flex-col mt-8">
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-xl text-gray-500 mb-2">{item.headline}</p>
          <p className="mb-4">{item.description}</p>
          <p className="mb-2">
            <strong>Category:</strong> {item.category}
          </p>
          <p className="mb-2">
            <strong>Processing Time:</strong> {item.processTime}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </p>
          <p className="mb-4">
            <strong>Required Documents:</strong> {item.requiredDocs.join(", ")}
          </p>
          <AppointmentForm itemId={item.id} />
        </div>
      </div>
      <Footer />
    </>
  );
}
