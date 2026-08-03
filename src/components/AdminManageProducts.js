"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trash2, Save } from "lucide-react";

export default function AdminManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setEditValues({
      name: product.name,
      category: product.category,
      price: product.price,
    });
  }

  async function saveEdit(id) {
    const { error } = await supabase
      .from("products")
      .update({
        name: editValues.name,
        category: editValues.category,
        price: parseInt(editValues.price, 10),
      })
      .eq("id", id);

    if (!error) {
      setProducts(
        products.map((p) =>
          p.id === id ? { ...p, ...editValues, price: parseInt(editValues.price, 10) } : p
        )
      );
      setEditingId(null);
    }
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 border border-gray-200 rounded p-3"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-cover rounded"
          />

          {editingId === product.id ? (
            <div className="flex-1 flex gap-2">
              <input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="border border-gray-300 rounded px-2 py-1 flex-1"
              />
              <input
                value={editValues.category}
                onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                className="border border-gray-300 rounded px-2 py-1 flex-1"
              />
              <input
                type="number"
                value={editValues.price}
                onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                className="border border-gray-300 rounded px-2 py-1 w-24"
              />
              <button onClick={() => saveEdit(product.id)}>
                <Save className="w-5 h-5 text-green-600" />
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                {product.category} — ₦{product.price}
              </p>
            </div>
          )}

          {editingId !== product.id && (
            <button
              onClick={() => startEdit(product)}
              className="text-sm text-red-600 font-medium"
            >
              Edit
            </button>
          )}
          <button onClick={() => handleDelete(product.id)}>
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
}