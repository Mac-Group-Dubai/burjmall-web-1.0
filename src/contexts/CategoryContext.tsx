import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
