import { useState } from "react";
import CIcon from "@coreui/icons-react";
import pizza from "./assets/pizza.png";

import {
  cilX,
  cilMinus,
  cilPlus,
} from "@coreui/icons";

function CartSidebar({ isOpen, setIsOpen }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 14.9,
      quantity: 1,
      image: pizza,
    },
  ]);

  // Increase / Decrease Quantity
  const updateQuantity = (id, action) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  // Calculate Total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[420px] bg-[#111827]
      border-l border-zinc-800 z-50 transition-transform duration-300
      ${
        isOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h2 className="text-3xl font-bold text-white">
          Your Order
        </h2>

       <button
  onClick={() => setIsOpen(false)}
  className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-red-500 transition"
>
  <CIcon
    icon={cilX}
    className="text-white text-lg"
  />
</button>
      </div>

      {/* Cart Items */}
      <div className="p-6 pb-40 overflow-y-auto h-full">
        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <h3 className="text-xl text-zinc-400">
              Your cart is empty
            </h3>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex gap-4 mb-6 bg-zinc-900 p-4 rounded-xl"
            >
              {/* Remove Item */}
              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500"
              >
                <CIcon icon={cilX} />
              </button>

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1">
                <h4 className="text-white font-semibold">
                  {item.name}
                </h4>

                <p className="text-amber-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      "decrease"
                    )
                  }
                  className="w-8 h-8 border border-zinc-700 rounded flex items-center justify-center text-white"
                >
                  <CIcon icon={cilMinus} />
                </button>

                <span className="text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      "increase"
                    )
                  }
                  className="w-8 h-8 border border-zinc-700 rounded flex items-center justify-center text-white"
                >
                  <CIcon icon={cilPlus} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 w-full border-t border-zinc-800 p-6 bg-[#111827]">
          <div className="flex justify-between text-white text-xl mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <label className="block text-zinc-400 mb-2">
            Table Number
          </label>

          <input
            type="number"
            placeholder="Enter your table number"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-4"
          />

          <button
            className="w-full bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;