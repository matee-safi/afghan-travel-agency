'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { db } from '../firebase';

// Define the Item interface
interface Item {
  id: string;
  name: string;
  category: string;
  headline: string;
  processTime: string;
  price: string;
  image: string;
  requiredDocs: string;
  description: string;
}

// Define the Admin component
const Admin: React.FC = () => {
  // State variables
  const [error, setError] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>({
    id: '',
    name: '',
    category: '',
    headline: '',
    processTime: '',
    price: '',
    image: '',
    requiredDocs: '',
    description: '',
  });

  // Function to add an item
  const addItem = async (e: MouseEvent) => {
    e.preventDefault();
    // Check if required fields are filled
    if (
      !item.name ||
      !item.category ||
      !item.headline ||
      !item.processTime ||
      !item.price ||
      !item.image ||
      !item.requiredDocs
    ) {
      setError('Please fill all the fields');
    } else {
      // Split requiredDocs into an array
      const requiredDocsArray = item.requiredDocs.split(',');
      // Add item to the database
      const docRef = await addDoc(collection(db, 'items'), {
        name: item.name,
        category: item.category,
        headline: item.headline,
        processTime: item.processTime,
        price: item.price,
        image: item.image,
        requiredDocs: requiredDocsArray,
        description: item.description,
      });
      console.log('Document written with ID: ', docRef.id);
      // Reset the item state
      setItem({
        id: '',
        name: '',
        category: '',
        headline: '',
        processTime: '',
        price: '',
        image: '',
        requiredDocs: '',
        description: '',
      });
    }
  };

  // Function to delete an item
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
  };

  // Function to get item details
  const getItem = (item: Item) => {
    setItem(item);
  };

  // Function to update an item
  const updateItem = async (id: string) => {
    const docRef = doc(db, 'items', id);
    await updateDoc(docRef, {
      name: item.name,
      category: item.category,
      headline: item.headline,
      processTime: item.processTime,
      price: item.price,
      image: item.image,
      requiredDocs: item.requiredDocs,
      description: item.description,
    });
  };

  // useEffect to fetch items from the database
  useEffect(() => {
    // Check if window is defined (client-side) before initializing analytics
    if (typeof window !== 'undefined') {
      try {
        const analytics = getAnalytics();
        // Rest of your analytics configuration
      } catch (error) {
        console.error('Error initializing analytics:', error);
      }
    }

    // Fetch items from the database
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArr: Item[] = [];
      querySnapshot.forEach((doc) => {
        const itemData = doc.data();
        const newItem: Item = {
          id: doc.id,
          name: itemData.name,
          category: itemData.category,
          headline: itemData.headline,
          processTime: itemData.processTime,
          price: itemData.price,
          image: itemData.image,
          requiredDocs: itemData.requiredDocs,
          description: itemData.description,
        };
        itemsArr.push(newItem);
      });
      setItems(itemsArr);
    });

    // Cleanup function to unsubscribe from onSnapshot
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-5">
      <div className="flex gap-5 mb-3">
        <Link href="/" className="underline">
          Main Page
        </Link>
        <Link href="/packages" className="underline">
          Packages Page
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-4">Admin's Page</h1>
      <form className="flex flex-col gap-2 text-black">
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Name"
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Category"
          type="text"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Headline"
          type="text"
          value={item.headline}
          onChange={(e) => setItem({ ...item, headline: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Process Time"
          type="text"
          value={item.processTime}
          onChange={(e) => setItem({ ...item, processTime: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Price"
          type="text"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Image"
          type="text"
          value={item.image}
          onChange={(e) => setItem({ ...item, image: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Required Documents (comma-separated)"
          type="text"
          value={item.requiredDocs}
          onChange={(e) => setItem({ ...item, requiredDocs: e.target.value })}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Description (Optional)"
          type="text"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
        <p className="text-rose-500">{error}</p>
        <div className="flex justify-center mb-5">
          <button
            className="bg-white w-fit py-2 px-3 rounded-lg hover:bg-gray-300"
            type="submit"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Headline</th>
            <th>Process Time</th>
            <th>Price</th>
            <th>Image</th>
            <th>Required Documents</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="border-white border-2">
          {items.map((item) => (
            <tr key={item.id} className="border-white border-2">
              <td className="border-white border-2">{item.name}</td>
              <td className="border-white border-2">{item.category}</td>
              <td className="border-white border-2">{item.headline}</td>
              <td className="border-white border-2">{item.processTime}</td>
              <td className="border-white border-2">{item.price}</td>
              <td className="border-white border-2">
                <Image src={item.image} alt={item.name} width={50} height={50} />
              </td>
              <td className="border-white border-2">{item.requiredDocs}</td>
              <td className="border-white border-2">{item.description}</td>
              <div className="flex flex-col justify-center items-center p-2 ">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="py-2 px-3 mx-auto bg-red-600 rounded-lg hover:bg-red-900 mb-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => getItem(item)}
                  className="py-2 px-3 mx-auto bg-green-600 rounded-lg hover:bg-green-900 mb-2"
                >
                  Get
                </button>
                <button
                  onClick={() => updateItem(item.id)}
                  className="py-2 px-3 mx-auto bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Update
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
