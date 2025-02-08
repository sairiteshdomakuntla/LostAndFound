import { useState } from "react";
import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom';
function Navbar() {
  const [active, setActive] = useState(false);
  const [cls,setCls]=useState("inactive")

  function openNav() {
    setActive(true)
   setCls("active")
    
  }
  function closeNav(){
    setActive(false)
    setCls("inactive")
  }
  return (
    <nav>
      <a href="/"><img src={logo} alt="" /></a>
      {/* <ul style={{ width: `${width}` }}> */}
      <ul className={cls}>
      <li><Link to="/">Home</Link></li>
    <li><Link to="/find">Find item</Link></li>
    <li><Link to="/post">Post item</Link></li>
    <li><Link to="/#about">About us</Link></li>
      </ul>
      {active ? (
        <button className="menu-container" onClick={closeNav}>
          <CloseIcon className="menu close" />
        </button>
      ) : (
        <button className="menu-container" onClick={openNav}>
          <MenuIcon className="menu" />
        </button>
      )}
    </nav>
  );
}
export default Navbar;
