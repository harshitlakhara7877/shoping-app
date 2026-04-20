import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import 'swiper/css'
import { fetchProductById } from '../services/api'
import { useCart } from '../hooks/useCart'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const productId = Number(id)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    addToCart,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useCart()

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID')
      setLoading(false)
      return
    }

    setLoading(true)

    fetchProductById(productId)
      .then((data) => setProduct(data))
      .catch(() => setError('Failed to load product details.'))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
        <div className="lg:w-1/2 aspect-square bg-gray-200 rounded-lg" />
        <div className="lg:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-24 bg-gray-200 rounded w-full" />
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded flex-1" />
            <div className="h-12 bg-gray-200 rounded flex-1" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="bg-white p-12 rounded-lg border border-gray-200 shadow-sm text-center">
        <h2 className="text-xl font-bold text-gray-800">{error || 'Product not found.'}</h2>
        <button 
          onClick={() => window.history.back()}
          className="mt-4 bg-flipkart-blue text-white px-6 py-2 rounded-md font-bold text-sm shadow-sm"
        >
          Go Back
        </button>
      </div>
    )
  }

  const wishlistActive = isInWishlist(product.id)
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
        
        {/* Left: Sticky Image Gallery */}
        <div className="lg:w-5/12 flex flex-col gap-4">
          <div className="relative aspect-square border border-gray-100 rounded-lg p-8 flex items-center justify-center bg-white group">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            
            <button
               onClick={() => {
                wishlistActive ? removeFromWishlist(product.id) : addToWishlist(product)
                toast.info(wishlistActive ? 'Removed from wishlist' : 'Added to wishlist')
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:scale-110 transition-transform"
            >
               <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${wishlistActive ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                addToCart(product)
                toast.success('Added to cart')
              }}
              className="flex-1 bg-amazon-orange hover:bg-[#e69b32] text-white py-4 rounded-md font-bold text-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              ADD TO CART
            </button>
            <button
              onClick={() => {
                addToCart(product)
                window.location.href = '/checkout'
              }}
              className="flex-1 bg-flipkart-yellow hover:bg-[#e45b17] text-white py-4 rounded-md font-bold text-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              BUY NOW
            </button>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-7/12 space-y-6">
          <nav className="text-xs text-gray-500 font-medium flex items-center gap-1 uppercase tracking-wider">
            <a href="/products" className="hover:text-flipkart-blue">Home</a>
            <span>/</span>
            <span className="hover:text-flipkart-blue cursor-pointer">{product.category}</span>
          </nav>

          <header className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold gap-1">
                {product.rating.rate}
                <span className="text-[10px] text-white/80">★</span>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {product.rating.count} Ratings & Reviews
              </span>
              <img 
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
                alt="Assured" 
                className="h-5"
              />
            </div>
          </header>

          <div className="space-y-1">
            <p className="text-green-600 text-sm font-bold uppercase">Special Price</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="text-lg font-bold text-green-600">20% off</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Product Description</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 border border-gray-100 rounded-lg flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-flipkart-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                   </svg>
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-800">Free Delivery</p>
                   <p className="text-xs text-gray-500">For all orders above $50</p>
                </div>
             </div>
             
             <div className="p-4 border border-gray-100 rounded-lg flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                   </svg>
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-800">7 Days Returns</p>
                   <p className="text-xs text-gray-500">Hassle-free replacement</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}