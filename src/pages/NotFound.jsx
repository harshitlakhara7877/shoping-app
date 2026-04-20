import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16 text-center">
      <img 
        src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png" 
        alt="404" 
        className="mx-auto h-48 opacity-20"
      />
      <h1 className="text-3xl font-bold text-gray-800 mt-8">Page Not Found</h1>
      <p className="text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
      <Link
        to="/products"
        className="mt-8 inline-block bg-flipkart-blue text-white px-10 py-3 rounded-sm font-bold text-sm shadow-md transition-shadow"
      >
        Go to Homepage
      </Link>
    </div>
  )
}