import { Link } from "react-router-dom";
import Btn from "./button";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import logo from "../assets/logo.png";

function Navbar({ setCartOpen }) {
  return (
    <div className="w-full bg-black px-5 py-4 flex justify-between items-center">
      <div className="logo">
        <img
          src={logo}
          className="w-12.5"
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-3">
        
        <button onClick={() => setCartOpen(true)}>
          <Btn
            icon={<CIcon icon={cilCart} />}
            name="Cart"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;