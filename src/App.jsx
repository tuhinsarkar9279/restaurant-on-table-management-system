import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./navbar";
import Hero from "./hero";
import Home from "./home";
import Loader from "./Loader";
import CartSidebar from "./CartSidebar";

function App() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar setCartOpen={setCartOpen} />

          <Hero />

          <Home />

          <CartSidebar
            isOpen={cartOpen}
            setIsOpen={setCartOpen}
          />
        </>
      )}
    </>
  );
}

export default App;