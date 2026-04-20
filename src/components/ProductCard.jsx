import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)

  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success('Added to cart')
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.info('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.info('Added to wishlist')
    }
  }

  return (
    <div className="group relative flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md h-full">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 border border-gray-200 hover:bg-white shadow-sm transition-colors group/wish"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/wish:text-red-500'}`} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden p-6 bg-gray-50 flex items-center justify-center rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 pt-4">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-flipkart-blue transition-colors">
            {product.title}
          </h3>

          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center gap-0.5 text-amazon-orange text-xs">
              {stars.map((star) => (
                <span key={star}>
                  {product.rating.rate >= star ? '★' : product.rating.rate >= star - 0.5 ? '☆' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-[12px] text-gray-500">({product.rating.count})</span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
          </div>

          <p className="mt-1 text-[11px] text-green-600 font-semibold">
            In stock
          </p>

          <div className="mt-auto pt-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-amazon-yellow hover:bg-[#f7ca00] text-amazon-dark py-2 px-4 rounded-full text-xs font-medium shadow-sm border border-[#fcd200] transition-colors active:scale-[0.98]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}