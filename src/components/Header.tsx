import React, { useState } from 'react';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const { user, logout } = useAuth();

  interface MegaGroup { title: string; items: string[] }
  interface Mega { groups: MegaGroup[] }
  interface CategoryItem { name: string; icon: string; isSpecial?: boolean; mega?: Mega }

  const categories: CategoryItem[] = [
    { 
      name: 'collectibles', 
      icon: 'cube',
      mega: {
        groups: [
          {
            title: 'antiques',
            items: ['Lighter']
          }
        ]
      }
    },
    { 
      name: 'Furniture', 
      icon: 'cube',
      mega: {
        groups: [
          {
            title: 'Sofa & Seating',
            items: [
              'Chaise & Benches',
              'Armchairs',
              'Recliners',
              'Corner Sofas',
              'Sofas & Sofa Sets',
              'Ottomans, Bean Bags & Poufs',
              'Sofa Beds & Day Beds',
              'Tea Table Sets'
            ]
          },
          {
            title: 'Living Room',
            items: [
              'Room Dividers & Screens',
              'Game Room Furniture',
              'Shelves and Shelving units',
              'Shoe Racks',
              'TV & Media Units',
              'Nest of Tables',
              'Side & End Tables',
              'Coffee Tables'
            ]
          },
          {
            title: 'Bed Rooms',
            items: [
              'Wardrobes',
              'Storage Safes',
              'Benches',
              'Chest of Drawers',
              'Night Stands',
              'Dressers & Mirrors',
              'Bed Sets'
            ]
          },
          {
            title: 'Dining Room',
            items: [
              'Furniture',
              'Kitchen Islands',
              'Serving Trolleys',
              'Buffet, Hutches & Curios',
              'Chairs & Benches',
              'Dining Tables',
              'Dining Sets'
            ]
          },
          {
            title: 'Office',
            items: [
              'Bookcases, Dividers and Storage',
              'Office Chairs',
              'Office Desks'
            ]
          },
          {
            title: 'Modular',
            items: [
              'Gifts',
              'Modular Beds and wardrobes',
              'Modular Sofas'
            ]
          }
        ]
      }
    },
    { 
      name: 'Bubble Tea', 
      icon: 'cube',
      mega: {
        groups: [
          {
            title: 'Bubble Tea Products',
            items: [
              'Tea Leaves',
              'Tapioca',
              'Dessert Mix',
              'Trending',
              'Jelly',
              'Popping Boba',
              'Syrups',
              'Flavour Powder',
              'Sweetner',
              'Creamer',
              'Lids',
              'Cups',
              'Sealing Film',
              'Sealing Film',
              'Straws',
              'Plastic Bags',
              'Kitchen Tools/Utensils',
              'Sealing Machine',
              'Blenders And Jars',
              'Others'
            ]
          }
        ]
      }
    },
    { 
      name: 'Paintings', 
      icon: 'cube',
      mega: {
        groups: [
          { title: 'Paintings 50x60', items: ['Hand Made 50x60'] },
          { title: 'Paintings 60x90', items: ['Hand Made 60x90'] },
          { title: 'Paintings 90x120', items: ['Hand Made 90x20'] }
        ]
      }
    },
    { name: "Men's Fashion", icon: 'cube' },
    { name: 'TOYS', icon: 'cube' },
    { name: 'New Arrival', icon: 'new', isSpecial: true },
    { name: 'Fishing Equipment', icon: 'cube' },
    { 
      name: 'pet', 
      icon: 'cube',
      mega: {
        groups: [
          { title: 'dogs', items: ['Dogs'] },
          { title: 'cats', items: ['cats'] }
        ]
      }
    }
  ];

  return (
    <>
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Light Gray Background */}
      <div className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          {/* Left Side - Welcome Text */}
          <div className="text-gray-700 font-medium">Welcome To BurjMall</div>
          
          {/* Right Side - Navigation Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-burj-orange transition-colors flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Hello, Sign in</span>
            </a>
            
            <a href="#" className="text-gray-700 hover:text-burj-orange transition-colors flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Track Your Order</span>
            </a>
            
            <a href="#" className="text-gray-700 hover:text-burj-orange transition-colors flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
              <span>Support</span>
            </a>
            
            {/* Language Dropdown */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <select className="text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer">
                <option>English</option>
              </select>
              <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White Background */}
      <div className="bg-white py-4 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3">
            {/* Logo Icon - Shopping Bag/Building */}
            <div className="w-10 h-10 bg-burj-orange rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">BurjMall</div>
          </div>
          
          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <select className="bg-white border border-r-0 border-gray-300 px-4 py-3 rounded-l-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-burj-orange focus:border-burj-orange">
                <option>All Categories</option>
                <option>Coffee Machines</option>
                <option>LCD Screens</option>
                <option>ICE Machines</option>
                <option>Accessories</option>
              </select>
              <input 
                type="text" 
                placeholder="I'm shopping for..." 
                className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-burj-orange focus:border-burj-orange"
              />
              <button className="bg-burj-orange text-white px-6 py-3 rounded-r-md hover:bg-orange-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Side - Icons and Buttons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <button className="text-gray-700 hover:text-burj-orange transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            {/* Shopping Cart */}
            <button className="text-gray-700 hover:text-burj-orange transition-colors p-2 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
            </button>
            
            {/* Auth Buttons */}
            {user ? (
              <>
                <span className="text-gray-700">Hi, {user.name?.split(' ')[0] || 'User'}</span>
                <button onClick={logout} className="flex items-center space-x-2 text-gray-700 hover:text-burj-orange transition-colors px-4 py-2 border border-gray-300 rounded-md hover:border-burj-orange">
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setOpenLogin(true)} className="flex items-center space-x-2 text-gray-700 hover:text-burj-orange transition-colors px-4 py-2 border border-gray-300 rounded-md hover:border-burj-orange">
                  <span>Login</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Register Button */}
                <button onClick={() => setOpenSignup(true)} className="flex items-center space-x-2 bg-burj-orange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Orange Background */}
      <div className="bg-burj-orange py-3 px-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Navigation Links */}
          <div className="flex items-center space-x-8 text-white font-medium">
            {/* Categories with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <a href="#" className="hover:text-gray-200 transition-colors flex items-center space-x-2 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>CATEGORIES</span>
              </a>
              
              {/* Categories Dropdown */}
              <div 
                className={`absolute top-full left-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-200 w-56 overflow-visible transition-all duration-300 ease-in-out transform z-[60] ${
                  isCategoriesOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Categories List */}
                <div className="py-1 relative max-h-[416px] overflow-y-auto pr-1">
                  {/* Left border line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-burj-orange"></div>
                  
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer group"
                      onMouseEnter={() => setHoveredIndex(index)}
                    >
                      <div className="flex items-center space-x-2">
                        {category.isSpecial ? (
                          <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NEW</span>
                          </div>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                        <span className="text-gray-700 text-sm font-medium capitalize">{category.name}</span>
                      </div>
                      <svg className="w-3 h-3 text-gray-400 group-hover:text-burj-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Mega Panel (right side) */}
                {hoveredIndex !== null && categories[hoveredIndex]?.mega && (
                  <div 
                    className="absolute top-0 left-full ml-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 overflow-y-auto z-[70]"
                    style={{ height: '416px', width: '70vw' }}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {categories[hoveredIndex].mega.groups.map((group: MegaGroup, gi: number) => (
                        <div key={gi}>
                          <div className="text-gray-800 font-semibold mb-3">{group.title}</div>
                          <ul className="space-y-2">
                            {group.items.map((item: string, ii: number) => (
                              <li key={ii} className="text-gray-600 hover:text-burj-orange transition-colors cursor-pointer text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <a href="#" className="hover:text-gray-200 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>BRANDS</span>
            </a>
            
            <a href="#" className="hover:text-gray-200 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>VENDORS</span>
            </a>
            
            <a href="#" className="hover:text-gray-200 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>SELL ON BURJMALL</span>
            </a>
          </div>
          
          {/* Right Side - Free Shipping */}
          <div className="flex items-center space-x-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="font-medium">Free shipping</span>
          </div>
        </div>
      </div>
    </div>
    {/* Auth Modals */}
    <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} onSwitchToSignup={() => { setOpenLogin(false); setOpenSignup(true); }} />
    <SignupModal open={openSignup} onClose={() => setOpenSignup(false)} onSwitchToLogin={() => { setOpenSignup(false); setOpenLogin(true); }} />
    </>
  );
};

export default Header;
