const About = () => {
  return (
    <section id="about">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="flex-grow md:w-1/2 md:mt-4 lg:mt-6 order-2 md:order-1">
          <div className="flex justify-center p-5">
            <iframe className="rounded-lg border-4 border-red-500 w-full h-80" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6195.005197441329!2d69.16665547540066!3d34.5368208138608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f0e31e7063f%3A0xa9325fbf8366059d!2zQWZnaGFuIFRyYXZlbCBBZ2VuY3kgLSDYtNix2qnYqiDYs9uM2KfYrdiq24wg2KfZgdi62KfZhg!5e0!3m2!1sen!2s!4v1698301029086!5m2!1sen!2s" loading="lazy"></iframe>
          </div>
        </div>
        <div className="flex-grow text-right md:w-1/2 md:mr-4 order-1 md:order-2">
          <h1 className="m-5 md:mt-10 lg:md-15 xl:mt-20 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-400">درباره ما</h1>
          <p className="m-5 lg:text-xl">در شرکت سیاحتی افغان، با بیش از یک دهه تجربه کاری برای ساده سازی رویاهای سفر شما تلاش می کنیم. ما کمک های معتبر ویزا، پایین ترین قیمت تکت و بورسیه های تحصیلی انحصاری اروپا را ارائه می دهیم. به علاوه، خط مشی بازپرداخت کامل ما تضمین می کند که سفر شما بدون استرس باشد</p>
          <p className="m-5 lg:text-xl font-semibold text-red-300">شما می توانید موقعیت ما را در این نقشه بیابید</p>
        </div>
      </div>
    </section>
  );
}

export default About;
