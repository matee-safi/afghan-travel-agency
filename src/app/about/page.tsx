import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <main className="container mx-auto px-4 md:px-10 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent" />
        <section id="about" className=" relative overflow-hidden">
          <div className="container mx-auto md:flex">
            <div className="w-full md:mt-4 lg:mt-6">
              <h1 className="m-5 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-500">
                About Us
              </h1>
              <p className="m-5 lg:text-xl">
                At Afghan Travel Agency, with over a decade of experience,
                we&apos;re dedicated to simplifying your travel dreams. We offer
                reliable visa assistance, the lowest ticket prices, and
                exclusive scholarships to Europe. Plus, our full refund policy
                ensures your journey is stress-free.
              </p>
              <p className="m-5 lg:text-xl font-semibold text-red-300">
                You can find our location in this interactive map.
              </p>
            </div>
            <div className="flex justify-center p-5 w-full">
              <iframe
                className="rounded-lg border-4 border-red-500 w-full h-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6195.005197441329!2d69.16665547540066!3d34.5368208138608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f0e31e7063f%3A0xa9325fbf8366059d!2zQWZnaGFuIFRyYXZlbCBBZ2VuY3kgLSDYtNix2qnYqiDYs9uM2KfYrdiq24wg2KfZgdi62KfZhg!5e0!3m2!1sen!2s!4v1698301029086!5m2!1sen!2s"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className=" py-4 text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-500">
            Why Choose Us?
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border rounded-lg shadow-sm text-center">
              <h3 className="font-bold text-lg">Local Expertise</h3>
              <p className="text-gray-600">
                We know Afghanistan inside out, ensuring authentic experiences.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-sm text-center">
              <h3 className="font-bold text-lg">Safe & Reliable</h3>
              <p className="text-gray-600">
                Your safety is our top priority, with well-planned itineraries.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-sm text-center">
              <h3 className="font-bold text-lg">Custom Tours</h3>
              <p className="text-gray-600">
                Tailored trips to suit your preferences and budget.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
