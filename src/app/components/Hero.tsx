import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-red-500/10 rounded-full text-red-500 text-sm font-medium">
            Revolutionizing Travel Booking
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            The Future of{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-500 text-transparent bg-clip-text">
              Online <br /> Travel Booking
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Join thousands who are already saving on Traveling costs through our
            Secure Online Travel agency bookings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="packages?category=all"
              className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              See Our Packages <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="https://wa.me/93785105088"
              target="_blank"
              className="border border-gray-800 hover:border-gray-700 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              Get in Touch
            </Link>
          </div>
          <div className="mt-12 pt-12 border-t border-gray-800 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-1">5k+</div>
              <div className="text-sm text-gray-400">Satisfied Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">$200K+</div>
              <div className="text-sm text-gray-400">Cost Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
