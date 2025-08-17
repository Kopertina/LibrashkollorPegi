import { Book, Mail, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Book className="mr-2 h-5 w-5" />
              BookMart
            </h3>
            <p className="text-gray-300">
              Your trusted source for educational books and learning materials for grades 1-9.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-books">All Books</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-grades">Grade Levels</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-about">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                erikselimi205@gmail.com
              </p>
              <p className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Payment via peer-to-peer arrangement
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BookMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
