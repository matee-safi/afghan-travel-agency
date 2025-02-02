import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-start pt-[50%] md:pt-[20%] lg:pt-[10%]">
      <h1 className="text-6xl font-extrabold neon-text mb-20">4O4</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="pt-2">There was a problem with your request.</p>
      <Link href="/" className="text-amber-500 underline text-lg">
        Go Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
