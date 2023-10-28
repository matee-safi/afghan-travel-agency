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
      <div className="h-screen hero-bg">
        <Nav />
        <Hero />
      </div>
      <Services />
      <About />
      <Contact />
      <Footer />
      {/* create an animated cursor */}
      {/* create a loading screen on start */}
      {/* make an animated subheadline that writes and erases on loop */}
      {/* moving objects in the background */}
    </main>
  )
}
