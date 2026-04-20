import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import ProductCard from '../components/ProductCard'

export default function ProductsPage({ searchTerm, onSearchChange }) {
  const { products, loading, error } = useProducts()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')

  const debouncedTerm = useDebounce(searchTerm, 300)

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)))
    return ['all', ...list]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (debouncedTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(debouncedTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )

    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate)
    }

    return result
  }, [products, debouncedTerm, selectedCategory, priceRange, sortBy])

  const maxPrice = useMemo(
    () => Math.max(1000, ...products.map((p) => p.price)),
    [products]
  )

  const onMinPriceChange = (value) =>
    setPriceRange([value, priceRange[1]])

  const onMaxPriceChange = (value) =>
    setPriceRange([priceRange[0], value])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Filters */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Filters</h2>
              <button 
                onClick={() => {
                  setSelectedCategory('all')
                  setSortBy('default')
                  setPriceRange([0, 1000])
                  onSearchChange('')
                }}
                className="text-xs font-bold text-flipkart-blue hover:underline"
              >
                CLEAR ALL
              </button>
            </div>

            {/* Category Filter */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-flipkart-blue border-gray-300 focus:ring-flipkart-blue"
                    />
                    <span className={`text-sm capitalize ${selectedCategory === category ? 'text-flipkart-blue font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {category === 'all' ? 'All Products' : category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Price</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                   <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                   <input
                    className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-flipkart-blue outline-none"
                    type="number"
                    min={0}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => onMinPriceChange(Number(e.target.value))}
                  />
                </div>
                <span className="text-gray-400">to</span>
                <div className="relative flex-1">
                   <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                   <input
                    className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-flipkart-blue outline-none"
                    type="number"
                    min={0}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Sort Filter */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-flipkart-blue outline-none bg-white"
              >
                <option value="default">Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Customer Ratings</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Results Header */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4 flex items-center justify-between">
           <div className="flex items-baseline gap-2">
              <span className="text-xs text-gray-500">Showing {filteredProducts.length} results</span>
              {searchTerm && <span className="text-xs font-semibold text-gray-800 italic">for "{searchTerm}"</span>}
           </div>
           
           <div className="hidden md:flex items-center gap-6">
              <span className="text-sm font-bold text-gray-800">Sort by:</span>
              {['default', 'low', 'high', 'rating'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`text-sm font-medium transition-colors ${sortBy === sort ? 'text-flipkart-blue border-b-2 border-flipkart-blue pb-1' : 'text-gray-500 hover:text-flipkart-blue'}`}
                >
                  {sort === 'default' ? 'Popularity' : sort === 'low' ? 'Price Low to High' : sort === 'high' ? 'Price High to Low' : 'Ratings'}
                </button>
              ))}
           </div>
        </div>

        {/* Loading States */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-100 shadow-sm animate-pulse flex flex-col h-[320px]">
                <div className="bg-gray-200 aspect-[4/5] w-full rounded-t-lg" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error States */}
        {error && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="text-red-500 mb-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Oops! Something went wrong</h2>
            <p className="text-gray-500 mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-flipkart-blue text-white px-6 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty States */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-white p-12 rounded-lg border border-gray-200 shadow-sm text-center">
            <img 
              src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png" 
              alt="No results" 
              className="mx-auto h-32 opacity-20 grayscale"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4">No products found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}

        {/* Grid Results */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
