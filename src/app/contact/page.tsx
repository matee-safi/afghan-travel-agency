import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <main>
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="backdrop-blur-md bg-red-500/50 absolute inset-0 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="text-white relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20 bg-gradient-to-r from-orange-700 to-rose-600">
              <div className="text-center pb-6">
                <h1 className="text-3xl">Contact Us!</h1>
                <p className="text-gray-300">
                  Fill up the form below to send us a message.
                </p>
              </div>
              <form
                action="mailto:matiullahsafibbc@gmail.com"
                method="post"
                encType="text/plain"
              >
                <input
                  className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                />
                <input
                  className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
                <input
                  className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Subject"
                  name="_subject"
                  required
                />
                <textarea
                  className="shadow h-[121px] mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Type your message here..."
                  name="message"
                  required
                />
                <div className="flex justify-between">
                  <input
                    className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    value="Send ➤"
                  />
                  <input
                    className="shadow bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="reset"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
