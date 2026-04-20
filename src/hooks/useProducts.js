import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    setLoading(true)
    fetchProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError('Failed to fetch products')
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return { products, loading, error }
}