"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Create an Account
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Optional — you can also{" "}
        <a href="/shop" className="text-red-600 font-medium">
          shop as a guest
        </a>
        .
      </p>

      {success ? (
        <div className="text-center bg-green-50 border border-green-200 rounded-xl p-6">
          <p className="text-2xl mb-2">📧</p>
          <p className="font-semibold text-gray-900 mb-2">
            Check your email!
          </p>
          <p className="text-gray-600 text-sm">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account, then come back and log in.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      )}

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-red-600 font-medium">
          Log in
        </a>
      </p>
    </div>
  );
}