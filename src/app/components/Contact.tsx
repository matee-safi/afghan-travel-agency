import Link from "next/link";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container mx-auto md:mt-20">
        <h1 className="m-5 text-4xl md:text-5xl lg:text-6xl pb-1 font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-400">
          Have An Inquiry?
        </h1>
        <p className="m-5 lg:my-10 text-center md:text-xl lg:text-2xl md:max-w-xl lg:max-w-2xl md:mx-auto">
          If you have a general inquiry and would like to speak to our team, you
          can contact us via Whatsapp by using the button on the left. And if
          you want to see our packages and prices use the button on the right.
        </p>
        <div className="flex justify-center md:gap-10">
          <Link href="https://wa.me/93785105088" target="_blank">
            <div className="flex text-lg justify-between p-5">
              <div className="flex items-center justify-center bg-black">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-700 via-green-500 to-lime-500 blur"></div>
                  <button className="relative md:text-2xl lg:text-3xl rounded-lg bg-primary px-2 py-1 text-white">
                    Chat on Whatsapp
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <Link href="packages?category=all">
            <div className="flex text-lg justify-between p-5">
              <div className="flex items-center justify-center bg-black">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 blur"></div>
                  <button className="relative md:text-2xl lg:text-3xl rounded-lg bg-primary px-2 py-1 text-white">
                    See Packages
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
