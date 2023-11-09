import './globals.css'
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <div className="h-screen">
        <Nav />
        <Hero />
      </div>
      <Services />
      <About />
      <Contact />
      <Footer />
      {/* create an animated cursor */}
      {/* moving objects in the background */}
    </main>
  )
}
