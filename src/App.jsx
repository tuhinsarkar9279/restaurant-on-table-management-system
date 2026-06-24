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
  const [cartItems, setCartItems] = useState([]);

  // Add To Cart
  const addToCart = (food) => {
    const existingItem = cartItems.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }

    setCartOpen(true);
  };

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
          <Navbar
            setCartOpen={setCartOpen}
            cartCount={cartItems.length}
          />

          <Hero />

          <Home addToCart={addToCart} />

          <CartSidebar
            isOpen={cartOpen}
            setIsOpen={setCartOpen}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </>
      )}
    </>
  );
}

export default App;