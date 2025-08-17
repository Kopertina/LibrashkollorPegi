import { Info } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Educational Books for Every Student</h2>
          <p className="text-xl text-blue-100 mb-8">Discover quality textbooks and learning materials for grades 1-9</p>
          <div className="bg-yellow-100 text-yellow-800 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium">
            <Info className="mr-2 h-4 w-4" />
            Payment handled peer-to-peer after order confirmation
          </div>
        </div>
      </div>
    </section>
  );
}
