"use client";

import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ReviewsModal({ product, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchReviews();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email);
      }
    });
  }, []);

  async function fetchReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false });

    if (!error) setReviews(data);
    setLoading(false);
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!email || !orderId || !rating) {
      setFormError("Please fill in your email, order number, and a rating.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.rpc("submit_review", {
      p_product_id: product.id,
      p_customer_email: email,
      p_order_id: parseInt(orderId, 10),
      p_rating: rating,
      p_comment: comment,
    });

    setSubmitting(false);

    if (error) {
      setFormError(
        error.message.includes("No matching order")
          ? "We couldn't verify this purchase. Double-check your email and order number."
          : "Something went wrong. Please try again."
      );
      return;
    }

    setFormSuccess("Thanks! Your review has been posted.");
    setOrderId("");
    setComment("");
    setRating(5);
    fetchReviews();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h2>

        {avgRating ? (
          <p className="text-red-600 font-semibold mb-4">
            ⭐ {avgRating} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </p>
        ) : (
          <p className="text-gray-400 mb-4">No reviews yet — be the first!</p>
        )}

        {/* EXISTING REVIEWS */}
        <div className="space-y-3 mb-6 max-h-40 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-gray-400">Loading reviews...</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="border border-gray-100 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">
                  {"⭐".repeat(r.rating)}
                </p>
                {r.comment && (
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* SUBMIT FORM */}
        <div className="border-t border-gray-100 pt-4">
          <p className="font-semibold text-gray-900 mb-3">Leave a review</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!user}
                className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-50"
              />
              {user && (
                <p className="text-xs text-gray-400 mt-1">Using your account email.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order number</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="From your checkout confirmation"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    className="p-0.5"
                  >
                    <Star
                      size={22}
                      className={n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            {formError && <p className="text-red-600 text-sm">{formError}</p>}
            {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}