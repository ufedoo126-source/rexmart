"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AdminAddProduct from "@/components/AdminAddProduct";
import AdminManageProducts from "@/components/AdminManageProducts";
import AdminOrders from "@/components/AdminOrders";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase());

      if (adminEmails.includes(user.email.toLowerCase())) {
        setIsAdmin(true);
      } else {
        router.push("/");
      }

      setChecking(false);
    }

    checkAdmin();
  }, [router]);

  if (checking) {
    return <div className="p-8 text-center">Checking access...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("add")}
          className={`pb-2 px-2 font-medium ${
            activeTab === "add"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-500"
          }`}
        >
          Add Product
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`pb-2 px-2 font-medium ${
            activeTab === "manage"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-500"
          }`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-2 px-2 font-medium ${
            activeTab === "orders"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-500"
          }`}
        >
          Orders
        </button>
      </div>

      {activeTab === "add" && <AdminAddProduct />}
      {activeTab === "manage" && <AdminManageProducts />}
      {activeTab === "orders" && <AdminOrders />}
    </div>
  );
}