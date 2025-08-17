import { type Book } from "@shared/schema";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const gradeColors = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-yellow-100 text-yellow-800",
  3: "bg-green-100 text-green-800",
  4: "bg-teal-100 text-teal-800",
  5: "bg-purple-100 text-purple-800",
  6: "bg-emerald-100 text-emerald-800",
  7: "bg-red-100 text-red-800",
  8: "bg-indigo-100 text-indigo-800",
  9: "bg-pink-100 text-pink-800",
};

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      grade: book.grade,
      quantity: 1,
    });
  };

  const gradeColorClass = gradeColors[book.grade as keyof typeof gradeColors] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-book-${book.id}`}>
      <img 
        src={book.imageUrl} 
        alt={book.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeColorClass}`}>
            {book.grade === 1 ? '1st Grade' : 
             book.grade === 2 ? '2nd Grade' :
             book.grade === 3 ? '3rd Grade' :
             `${book.grade}th Grade`}
          </span>
          <span className="text-lg font-bold text-gray-900" data-testid={`text-price-${book.id}`}>
            ${book.price}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`text-title-${book.id}`}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4" data-testid={`text-description-${book.id}`}>
          {book.description}
        </p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
          data-testid={`button-add-to-cart-${book.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
