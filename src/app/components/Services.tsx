import Image from 'next/image';
import visa from 'public/visa.png';
import scholarship from 'public/scholarship.png';
import ticket from 'public/ticket.png';
import Link from 'next/link';

const services = () => {
  return (
    <section id="services">
      <div className="container">
        <h2 className="text-4xl text-center font-bold mt-20">What We Offer</h2>
        <div className="p-5">
          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={visa} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold">Visa Assistance</h3>
            <p className="mb-3">We offer visa assistance for many countries, including Pakistan, Iran, Qatar and, etc.</p>
            <Link className="btn-primary" href="packages?category=visa">See Visa Packages</Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={scholarship} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold">Scholarships</h3>
            <p className="mb-3">We offer Scholarships for many countries, including England, Scotland, Belarus and, etc.</p>
            <Link className="btn-primary" href="packages?category=scholarship">See Scholarship Packages</Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-cyan-500 m-5 rounded-full flex items-center justify-center">
              <Image src={ticket} alt="Visa" />
            </div>
            <h3 className="text-xl font-bold">Tickets</h3>
            <p className="mb-3">We offer Tickets at the lowest rates, for in country and outside the country flights</p>
            <Link className="btn-primary" href="packages?category=tickets">See Ticket Prices</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
 
export default services;