"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const STATUS_OPTIONS = ["pending", "fulfilled", "delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(orderId, newStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: newStatus })
      .eq("id", orderId);

    if (!error) {
      setOrders(
        orders.map((o) =>
          o.id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    }
  }

  if (loading) return <p>Loading orders...</p>;

  // Group orders by payment_status so "paid" and "pending"/WhatsApp
  // orders are visually separated instead of mixed in one long list.
  const grouped = orders.reduce((acc, order) => {
    const key = order.payment_status || "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.keys(grouped).map((statusGroup) => (
        <div key={statusGroup}>
          <h2 className="text-lg font-semibold capitalize mb-3 text-gray-700">
            {statusGroup} ({grouped[statusGroup].length})
          </h2>

          <div className="space-y-3">
            {grouped[statusGroup].map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.customer_email}</p>
                    <p className="text-sm text-gray-500">
                      {order.delivery_method} — {order.address || "N/A"}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">₦{order.total}</p>
                </div>

                <div className="text-sm text-gray-600">
                  {Array.isArray(order.items) &&
                    order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="text-sm text-gray-500">Status:</label>
                  <select
                    value={order.order_status || "pending"}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
    </div>
  );
}