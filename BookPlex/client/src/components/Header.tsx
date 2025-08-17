import { ShoppingCart, Menu, Book } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface HeaderProps {
  onCartToggle: () => void;
}

export default function Header({ onCartToggle }: HeaderProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary flex items-center">
                <Book className="mr-2 h-6 w-6" />
                BookMart
              </h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="link-home">
                Home
              </a>
              <a href="/admin" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="link-admin">
                Manage Books
              </a>
              <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="link-contact">
                Contact
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartToggle}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              data-testid="button-cart-toggle"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-primary" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
