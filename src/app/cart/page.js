"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";

const PayButton = dynamic(() => import("@/components/paybutton"), {
  ssr: false,
});

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [placedOrderEmail, setPlacedOrderEmail] = useState("");

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

  async function saveOrder(paymentStatus, paymentReference) {
    setPlacing(true);
    const emailToSave = email || "guest@rexmart.com";

    const { data, error } = await supabase.rpc("create_order", {
      p_customer_email: emailToSave,
      p_items: cart,
      p_total: total,
      p_delivery_method: deliveryMethod,
      p_address: deliveryMethod === "delivery" ? address : null,
      p_payment_status: paymentStatus,
      p_payment_reference: paymentReference || null,
    });

    setPlacing(false);

    if (error) {
      console.error("Error saving order:", error);
      alert("Something went wrong saving your order. Please try again.");
    } else {
      setPlacedOrderId(data);
      setPlacedOrderEmail(emailToSave);
      clearCart();
      setOrderPlaced(true);
    }
  }

  function handlePaystackSuccess(reference) {
    saveOrder("paid", reference.reference);
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed!
        </h1>
        <p className="text-gray-500 mb-2">
          Thank you for shopping with Rex Mart. We&apos;ll be in touch soon.
        </p>

        {placedOrderId && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 inline-block">
            <p className="text-sm text-gray-500">Your order number</p>
            <p className="text-2xl font-bold text-red-600">#{placedOrderId}</p>
            <p className="text-xs text-gray-400 mt-1">
              Save this number — you&apos;ll need it with your email to track your order.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
          {placedOrderId && (
            <Link
              href={`/track?email=${encodeURIComponent(
                placedOrderEmail
              )}&order=${placedOrderId}`}
              className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-full"
            >
              Track This Order
            </Link>
          )}
        </div>
      </div>
    );
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

      {/* EMAIL */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-900 mb-2 text-sm">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
        />
        <p className="text-gray-400 text-xs mt-1">
          Used for order confirmation, online payment, and order tracking.
        </p>
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

      {/* TOTAL */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-bold text-gray-900">Total</p>
        <p className="text-lg font-bold text-red-600">
          ₦{total.toLocaleString()}
        </p>
      </div>

      {/* CHECKOUT OPTIONS */}
      <div className="space-y-3">
        <PayButton
          email={email}
          total={total}
          disabled={placing}
          onSuccess={handlePaystackSuccess}
        />

        <a
          href={`https://wa.me/2347040443049?text=${buildWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => saveOrder("pending_whatsapp", null)}
          className="block text-center border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold px-8 py-3 rounded-full transition"
        >
          Checkout via WhatsApp
        </a>
      </div>
    </div>
  );
}