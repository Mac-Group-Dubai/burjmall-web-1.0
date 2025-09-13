import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get the primary image or fallback to the main image
  const primaryImage = product.images.find(img => img.is_primary)?.image_url || product.image_url;
  
  // Format price to AED
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return `AED ${numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-200 group">
      {/* Product Image Container */}
      <div className="relative h-[200px] bg-white overflow-hidden">
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div className={`w-full h-full flex items-center justify-center ${primaryImage ? 'hidden' : ''}`}>
          <div className="text-center text-gray-500">
            <svg className="w-20 h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-sm">No Image</div>
          </div>
        </div>
        
        {/* Discount Badge - You can add logic here based on your business rules */}
        {/* <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -20%
        </div> */}
      </div>
      
      {/* Product Info */}
      <div className="px-4 py-3">
        {/* Product Name */}
        <h3 className="text-gray-800 mb-1 line-clamp-2 min-h-[2.75rem] font-semibold text-base">
          {product.name}
        </h3>
        
        {/* Pricing & Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-red-600 text-xl font-bold">{formatPrice(product.price)}</div>
            <div className="text-xs text-gray-500 mt-1">{product.category.name}</div>
          </div>
          <button className="bg-burj-orange text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
