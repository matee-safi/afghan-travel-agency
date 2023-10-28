import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';
import Nav from '../components/Nav';
import data from './visa.json'
import ticket from './ticket.json'
import scholarship from './scholarship.json'
import asylum from './asylum.json'

const Packages = () => {
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
          <div className="mt-12 overflow-none">
            {data.map((item) => (
              <div className="package-card" key={item.id}>
                <div className="package-card__image-container">
                  <Image src={item.image} alt={item.name} layout="fill" />
                </div>
                <div className="package-card__content">
                  <h3 className="package-card__title">{item.name}</h3>
                  <div className="package-card__price">${item.price}</div>
                  <button className="package-card__btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
 
export default Packages;
