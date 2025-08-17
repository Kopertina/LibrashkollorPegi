import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export default function SuccessModal({ isOpen, onClose, orderId }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Check className="text-green-600 h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Submitted Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've received your request and will contact you soon to arrange payment and delivery.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <strong>Order ID:</strong> <span data-testid="text-order-id">{orderId}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          data-testid="button-continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
