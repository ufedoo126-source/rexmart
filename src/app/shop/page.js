"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const categories = [
  "All",
  "Groceries",
  "Beverages",
  "Household Items",
  "Personal Care",
  "Snacks",
  "Baby Products",
  "Pet Supplies",
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Shop
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:border-red-600"
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="relative bg-white border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center"
            >
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 text-lg"
              >
                {isWishlisted(product.id) ? "❤️" : "🤍"}
              </button>
              <p className="text-5xl mb-3">{product.image}</p>
              <p className="font-semibold text-gray-900 mb-1">
                {product.name}
              </p>
              <p className="text-red-600 font-bold mb-4">
                ₦{product.price.toLocaleString()}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold px-4 py-2 rounded-full w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}