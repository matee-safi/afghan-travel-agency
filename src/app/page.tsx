import "./globals.css";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Security from "./components/Security";
import Popular from "./components/Popular";

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <Popular />
      <Services />
      <Security />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
