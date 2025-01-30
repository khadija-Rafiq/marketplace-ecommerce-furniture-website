
"use client";

import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/action";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Product } from "@/types/products";
import { useRouter } from "next/navigation"; // ✅ Correct Import for App Router

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // ✅ Now using next/navigation

  useEffect(() => {
    setIsClient(true);
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.stockLevel + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.stockLevel > 1) {
      handleQuantityChange(id, product.stockLevel - 1);
    }
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Please review your cart before checkout.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully processed", "success");
        router.push("/checkout"); // ✅ Navigation now works
        setCartItems([]);
      }
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3 px-4 flex items-center">
                  {item.imagePath && (
                    <Image
                      src={urlFor(item.imagePath).url()}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt="image"
                      width={500}
                      height={500}
                    />
                  )}
                </td>
                <td className="py-3 px-4">${item.price}</td>
                <td className="py-3 px-4 flex items-center">
                  <button onClick={() => handleDecrement(item._id)} className="px-2 py-1 bg-gray-200 rounded-lg">
                    -
                  </button>
                  <span className="mx-2">{item.stockLevel}</span>
                  <button onClick={() => handleIncrement(item._id)} className="px-2 py-1 bg-gray-200 rounded-lg">
                    +
                  </button>
                </td>
                <td className="py-3 px-4">${item.price * item.stockLevel}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleRemove(item._id)} className="text-red-600 hover:text-red-800 rounded-lg p-2">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Summary */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-semibold">Total: ${calculatedTotal()}</div>
        <button
          onClick={handleProceed}
          className="px-2 w-full bg-gradient-to-r text-white from-blue-600 to-purple-500 py-2 rounded-lg shadow-lg transition-transform duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;


