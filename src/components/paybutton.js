"use client";

import { usePaystackPayment } from "react-paystack";

export default function PayButton({ email, total, onSuccess, disabled }) {
  const config = {
    reference: new Date().getTime().toString(),
    email: email || "guest@rexmart.com",
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  function handleClick() {
    if (!email) {
      alert("Please enter your email before paying online.");
      return;
    }
    initializePayment({
      onSuccess,
      onClose: () => console.log("Payment window closed"),
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition disabled:opacity-50"
    >
      {disabled ? "Processing..." : "Pay Online"}
    </button>
  );
}