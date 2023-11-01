import Image from 'next/image';
import visa from 'public/visa.png';
import scholarship from 'public/scholarship.png';
import ticket from 'public/ticket.png';
import immigration from 'public/immigration.png';
import Link from 'next/link';

const services = () => {
  return (
    <section id="services">
      <div className="container">
        <h1 className="m-5 text-4xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-400">Our Services</h1>
        <div className="p-5">
          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={visa} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">Visa Assistance</h3>
            <p className="mb-3">We offer visa assistance for many countries, including Pakistan, Iran, Qatar and, etc. You can see all of our Visa packages and their prices by pressing the button bellow.</p>
            <Link className="btn-primary" href="packages?category=visa">See Visa Packages</Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={scholarship} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">Scholarships</h3>
            <p className="mb-3">We offer Scholarships for many countries, including England, Scotland, Belarus and, etc. Our team of professional consultants will help you on every step of your journey.</p>
            <Link className="btn-primary" href="packages?category=scholarship">See Scholarship Packages</Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={ticket} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">Tickets</h3>
            <p className="mb-3">We specialize in providing the lowest-rate tickets for both national and international flights, ensuring affordable travel options for all your destinations.</p>
            <Link className="btn-primary" href="packages?category=ticket">See Ticket Packages</Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image width={128} height={128} src={immigration} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">Asylum</h3>
            <p className="mb-3">We offer Asylum Offers to a varaity of countries with great conditions, you can be block your money at an agiotage of your choice and pay us when you arrive at your destination.</p>
            <Link className="btn-primary" href="packages?category=asylum">See Asylum Packages</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
 
export default services;