import Link from 'next/link';

const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <h1 className="m-5 text-4xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-400">Have An Inquiry?</h1>
        <p className="m-5 text-center">If you have a general inquiry and would like to speak to our team, you can contact us via Whatsapp by using the button below.</p>
        <div className="flex justify-center">
          <Link className="btn-hover" href="w.app">
            <div className="flex text-lg justify-between p-5">
              <div className="flex items-center justify-center bg-black">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg group-hover bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur"></div>
                  <button className="relative rounded-lg bg-primary px-2 py-1 text-white">Chat on Whatsapp</button>
                </div>
              </div>
            </div>
          </Link>
          <Link className="btn-hover" href="packages">
            <div className="flex text-lg justify-between p-5">
              <div className="flex items-center justify-center bg-black">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg group-hover bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur"></div>
                  <button className="relative rounded-lg bg-primary px-2 py-1 text-white">See Packages</button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;
