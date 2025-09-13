import { useState, useEffect, useCallback } from 'react';
import type { Product, ApiResponse } from '../types/product';

interface ApiState {
  currentPage: number;
  lastPage: number;
  totalProducts: number;
  hasMore: boolean;
}

export const useMultiProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [apiStates, setApiStates] = useState<{ [key: string]: ApiState }>({});

  const API_ENDPOINTS = [
    { name: 'burjmall', url: 'https://api.burjmall.com/public/api/public/products' },
    { name: 'coffeepl', url: 'https://api.coffeepl.com/public/api/public/products' }
  ];

  const fetchFromAPI = async (endpoint: { name: string; url: string }, page: number) => {
    try {
      const response = await fetch(`${endpoint.url}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      return {
        products: data.data,
        pagination: data.pagination,
        apiName: endpoint.name
      };
    } catch (err) {
      console.warn(`Failed to fetch from ${endpoint.name}:`, err);
      return {
        products: [],
        pagination: { total: 0, per_page: 10, current_page: 1, last_page: 1, from: 0, to: 0 },
        apiName: endpoint.name
      };
    }
  };

  const fetchAllProducts = useCallback(async (append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProducts([]);
        setApiStates({});
      }
      setError(null);

      // Determine which APIs need to be fetched
      const apisToFetch = API_ENDPOINTS.map(endpoint => {
        const currentState = apiStates[endpoint.name];
        const nextPage = currentState ? currentState.currentPage + 1 : 1;
        const hasMore = currentState ? currentState.hasMore : true;
        
        return {
          endpoint,
          page: nextPage,
          shouldFetch: hasMore
        };
      }).filter(api => api.shouldFetch);

      if (apisToFetch.length === 0) {
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      // Fetch from all APIs that have more data
      const promises = apisToFetch.map(({ endpoint, page }) => 
        fetchFromAPI(endpoint, page)
      );

      const results = await Promise.all(promises);
      
      // Process results and update states
      const newProducts: Product[] = [];
      const updatedApiStates = { ...apiStates };

      results.forEach(result => {
        if (result.products.length > 0) {
          newProducts.push(...result.products);
          
          updatedApiStates[result.apiName] = {
            currentPage: result.pagination.current_page,
            lastPage: result.pagination.last_page,
            totalProducts: result.pagination.total,
            hasMore: result.pagination.current_page < result.pagination.last_page
          };
        }
      });

      // Update products
      if (append) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      setApiStates(updatedApiStates);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [apiStates]);

  const loadMore = useCallback(() => {
    const hasAnyMore = Object.values(apiStates).some(state => state.hasMore);
    if (!loadingMore && hasAnyMore) {
      fetchAllProducts(true);
    }
  }, [apiStates, loadingMore, fetchAllProducts]);

  const refetch = useCallback(() => {
    setApiStates({});
    fetchAllProducts(false);
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchAllProducts(false);
  }, []);

  // Calculate total products from all APIs
  const totalProductsFromAPIs = Object.values(apiStates).reduce((sum, state) => sum + state.totalProducts, 0);
  const hasMore = Object.values(apiStates).some(state => state.hasMore);

  return {
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
    totalProducts: products.length,
    totalProductsFromAPIs
  };
};
