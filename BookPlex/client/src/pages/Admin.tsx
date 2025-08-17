import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Book } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Plus, Trash2, Lock } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = "bookmart2024"; // You can change this password
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Book>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateBookMutation = useMutation({
    mutationFn: async (book: Book) => {
      const response = await apiRequest("PUT", `/api/books/${book.id}`, book);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      setEditingId(null);
      toast({ title: "Book updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update book", variant: "destructive" });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/books/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({ title: "Book deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete book", variant: "destructive" });
    },
  });

  const handleEdit = (book: Book) => {
    setEditingId(book.id);
    setEditForm(book);
  };

  const handleSave = () => {
    if (editForm && editingId) {
      updateBookMutation.mutate(editForm as Book);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBookMutation.mutate(id);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({ title: "Access granted!" });
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Lock className="text-blue-600 h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
              <p className="text-gray-600 mt-2">Enter password to manage books</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter admin password"
                  data-testid="input-admin-password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                data-testid="button-admin-login"
              >
                Access Admin Panel
              </button>
            </form>
            
            <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p><strong>Default password:</strong> bookmart2024</p>
              <p className="text-xs mt-1">You can change this in the Admin.tsx file</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading books...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Book Management</h1>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              data-testid="button-back-to-store"
            >
              Back to Store
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <input
                          type="url"
                          value={editForm.imageUrl || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="Image URL"
                          data-testid={`input-image-url-${book.id}`}
                        />
                      ) : (
                        <img src={book.imageUrl} alt={book.title} className="w-16 h-16 object-cover rounded" />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <input
                          type="text"
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-2 py-1 border rounded"
                          data-testid={`input-title-${book.id}`}
                        />
                      ) : (
                        <span data-testid={`text-title-${book.id}`}>{book.title}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.price || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                          className="w-full px-2 py-1 border rounded"
                          data-testid={`input-price-${book.id}`}
                        />
                      ) : (
                        <span data-testid={`text-price-${book.id}`}>${book.price}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <select
                          value={editForm.grade || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, grade: parseInt(e.target.value) }))}
                          className="w-full px-2 py-1 border rounded"
                          data-testid={`select-grade-${book.id}`}
                        >
                          {[1,2,3,4,5,6,7,8,9].map(grade => (
                            <option key={grade} value={grade}>Grade {grade}</option>
                          ))}
                        </select>
                      ) : (
                        <span data-testid={`text-grade-${book.id}`}>Grade {book.grade}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-2 py-1 border rounded text-sm"
                          rows={2}
                          data-testid={`textarea-description-${book.id}`}
                        />
                      ) : (
                        <span className="text-sm" data-testid={`text-description-${book.id}`}>{book.description}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === book.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                            data-testid={`button-save-${book.id}`}
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                            data-testid={`button-cancel-${book.id}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                            data-testid={`button-edit-${book.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            data-testid={`button-delete-${book.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to update book images:</h3>
            <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
              <li>Click the "Edit" button next to any book</li>
              <li>In the Image URL field, paste the link to your book cover image</li>
              <li>You can upload images to free services like <a href="https://imgur.com" target="_blank" className="underline">Imgur</a> or <a href="https://postimg.cc" target="_blank" className="underline">PostImg</a></li>
              <li>Copy the direct image link and paste it in the Image URL field</li>
              <li>Click Save to update the book</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}