"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/app/logo.jpeg";
import { useWishlist } from "@/context/WishlistContext";

export default function Nav() {
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="relative w-full h-28 sm:h-32 lg:h-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={logo} alt="Rex Mart logo" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
          Rex Mart
        </Link>
        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-white">
        <Link href="/wishlist" className="hover:text-gray-200 transition">
  ❤️ ({wishlist.length})
        </Link>
          <Link href="/" className="hover:text-gray-200 transition">Home</Link>
          <Link href="/shop" className="hover:text-gray-200 transition">Shop</Link>
          <Link href="/contact" className="hover:text-gray-200 transition">Contact</Link>
          <Link href="/delivery" className="hover:text-gray-200 transition">Delivery</Link>
          <Link
            href="/cart"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-full transition"
          >
            <ShoppingCart size={16} />
            Cart ({itemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}