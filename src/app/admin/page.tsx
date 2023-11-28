'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
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
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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

const Admin: React.FC = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth)
  const [Unfilled, setUnfilled] = useState<string>('');
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

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // Redirect to your login page
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Redirect to the login page after sign-out
      router.replace('/login');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const addItem = async (e: MouseEvent) => {
    e.preventDefault();
    if (
      !item.name ||
      !item.category ||
      !item.headline ||
      !item.processTime ||
      !item.price ||
      !item.image ||
      !item.requiredDocs
    ) {
      setUnfilled('Please fill all the fields');
    } else {
      const requiredDocsArray = item.requiredDocs.split(',');
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

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
  };

  const getItem = (item: Item) => {
    setItem(item);
  }

  const updateItem = async (id: string) => {
    const requiredDocsArray = item.requiredDocs.split(',');
    const docRef = doc(db, 'items', id);
    await updateDoc(docRef, {
      name: item.name,
      category: item.category,
      headline: item.headline,
      processTime: item.processTime,
      price: item.price,
      image: item.image,
      requiredDocs: requiredDocsArray,
      description: item.description,
    });
  };

  useEffect(() => {
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
      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return  (
      <div className="h-screen w-full"> 
        <div className="flex h-full justify-center items-center">
          <div className="sk-chase mb-20">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className='flex gap-5 mb-3'>
          <Link href="/packages" className="bg-blue-600 py-1.5 px-3 rounded-lg flex items-center gap-2">
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
            Home Page
          </Link>
        </div>
        <button className="bg-red-600 py-1.5 px-3 rounded-lg" onClick={handleSignOut}>
          Sign Out
        </button>
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
          placeholder="Requirements (comma-separated)"
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
        <p className="text-rose-500">{Unfilled}</p>
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
            <th>Requirements</th>
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
