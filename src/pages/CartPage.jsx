import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()

  const deliveryCharges = totalPrice > 50 ? 0 : 5
  const total = totalPrice + deliveryCharges

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <img 
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d405a710-1043-4977-a795-202d6d021c32.png?q=90" 
          alt="Empty Cart" 
          className="mx-auto h-48"
        />
        <h1 className="text-xl font-bold text-gray-800 mt-6">Your cart is empty!</h1>
        <p className="text-gray-500 mt-2">Add items to it now.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-flipkart-blue text-white px-12 py-3 rounded-sm font-bold text-sm hover:shadow-md transition-shadow"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left: Cart Items */}
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
           <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-800">My Cart ({cart.length})</h1>
              <button 
                onClick={() => {
                  clearCart()
                  toast.info('Cart cleared')
                }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                CLEAR ALL
              </button>
           </div>

           <div className="divide-y divide-gray-100">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Link to={`/products/${product.id}`} className="text-base font-medium text-gray-900 hover:text-flipkart-blue transition-colors line-clamp-1">
                      {product.title}
                    </Link>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    
                    <div className="flex items-baseline gap-2 pt-2">
                       <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                       <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                       <span className="text-xs font-bold text-green-600">20% Off</span>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                       <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                       </div>

                       <button
                        onClick={() => {
                          removeFromCart(product.id)
                          toast.warn('Removed from cart')
                        }}
                        className="text-sm font-bold text-gray-800 hover:text-red-500 transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-800 font-medium">
                     Delivery by tomorrow | <span className="text-green-600">Free</span>
                  </div>
                </div>
              ))}
           </div>

           <div className="p-4 bg-white sticky bottom-0 border-t border-gray-100 flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
              <Link
                to="/checkout"
                className="bg-flipkart-yellow text-white px-12 py-3 rounded-sm font-bold text-sm shadow-md hover:bg-[#e45b17] transition-colors"
              >
                PLACE ORDER
              </Link>
           </div>
        </div>
      </div>

      {/* Right: Price Details Sidebar */}
      <aside className="lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 sticky top-24">
           <div className="px-6 py-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-500 uppercase">Price Details</h2>
           </div>

           <div className="p-6 space-y-4">
              <div className="flex justify-between text-base text-gray-800">
                 <span>Price ({cart.length} items)</span>
                 <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base text-gray-800">
                 <span>Discount</span>
                 <span className="text-green-600">-$0.00</span>
              </div>
              <div className="flex justify-between text-base text-gray-800">
                 <span>Delivery Charges</span>
                 <span className={deliveryCharges === 0 ? 'text-green-600' : 'text-gray-800'}>
                    {deliveryCharges === 0 ? 'FREE' : `$${deliveryCharges.toFixed(2)}`}
                 </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                 <span>Total Amount</span>
                 <span>${total.toFixed(2)}</span>
              </div>

              <div className="pt-2">
                 <p className="text-green-600 text-sm font-bold">You will save $0.00 on this order</p>
              </div>
           </div>

           <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center gap-2 text-xs text-gray-500 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Safe and Secure Payments. 100% Authentic products.
           </div>
        </div>
      </aside>
    </div>
  )
}