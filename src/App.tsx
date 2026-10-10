import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Skills, Experience, Projects, Achievements, Contact, Footer } from "./components/Sections";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
