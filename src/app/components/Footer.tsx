import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div
              className={`${bebasNeue.className} text-lg flex items-center space-x-2 mb-4`}
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={32}
                height={32}
                className="w-6 h-6 mr-px"
              />
              Afghan Travel Agency
            </div>
            <p className="text-sm text-gray-400">
              Revolutionizing Travel Agencies through secure peer-to-peer
              Booking.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Security", "Pricing", "Network"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Help Center", "API", "Status"],
            },
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            ©2025 Afghan Travel Agency. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
