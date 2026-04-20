import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const deliveryCharges = totalPrice > 50 ? 0 : 5
  const total = totalPrice + deliveryCharges

  if (!cart.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">No items to checkout</h1>
        <p className="mt-2 text-gray-500">Your cart is empty, add items before checking out.</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-6 inline-block bg-flipkart-blue text-white px-8 py-2 rounded-sm font-bold text-sm"
        >
          Go to Shop
        </button>
      </div>
    )
  }

  const onSubmit = () => {
    toast.info('Processing payment...')
    setTimeout(() => {
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/products')
    }, 2000)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Checkout Steps */}
      <div className="flex-1 space-y-4">
        {/* Address Section (Mock) */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
           <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
              <span className="w-5 h-5 bg-gray-100 text-flipkart-blue text-xs font-bold flex items-center justify-center rounded">1</span>
              <h2 className="text-base font-bold text-gray-500 uppercase">Delivery Address</h2>
           </div>
           <div className="p-6">
              <div className="flex items-center gap-4">
                 <span className="font-bold text-gray-800">Harsh Vardhan</span>
                 <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase">Home</span>
                 <span className="font-bold text-gray-800">9999999999</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">123, Modern Street, Tech City, Karnataka - 560001</p>
           </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
           <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-flipkart-blue text-white">
              <span className="w-5 h-5 bg-white text-flipkart-blue text-xs font-bold flex items-center justify-center rounded">2</span>
              <h2 className="text-base font-bold uppercase">Order Summary</h2>
           </div>
           
           <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-6 flex gap-6">
                   <div className="w-16 h-16 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain" />
                   </div>
                   <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm font-bold text-gray-900 mt-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Payment Section (Mock) */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
           <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
              <span className="w-5 h-5 bg-gray-100 text-flipkart-blue text-xs font-bold flex items-center justify-center rounded">3</span>
              <h2 className="text-base font-bold text-gray-500 uppercase tracking-wide">Payment Options</h2>
           </div>
           <div className="p-6">
              <label className="flex items-center gap-4 cursor-pointer p-4 border border-blue-50 bg-blue-50 rounded">
                 <input type="radio" checked readOnly className="w-4 h-4 text-flipkart-blue" />
                 <span className="text-sm font-bold text-gray-800">Cash on Delivery</span>
              </label>
           </div>
           
           <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onSubmit}
                className="bg-flipkart-yellow text-white px-12 py-3 rounded-sm font-bold text-sm shadow-md hover:bg-[#e45b17] transition-colors uppercase"
              >
                Confirm Order
              </button>
           </div>
        </div>
      </div>

      {/* Right: Price Summary */}
      <aside className="lg:w-80 flex-shrink-0">
         <div className="bg-white rounded-sm shadow-sm border border-gray-200 sticky top-24">
            <div className="px-6 py-3 border-b border-gray-100">
               <h2 className="text-base font-bold text-gray-500 uppercase tracking-wide">Price Details</h2>
            </div>
            <div className="p-6 space-y-4 text-sm">
               <div className="flex justify-between">
                  <span className="text-gray-600">Price ({cart.length} items)</span>
                  <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={deliveryCharges === 0 ? 'text-green-600' : 'text-gray-900'}>
                    {deliveryCharges === 0 ? 'FREE' : `$${deliveryCharges.toFixed(2)}`}
                  </span>
               </div>
               <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Payable</span>
                  <span>${total.toFixed(2)}</span>
               </div>
            </div>
         </div>
      </aside>
    </div>
  )
}