import { useCart } from "@/hooks/useCart";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
              data-testid="button-close-cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12" data-testid="empty-cart">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add some books to get started!</p>
              </div>
            ) : (
              <div className="space-y-4" data-testid="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg" data-testid={`cart-item-${item.id}`}>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900" data-testid={`text-cart-item-title-${item.id}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Grade {item.grade}
                      </p>
                      <p className="text-sm font-medium text-primary" data-testid={`text-cart-item-price-${item.id}`}>
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                        data-testid={`button-decrease-quantity-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                        data-testid={`button-increase-quantity-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        data-testid={`button-remove-item-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary" data-testid="text-cart-total">
                ${total.toFixed(2)}
              </span>
            </div>
            <button 
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-proceed-checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
