import React from 'react';

const PromotionalBlocks: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Block 1 - BEST TAILOR */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-64">
            {/* Golden Icon - Top Left */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center z-10">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            {/* Text Content */}
            <div className="absolute top-6 left-20 z-10">
              <div className="text-yellow-500 font-bold text-lg leading-tight">
                <div>BEST TAILOR</div>
                <div>PROFESSIONAL</div>
                <div>TAILOR</div>
                <div>SERVICE</div>
              </div>
            </div>
            
            {/* Image Placeholder - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-32 h-40 bg-gray-700 rounded-tl-lg flex items-center justify-center">
              <div className="text-center text-gray-400 text-xs">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>Tailor Image</div>
              </div>
            </div>
          </div>

          {/* Block 2 - LORENZO HOUSE CLASSIC FURNITURE */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-64">
            {/* LH Logo and Text */}
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-green-500 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-xl">LH</span>
              </div>
              <div className="text-green-500 font-bold text-sm">
                <div>LORENZO</div>
                <div>HOUSE</div>
                <div>CLASSIC FURNITURE</div>
              </div>
            </div>
            
            {/* Furniture Scene - Modern Living Room */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-600 rounded-b-lg">
              {/* Wall with Paneling */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-700"></div>
              
              {/* Framed Picture on Wall */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-white rounded border-2 border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-600 text-xs">
                  <div className="font-bold text-green-600">LH</div>
                  <div className="text-xs">LORENZO HOUSE</div>
                </div>
              </div>
              
              {/* Sofa */}
              <div className="absolute bottom-2 left-4 right-4 h-16 bg-gray-800 rounded-t-lg">
                <div className="absolute top-2 left-2 right-2 h-4 bg-white rounded"></div>
                <div className="absolute top-6 left-2 w-8 h-8 bg-white rounded"></div>
              </div>
              
              {/* Floor Lamp */}
              <div className="absolute bottom-2 left-2 w-2 h-12 bg-black rounded"></div>
              <div className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full"></div>
              
              {/* Side Table */}
              <div className="absolute bottom-2 right-4 w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute top-0 right-4 w-4 h-4 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Block 3 - LOOKING FOR PROPERTY */}
          <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-64">
            {/* Text Content - Top Left */}
            <div className="absolute top-6 left-6 z-10">
              <div className="text-white font-bold text-lg leading-tight mb-4">
                <div>LOOKING FOR</div>
                <div>PROPERTY?</div>
              </div>
              
              {/* Golden House Icon */}
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className="text-yellow-400 font-bold">GoFreehold</span>
              </div>
            </div>
            
            {/* Building Cutout - Right Side */}
            <div className="absolute bottom-0 right-0 w-32 h-40 bg-green-600 rounded-tl-lg">
              {/* Modern Apartment Building */}
              <div className="absolute bottom-0 left-2 right-2 h-32 bg-gray-300 rounded-t-lg">
                {/* Building Floors */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-400 rounded-t-lg"></div>
                <div className="absolute bottom-8 left-0 right-0 h-8 bg-gray-400 rounded-t-lg"></div>
                <div className="absolute bottom-16 left-0 right-0 h-8 bg-gray-400 rounded-t-lg"></div>
                <div className="absolute bottom-24 left-0 right-0 h-8 bg-gray-400 rounded-t-lg"></div>
                
                {/* Windows */}
                <div className="absolute bottom-2 left-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-2 right-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-10 left-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-10 right-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-18 left-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-18 right-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-26 left-2 w-3 h-4 bg-blue-200 rounded"></div>
                <div className="absolute bottom-26 right-2 w-3 h-4 bg-blue-200 rounded"></div>
              </div>
              
              {/* Landscaping */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-500 rounded-b-lg">
                <div className="absolute bottom-0 left-2 w-3 h-3 bg-green-600 rounded-full"></div>
                <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBlocks;
