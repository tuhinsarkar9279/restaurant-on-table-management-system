import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import Navbar from "./pages/navbar";
import Hero from "./pages/hero";
import Home from "./pages/home";
import Loader from "./Loader";
import CartSidebar from "./pages/CartSidebar";

import adminStore from "./admin/src/store";

const AdminApp = lazy(() => import("./admin/src/App.jsx"));

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

  const shopPage = (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar setCartOpen={setCartOpen} cartCount={cartItems.length} />
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

  const isAdminPath = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')

  if (isAdminPath) {
    if (!window.location.hash) {
      window.location.replace('/admin/#/dashboard')
      return null
    }

    return (
      <Provider store={adminStore}>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <Loader />
            </div>
          }
        >
          <AdminApp />
        </Suspense>
      </Provider>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={shopPage} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;