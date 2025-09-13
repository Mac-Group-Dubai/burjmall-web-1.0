import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { useMultiProducts } from '../hooks/useMultiProducts';
import { useCategory } from '../contexts/CategoryContext';

const LazyProductGrid: React.FC = () => {
  const { products, loading, loadingMore, error, hasMore, loadMore, refetch, totalProductsFromAPIs } = useMultiProducts();
  const { activeCategory } = useCategory();
  const observerRef = useRef<HTMLDivElement>(null);

  // Filter products based on selected category
  const filteredProducts = React.useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    
    return products.filter(product => {
      const categoryName = product.category.name.toLowerCase();
      switch (activeCategory) {
        case 'lcd-screens':
          return categoryName.includes('lcd') || categoryName.includes('screen') || categoryName.includes('monitor');
        case 'ice-machines':
          return categoryName.includes('ice') || categoryName.includes('freezer') || categoryName.includes('cooler');
        case 'coffee-machines':
          return categoryName.includes('coffee') || categoryName.includes('espresso') || categoryName.includes('machine');
        case 'accessories':
          return categoryName.includes('accessory') || categoryName.includes('part') || categoryName.includes('tool');
        case 'dining-room':
          return categoryName.includes('dining') || categoryName.includes('table') || categoryName.includes('chair');
        case 'powders':
          return categoryName.includes('powder') || categoryName.includes('mix') || categoryName.includes('ingredient');
        default:
          return true;
      }
    });
  }, [products, activeCategory]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loadingMore, loadMore]);

  if (loading) {
    return (
      <div className="bg-white py-16 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burj-orange"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-16 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">Error loading products</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="bg-white py-16 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-gray-500 text-xl mb-4">
              {activeCategory === 'all' ? 'No products found' : `No products found in ${activeCategory.replace('-', ' ')}`}
            </div>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Info */}
        {activeCategory !== 'all' && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {activeCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
        )}

        
        {/* Products Grid - 5 columns on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
          {filteredProducts.map((product) => (
            <ProductCard key={`${product.id}-${product.code}`} product={product} />
          ))}
        </div>
        
        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-burj-orange"></div>
            <p className="mt-2 text-gray-600">Loading more products...</p>
          </div>
        )}
        
        {/* Intersection Observer Target */}
        <div ref={observerRef} className="h-4" />
        
        {/* End of Results */}
        {!hasMore && filteredProducts.length > 0 && (
          <div className="text-center text-gray-600 mt-4">
            <p>You've reached the end of the product list</p>
            <p className="text-sm mt-1">
              Showing {filteredProducts.length} of {totalProductsFromAPIs} total products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LazyProductGrid;
