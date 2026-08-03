"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function TrackForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [orderId, setOrderId] = useState(searchParams.get("order") || "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!email || !orderId) {
      setError("Please enter both your email and order number.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.rpc("get_order_status", {
      p_email: email,
      p_order_id: parseInt(orderId, 10),
    });

    setLoading(false);

    if (error) {
      setError("Something went wrong. Please try again.");
      return;
    }

    if (!data || data.length === 0) {
      setError("No order found with that email and order number. Please double-check both.");
      return;
    }

    setResult(data[0]);
  }

  // Auto-run the lookup if both values arrived via the URL
  // (e.g. clicking "Track This Order" right after checkout).
  useEffect(() => {
    if (searchParams.get("email") && searchParams.get("order")) {
      handleLookup({ preventDefault: () => {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Track Your Order
      </h1>
      <p className="text-gray-500 text-sm text-center mb-8">
        Enter the email and order number you received at checkout.
      </p>

      <form onSubmit={handleLookup} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order number</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
            placeholder="e.g. 3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full disabled:opacity-50"
        >
          {loading ? "Checking..." : "Track Order"}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-sm text-center mb-6">{error}</p>
      )}

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Order</span>
            <span className="font-semibold">#{result.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="font-semibold capitalize text-red-600">
              {result.order_status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Payment</span>
            <span className="font-semibold capitalize">{result.payment_status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Delivery Method</span>
            <span className="font-semibold capitalize">{result.delivery_method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Total</span>
            <span className="font-semibold">₦{result.total?.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TrackForm />
    </Suspense>
  );
}