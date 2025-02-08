import Navbar from "../components/Navbar"
import About from "../components/About";
import { Link } from "react-router-dom";
import ParticlesBackground from "../components/Particle";
function Home(){
    return (
      <main>
        <Navbar />
        <div className="particle-container">
        <ParticlesBackground />
        </div>
        <div className="hero">
          <h1>Lost and Found</h1>
          <Link to="/find">
            <button>Find item</button>
          </Link>
        </div>
        <About />
      </main>
    );
} 
export default Home; 