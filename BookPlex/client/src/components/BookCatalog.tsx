import { useQuery } from "@tanstack/react-query";
import { type Book } from "@shared/schema";
import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BookCatalogProps {
  selectedGrade: number | null;
}

export default function BookCatalog({ selectedGrade }: BookCatalogProps) {
  const { data: books, isLoading, error } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const filteredBooks = books?.filter(book => 
    selectedGrade === null || book.grade === selectedGrade
  ) || [];

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">
          <p>Failed to load books. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Books</h2>
        <p className="text-gray-600">Quality educational materials for every learning level</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found for the selected grade level.</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting a different grade or view all books.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
