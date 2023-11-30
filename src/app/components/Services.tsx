import Image from 'next/image';
import visa from 'public/visa.png';
import scholarship from 'public/scholarship.png';
import ticket from 'public/ticket.png';
import immigration from 'public/immigration.png';
import Link from 'next/link';

const services = () => {
  return (
    <section id="services">
      <div className="container mx-auto">
        <h1 className="m-5 mt-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-400">Our Services</h1>
        <div className="p-5 md:grid md:grid-cols-2">

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={visa} alt="Visa" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-ellipsis text-orange-300">Visa Assistance</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">We offer visa assistance for many countries, including Pakistan, Iran, Qatar and, etc. You can see all of our Visa packages and their prices by pressing the button bellow.</p>
            <Link className="btn-primary" href="packages?category=visa">
              <button className="btn-hover btn-color">See Visa Packages</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={scholarship} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">Scholarships</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">We offer Scholarships for many countries, including England, Scotland, Belarus and, etc. Our team of professional consultants will help you on every step of your journey.</p>
            <Link className="btn-primary" href="packages?category=scholarship">
              <button className="btn-hover btn-color">Scholarship Packages</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={ticket} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">Tickets</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">We specialize in providing the lowest-rate tickets for both national and international flights, ensuring affordable travel options for all your journeys and destinations.</p>
            <Link className="btn-primary" href="packages?category=ticket">
              <button className="btn-hover btn-color">See Ticket Packages</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image width={128} height={128} src={immigration} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">Asylum</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">We offer Asylum Offers to a variety of countries with great conditions, you'll block your money at an agiotage and pay us when you arrive at your destination.</p>
            <Link className="btn-primary" href="packages?category=asylum">
              <button className="btn-hover btn-color">See Asylum Packages</button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
 
export default services;
