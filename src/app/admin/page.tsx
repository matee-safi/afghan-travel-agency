'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
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

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // Redirect to your login page
    }
  }, [user, loading, router]);
  const [Unfilled, setUnfilled] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState<string>('');
  const [notice, setNotice] = useState<string>('');
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

  const toggleMenu = (itemId: any) => {
    setVisibleMenuId((prevId) => (prevId === itemId ? null : itemId));
  };

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
    setAdding(true);
    if (
      !item.name ||
      !item.category ||
      !item.headline ||
      !item.processTime ||
      !item.price ||
      !item.image ||
      !item.requiredDocs
    ) {
      setUnfilled('Please fill in all the required fields');
      setTimeout(() => {
        setUnfilled('');
      }, 5000);
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
      setNotice('Item added successfully');
      setTimeout(() => {
        setNotice('');
      }, 5000);
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
    setAdding(false);
  };

  const deleteItem = async (id: string) => {
    setDeleting(true);
    await deleteDoc(doc(db, 'items', id));
    setNotice('Item deleted successfully');
    setDeleting(false);
    setDeleteModal(false);
    setItemToDelete('');
    setTimeout(() => {
      setNotice('');
    }, 5000);
  };

  const handleDelete = async (id: string) => {
    setDeleteModal(true);
    setItemToDelete(id);
  };

  const updateItem = async () => {
    setUpdating(true);
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
      setTimeout(() => {
        setUnfilled('');
      }, 3000);
    } else {
    // Convert requiredDocs to an array if it's a string
    const requiredDocsArray =
      Array.isArray(item.requiredDocs) ?
      item.requiredDocs :
      item.requiredDocs.split(',');

      const docRef = doc(db, 'items', item.id);
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
      setNotice('Item updated successfully');
      setTimeout(() => {
        setNotice('');
      }, 5000);
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
      setUpdateOpen(false);
    }
    setUpdating(false);
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
      {
        notice ? 
          <div role="alert" className="bg-green-500 rounded-lg flex items-center justify-center p-3 fixed gap-4 bottom-4 left-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>{notice}</p>
          </div>
        :
        ''
      }
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
      <form className="flex flex-col gap-2 text-black max-w-2xl mx-auto">
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Name"
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          id="category"
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Category"
          type="text"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Headline"
          type="text"
          value={item.headline}
          onChange={(e) => setItem({ ...item, headline: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Process Time"
          type="text"
          value={item.processTime}
          onChange={(e) => setItem({ ...item, processTime: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Price"
          type="text"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Image"
          type="text"
          value={item.image}
          onChange={(e) => setItem({ ...item, image: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <input
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Requirements (comma-separated)"
          type="text"
          value={item.requiredDocs}
          onChange={(e) => setItem({ ...item, requiredDocs: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (nextElement) {
                nextElement.focus();
              }
            }
          }}
        />
        <textarea
          className="w-full py-2 px-3 rounded-lg"
          placeholder="Description (Optional)"
          rows={5}
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
        <p className="bg-red-500 text-white pl-5 rounded-lg">{Unfilled}</p>
        <div className="flex justify-end mb-5">
          <button
            className="bg-green-600 font-bold text-white py-2 px-3 rounded-lg hover:bg-green-700 transition"
            type="submit"
            onClick={addItem}
          >
            {adding ? 
            <div>
              <div className="flex justify-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
            </div>
            : 
            'Add Item'}
          </button>
        </div>
      </form>
      <div className="flex flex-col overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium border-neutral-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Headline</th>
              <th className="px-6 py-4">Process Time</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Requirements</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.headline}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.processTime}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.price}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                <td className="whitespace-nowrap">
                  <img className="w-full" src={item.image} alt={item.name} width={50} height={50} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.requiredDocs}</td>
                <td className="whitespace-nowrap px-6 py-4">
                    {item.description}
                </td>
                <td className="text-center items-center h-12 relative">
                  <button
                      onClick={() => {
                        toggleMenu(item.id);
                      }}
                    >
                      <svg className="w-6 h-6 text-white hover:text-gray-500 transition" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                  </button>
                  <div id={"menu-" + item.id} className={`absolute right-16 top-0 z-10 flex flex-col mt-8 mr-2 p-2 border border-gray-800 rounded bg-primary ${visibleMenuId === item.id ? "" : "hidden"}`}>
                    <button className="hover:bg-slate-600 p-2 rounded flex gap-2" onClick={() => handleDelete(item.id)}>
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                    </svg>
                      <p>Delete</p>
                    </button>
                    <button className="hover:bg-slate-600 p-2 rounded flex gap-2" onClick={() => {
                      setItem(item);
                      setUpdateOpen(true);
                      console.log(item.requiredDocs)
                    }}>
                      <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                      </svg>
                      <p>Edit</p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* delete modal */}
        <div className={`${deleteModal ? '' : 'hidden'} flex items-center justify-center fixed z-50 top-0 right-0 w-full h-screen bg-black`}>
          <div className="bg-neutral-800 p-4 m-4 mx-6 rounded-lg h-fit">
              <svg className="w-12 h-12 text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
              </svg>
            <h1 className="text-lg m-4 text-center">Are you sure you want to delete this item?</h1>
            <div className="flex justify-center gap-4">
              <button onClick={() => deleteItem(itemToDelete)} className="bg-red-500 px-3 py-1.5 rounded text-xl">
                {deleting ?
                <div>
                  <div className="flex justify-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </div>
                  :
                'Yes, Delete'
                }
              </button>
              <button onClick={
                () => {
                  setDeleteModal(false);
                  setItemToDelete('');
                }
              } className="bg-neutral-500 px-3 py-1.5 rounded text-xl">No, Cancel</button>
            </div>
          </div>
        </div>
        {/* Edit Modal */}
        <div className={`${updateOpen ? '' : 'hidden'} flex overflow-hidden justify-center fixed z-50 top-0 right-0 w-full h-screen bg-black`}>
          <form className="flex flex-col gap-2 text-black py-8 pb-24 mx-auto overflow-y-auto w-full px-4 max-w-2xl no-scrollbar">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Edit {item.name}</h1>
            <label className="text-white">Name</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Name"
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Category</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Category"
              type="text"
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Headline</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Headline"
              type="text"
              value={item.headline}
              onChange={(e) => setItem({ ...item, headline: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Process Time</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Process Time"
              type="text"
              value={item.processTime}
              onChange={(e) => setItem({ ...item, processTime: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Price</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Price"
              type="text"
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Image</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Image"
              type="text"
              value={item.image}
              onChange={(e) => setItem({ ...item, image: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.nextElementSibling as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <label className="text-white">Requirements</label>
            <input
              className="w-full py-2 px-3 rounded-lg"
              placeholder="Requirements (comma-separated)"
              type="text"
              value={item.requiredDocs}
              onChange={(e) => setItem({ ...item, requiredDocs: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextElement = e.currentTarget.nextElementSibling?.lastChild as HTMLElement | null;
                  if (nextElement) {
                    nextElement.focus();
                  }
                }
              }}
            />
            <div>
              <label className="text-white">Description</label>
              <textarea
                className="w-full py-2 px-3 rounded-lg"
                placeholder="Description (Optional)"
                rows={5}
                value={item.description}
                onChange={(e) => setItem({ ...item, description: e.target.value })}
              />
            </div>
            <p className="text-rose-500">{Unfilled}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-600 font-bold text-white py-2 px-3 rounded-lg hover:bg-green-700 transition"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(item.requiredDocs)
                  updateItem();
                }}
              >
                { updating ?
                <div>
                  <div className="flex justify-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </div>
                  :
                'Accept'
                }
              </button>
              <button className="bg-red-600 font-bold text-white py-2 px-3 rounded-lg hover:bg-red-700 transition" onClick={(e) => {
                e.preventDefault();
                setUpdateOpen(false);
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
              }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
