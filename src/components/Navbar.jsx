import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'

export default function Navbar({ searchTerm, onSearchChange }) {
  const { totalQuantity, wishlist } = useCart()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-[#131921] text-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/products" className="flex items-center gap-1 group">
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-amazon-orange transition-colors">
            Snap<span className="text-amazon-yellow">Shop</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex items-center">
          <div className="relative w-full group">
            <input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-md border-0 bg-white px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-amazon-orange outline-none transition-all"
              placeholder="Search ShopHub.in"
              aria-label="Search products"
            />
            <button className="absolute right-0 top-0 bottom-0 px-5 bg-amazon-yellow hover:bg-[#f3a847] rounded-r-md flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amazon-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-6">
          <Link
            to="/wishlist"
            className="flex flex-col items-center group relative pt-1"
            aria-label="Wishlist"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:text-amazon-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-amazon-orange text-amazon-dark text-[11px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-[#131921]">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[12px] font-medium hidden sm:block">Wishlist</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-end gap-1 group relative pt-1"
            aria-label="Cart"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:text-amazon-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 bg-amazon-dark text-amazon-orange text-[14px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            </div>
            <span className="text-[14px] font-bold hidden sm:block self-end pb-1">Cart</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3 flex">
         <div className="relative w-full">
            <input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-md border-0 bg-white px-4 py-2 text-sm text-gray-900 outline-none"
              placeholder="Search ShopHub.in"
              aria-label="Search products mobile"
            />
            <button className="absolute right-0 top-0 bottom-0 px-4 bg-amazon-yellow rounded-r-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amazon-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
      </div>
    </header>
  )
}