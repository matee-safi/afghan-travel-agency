import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-red-500/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-red-500/20 to-orange-500/20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="m-5 text-4xl md:text-5xl lg:text-6xl pb-1 font-extrabold text-center">
          Have An Inquiry?
        </h1>
        <p className="m-5 lg:my-10 text-gray-400 text-center md:text-xl lg:text-2xl md:max-w-xl lg:max-w-2xl md:mx-auto">
          If you have a general inquiry and would like to speak to our team, you
          can contact us via Whatsapp by using the button on the left. And if
          you want to see our packages and prices use the button on the right.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="https://wa.me/93785105088"
            target="_blank"
            className="border border-gray-800 hover:border-gray-700 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Get in Touch <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="packages?category=all"
            className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            See Our Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
