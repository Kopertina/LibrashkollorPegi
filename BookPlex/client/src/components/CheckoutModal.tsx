import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/hooks/useCart";
import { X, Send, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

interface OrderData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  additionalInfo: string;
  orderItems: string;
  total: string;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    additionalInfo: "",
  });

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: OrderData) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (data) => {
      clearCart();
      setFormData({
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        additionalInfo: "",
      });
      onSuccess(data.id);
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you soon to arrange payment and delivery.",
      });
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const orderData: OrderData = {
      ...formData,
      orderItems: JSON.stringify(cart),
      total: total.toFixed(2),
    };

    createOrderMutation.mutate(orderData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
              data-testid="button-close-checkout"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} data-testid="form-checkout">
            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="customerName" 
                    name="customerName" 
                    required 
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                    data-testid="input-customer-name"
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    id="customerPhone" 
                    name="customerPhone" 
                    required 
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                    data-testid="input-customer-phone"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea 
                  id="customerAddress" 
                  name="customerAddress" 
                  required 
                  rows={3}
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your complete address"
                  data-testid="input-customer-address"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea 
                  id="additionalInfo" 
                  name="additionalInfo" 
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special instructions or additional notes..."
                  data-testid="input-additional-info"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg" data-testid="order-summary">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2" data-testid={`order-item-${item.id}`}>
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary" data-testid="text-order-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <Info className="text-yellow-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Payment Process</h4>
                  <p className="text-sm text-yellow-700">
                    After submitting your order, we'll contact you via phone to arrange peer-to-peer payment. 
                    No online payment is required at this time.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                data-testid="button-cancel-order"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={createOrderMutation.isPending}
                className={cn(
                  "flex-1 py-3 px-4 rounded-md transition-colors font-medium flex items-center justify-center",
                  createOrderMutation.isPending 
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                    : "bg-primary text-white hover:bg-blue-700"
                )}
                data-testid="button-submit-order"
              >
                {createOrderMutation.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
