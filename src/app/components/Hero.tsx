import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero">
      <div className="flex justify-center items-center flex-col mb-20">
        <p className="text-3xl text-center mt-20 p-10 font-light">Helping you Travel is our life&apos;s mission</p>
        <Link href="packages" className="btn-primary">See Packages</Link>
      </div>
    </section>
  );
}

export default Hero;
