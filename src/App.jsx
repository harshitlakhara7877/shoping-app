import { useState } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFound from './pages/NotFound'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <CartProvider>
      <Router basename="/shoping-app">
        <div className="min-h-screen bg-[#f1f3f6] flex flex-col">
          <Navbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/products" />}
              />

              <Route
                path="/products"
                element={
                  <ProductsPage
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                }
              />

              <Route
                path="/products/:id"
                element={<ProductDetailsPage />}
              />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App