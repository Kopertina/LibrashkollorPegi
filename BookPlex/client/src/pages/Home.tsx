import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GradeFilter from "@/components/GradeFilter";
import BookCatalog from "@/components/BookCatalog";
import CartSidebar from "@/components/CartSidebar";
import CheckoutModal from "@/components/CheckoutModal";
import SuccessModal from "@/components/SuccessModal";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckoutSuccess = (newOrderId: string) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setOrderId(newOrderId);
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartToggle={() => setIsCartOpen(true)} />
      <Hero />
      <GradeFilter selectedGrade={selectedGrade} onGradeChange={setSelectedGrade} />
      <BookCatalog selectedGrade={selectedGrade} />
      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
      
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderId={orderId}
      />
    </div>
  );
}
