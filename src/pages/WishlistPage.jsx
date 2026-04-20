import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart()

  if (!wishlist.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
         <img 
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d405a710-1043-4977-a795-202d6d021c32.png?q=90" 
          alt="Empty Wishlist" 
          className="mx-auto h-48 opacity-50 grayscale"
        />
        <h1 className="text-xl font-bold text-gray-800 mt-6">Empty Wishlist</h1>
        <p className="text-gray-500 mt-2">You have no items in your wishlist. Start adding!</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-flipkart-blue text-white px-12 py-3 rounded-sm font-bold text-sm"
        >
          Add Items
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
         <h1 className="text-lg font-bold text-gray-800 uppercase tracking-wide">My Wishlist ({wishlist.length})</h1>
      </div>

      <div className="divide-y divide-gray-100">
        {wishlist.map((product) => (
          <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-6 group">
            <div className="w-24 h-24 flex-shrink-0 mx-auto sm:mx-0 p-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                 <div>
                    <Link to={`/products/${product.id}`} className="text-base font-medium text-gray-900 hover:text-flipkart-blue transition-colors line-clamp-1">
                      {product.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                       <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold gap-0.5">
                          {product.rating.rate}
                          <span className="text-[8px] text-white/80">★</span>
                       </div>
                       <span className="text-xs font-medium text-gray-400">({product.rating.count})</span>
                    </div>
                 </div>
                 
                 <button 
                  onClick={() => {
                    removeFromWishlist(product.id)
                    toast.info('Removed from wishlist')
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                 </button>
              </div>

              <div className="flex items-baseline gap-2">
                 <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                 <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                 <span className="text-xs font-bold text-green-600">20% Off</span>
              </div>

              <div className="pt-2">
                 <button
                    onClick={() => {
                      addToCart(product)
                      removeFromWishlist(product.id)
                      toast.success('Moved to cart')
                    }}
                    className="bg-amazon-yellow hover:bg-[#f7ca00] text-amazon-dark px-6 py-2 rounded-sm font-bold text-xs shadow-sm border border-[#fcd200] transition-colors"
                  >
                    MOVE TO CART
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}