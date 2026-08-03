"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const CATEGORIES = [
  "Groceries",
  "Beverages",
  "Household Items",
  "Personal Care",
  "Snacks",
  "Baby Products",
  "Pet Supplies",
];

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!name || !category || !price || !imageFile) {
      setMessage("Please fill in every field and choose an image.");
      return;
    }

    setUploading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      setMessage(`Image upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    const { error: insertError } = await supabase.from("products").insert([
      {
        name,
        category,
        price: parseInt(price, 10),
        image: imageUrl,
      },
    ]);

    if (insertError) {
      setMessage(`Saved image, but saving product failed: ${insertError.message}`);
      setUploading(false);
      return;
    }

    setMessage(`"${name}" added successfully!`);
    setName("");
    setCategory(CATEGORIES[0]);
    setPrice("");
    setImageFile(null);
    e.target.reset();
    setUploading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Product name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price (₦)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-red-600 text-white font-medium px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}