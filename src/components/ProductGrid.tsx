import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategory } from '../contexts/CategoryContext';

const ProductGrid: React.FC = () => {
  const { products, loading, error, pagination, fetchProducts } = useProducts();
  const { activeCategory } = useCategory();

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
        default:
          return true;
      }
    });
  }, [products, activeCategory]);

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
              onClick={() => fetchProducts(1)}
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => fetchProducts(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            
            <button
              onClick={() => fetchProducts(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
        
        {/* Results Info */}
        {pagination && (
          <div className="text-center text-gray-600 mt-4">
            Showing {filteredProducts.length} of {pagination.total} products
            {activeCategory !== 'all' && ` in ${activeCategory.replace('-', ' ')}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
