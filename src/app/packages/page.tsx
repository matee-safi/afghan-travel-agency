'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';
import Nav from '../components/Nav';
import visa from '../data/visa.json';
import ticket from '../data/ticket.json';
import scholarship from '../data/scholarship.json';
import asylum from '../data/asylum.json';

export default function Packages() {
  const [category, setCategory] = useState('all');
  const [data, setData] = useState([...visa, ...ticket, ...scholarship, ...asylum]);

  const searchParams = new URLSearchParams(window.location.search);
  const categoryFromURL = searchParams.get('category');

  useEffect(() => {
    if (categoryFromURL) {
      // If a category is present in the URL, update the state
      setCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  useEffect(() => {
    // Filter the data based on the selected category
    switch (category) {
      case 'visa':
        setData(visa);
        break;
      case 'ticket':
        setData(ticket);
        break;
      case 'scholarship':
        setData(scholarship);
        break;
      case 'asylum':
        setData(asylum);
        break;
      default:
        setData([...visa, ...ticket, ...scholarship, ...asylum]);
        break;
    }
  }, [category]);

  return (
    <main>
      <Nav />
      <div className="container">
        <div className="category-tab-container">
          <div className="category-tab gap-1 no-scrollbar">
            <div className={`${category === 'all' ? 'active' : ''} category-tab__item`}>
              <Link href="/packages?category=all">
                <span className="category-tab-text">All</span>
              </Link>
            </div>
            <div className={`${category === 'visa' ? 'active' : ''} category-tab__item`}>
              <Link href="/packages?category=visa">
                <span className="category-tab-text">Visa</span>
              </Link>
            </div>
            <div className={`${category === 'ticket' ? 'active' : ''} category-tab__item`}>
              <Link href="/packages?category=ticket">
                <span className="category-tab-text">Ticket</span>
              </Link>
            </div>
            <div className={`${category === 'scholarship' ? 'active' : ''} category-tab__item`}>
              <Link href="/packages?category=scholarship">
                <span className="category-tab-text">Scholarship</span>
              </Link>
            </div>
            <div className={`${category === 'asylum' ? 'active' : ''} category-tab__item`}>
              <Link href="/packages?category=asylum">
                <span className="category-tab-text">Asylum</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="packages">
        <div className="container">
          <div className="mt-12 p-2 overflow-none">
            {data.length < 1 && (
              <div className="flex h-40 items-center justify-center">
                <h1 className="text-xl text-gray-500 font-bold">No Package available at the moment</h1>
              </div>
            )}
            {data.map((item, index) => (
              <div className="package-card" key={index}>
                <div className="package-card__content grid grid-cols-12 p-2 my-2 bg-orange-700">
                  <div className="package-card__image-container col-span-3 items-center flex">
                    <Image className="rounded-lg" src={item.image} alt={item.name} width={74} height={74} />
                  </div>
                  <div className="col-span-7">
                    <h3 className="package-card__title">{item.name}</h3>
                    <p>Process time: </p>
                    <p>medical 90 days</p>
                  </div>
                  <div className="package-card__price col-span-2">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
