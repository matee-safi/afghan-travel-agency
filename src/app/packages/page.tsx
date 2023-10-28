import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';
import Nav from '../components/Nav';

const Packages = () => {
  // create a list of packages in an array
  let packages = [
    {
      id: 1,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 2,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 3,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 4,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 5,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 6,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 7,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
    {
      id: 8,
      name: 'Turkey Visa',
      price: 500,
      category: 'visa',
      image: '/packages/turkey-visa.jpg'
    },
  ];

  return (
    <main>
      <Nav />
      <div className="container">
        <div className="category-tab-container">
          <div className="category-tab gap-1 no-scrollbar">
            <div className="category-tab__item">
              <Link href="/packages"><span className="category-tab-text">All</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=visa"><span className="category-tab-text">Visa</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=ticket"><span className="category-tab-text">Ticket</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=scholarship"><span className="category-tab-text">Scholarship</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=asylum"><span className="category-tab-text">Asylum</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=asylum"><span className="category-tab-text">Asylum</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=asylum"><span className="category-tab-text">Asylum</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=asylum"><span className="category-tab-text">Asylum</span></Link>
            </div>
            <div className="category-tab__item">
              <Link href="/packages?category=asylum"><span className="category-tab-text">Asylum</span></Link>
            </div>
          </div>
        </div>
      </div>
      <section id="packages">
        <div className="container">
          {packages.map((item) => (
            <div className="package-card" key={item.id}>
              <div className="package-card__image-container">
                <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
              </div>
              <div className="package-card__content">
                <h3 className="package-card__title">{item.name}</h3>
                <div className="package-card__price">${item.price}</div>
                <button className="package-card__btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
 
export default Packages;
