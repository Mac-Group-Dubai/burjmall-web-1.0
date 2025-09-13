import Header from './components/Header';
import Hero from './components/Hero';
import PromotionalBlocks from './components/PromotionalBlocks';
import CategoryNav from './components/CategoryNav';
import LazyProductGrid from './components/LazyProductGrid';
import Footer from './components/Footer';
import { CategoryProvider } from './contexts/CategoryContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CategoryProvider>
          <div className="min-h-screen bg-gray-100" style={{ backgroundColor: '#F5F5F5' }}>
            <Header />
            <Hero />
            <PromotionalBlocks />
            <CategoryNav />
            <LazyProductGrid />
            <Footer />
          </div>
        </CategoryProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
