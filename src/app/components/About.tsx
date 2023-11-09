const About = () => {
  return (
    <section id="about">
      <div className="container mx-auto md:flex">
        <div className="w-full md:mt-4 lg:mt-6">
          <h1 className="m-5 text-4xl md:text-5xl lg-text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-400">About Us</h1>
          <p className="m-5 lg:text-lg">At Afghan Travel Agency, with over a decade of experience, we&apos;re dedicated to simplifying your travel dreams. We offer reliable visa assistance, the lowest ticket prices, and exclusive scholarships to Europe. Plus, our full refund policy ensures your journey is stress-free.</p>
          <p className="m-5 lg:text-lg font-semibold text-red-300">You can find our location in this interactive map.</p>
        </div>
        <div className="flex justify-center p-5 w-full">
          <iframe className="rounded-lg border-4 border-red-500 w-full h-80" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6195.005197441329!2d69.16665547540066!3d34.5368208138608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f0e31e7063f%3A0xa9325fbf8366059d!2zQWZnaGFuIFRyYXZlbCBBZ2VuY3kgLSDYtNix2qnYqiDYs9uM2KfYrdiq24wg2KfZgdi62KfZhg!5e0!3m2!1sen!2s!4v1698301029086!5m2!1sen!2s" loading="lazy"></iframe>
        </div>
      </div>
    </section>
  );
}

export default About;
