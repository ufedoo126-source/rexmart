"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/app/logo.jpeg";
import { useWishlist } from "@/context/WishlistContext";
import { supabase } from "@/lib/supabaseClient";

export default function Nav() {
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
    { href: "/delivery", label: "Delivery" },
    { href: "/wishlist", label: `❤️ (${wishlist.length})` },
  ];

  return (
    <nav className="relative w-full h-20 sm:h-28 lg:h-32">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={logo} alt="Rex Mart logo" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
          Rex Mart
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-white">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-200 transition">
              {link.label}
            </Link>
          ))}

          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-200 transition">
              Log Out
            </button>
          ) : (
            <Link href="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
          )}

          <Link
            href="/cart"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-full transition"
          >
            <ShoppingCart size={16} />
            Cart ({itemCount})
          </Link>
        </div>

        {/* MOBILE: Cart icon + Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/cart" className="text-white flex items-center gap-1">
            <ShoppingCart size={20} />
            <span className="text-sm">({itemCount})</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="block w-full text-left px-6 py-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}