"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [address, setAddress] = useState("");

  function buildWhatsAppMessage() {
    let message = `Hello Rex Mart, I'd like to place an order:\n\n`;
    cart.forEach((item) => {
      message += `• ${item.name} x${item.qty} — ₦${(
        item.price * item.qty
      ).toLocaleString()}\n`;
    });
    message += `\nTotal: ₦${total.toLocaleString()}\n`;
    message += `\nDelivery Method: ${
      deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"
    }`;
    if (deliveryMethod === "delivery") {
      message += `\nAddress: ${address || "(not provided)"}`;
    }
    return encodeURIComponent(message);
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Your Cart
      </h1>

      {/* ITEMS */}
      <div className="space-y-4 mb-10">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{item.image}</span>
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-red-600 text-sm font-medium">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-600 text-sm ml-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELIVERY METHOD */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="font-semibold text-gray-900 mb-3">Delivery Method</p>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setDeliveryMethod("delivery")}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              deliveryMethod === "delivery"
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            🚚 Home Delivery
          </button>
          <button
            onClick={() => setDeliveryMethod("pickup")}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              deliveryMethod === "pickup"
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            🏬 Store Pickup
          </button>
        </div>

        {deliveryMethod === "delivery" && (
          <input
            type="text"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
          />
        )}
      </div>

      {/* TOTAL + CHECKOUT */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-bold text-gray-900">Total</p>
        <p className="text-lg font-bold text-red-600">
          ₦{total.toLocaleString()}
        </p>
      </div>

      <a
        href={`https://wa.me/2347040443049?text=${buildWhatsAppMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition"
      >
        Checkout via WhatsApp
      </a>
      <p className="text-center text-gray-400 text-sm mt-3">
        Online card payment coming soon — for now, orders are confirmed
        directly with our team on WhatsApp.
      </p>
    </div>
  );
}