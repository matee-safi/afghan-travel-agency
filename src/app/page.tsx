import "./globals.css";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Security from "./components/Security";

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <Services />
      <Security />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
