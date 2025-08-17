import { type Book, type InsertBook, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Book operations
  getAllBooks(): Promise<Book[]>;
  getBooksByGrade(grade: number): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  updateBook(id: string, book: Partial<Book>): Promise<Book | undefined>;
  deleteBook(id: string): Promise<boolean>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private books: Map<string, Book>;
  private orders: Map<string, Order>;

  constructor() {
    this.books = new Map();
    this.orders = new Map();
    this.initializeBooks();
  }

  private initializeBooks() {
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "Math Adventures",
        price: "24.99",
        grade: 1,
        description: "Fun and engaging math exercises for first graders",
        imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "2",
        title: "Science Explorers",
        price: "28.99",
        grade: 3,
        description: "Discover the wonders of science through hands-on activities",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "3",
        title: "Language Arts Mastery",
        price: "32.99",
        grade: 5,
        description: "Comprehensive reading, writing, and grammar skills",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "4",
        title: "Algebra Foundations",
        price: "36.99",
        grade: 7,
        description: "Introduction to algebraic concepts and problem solving",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "5",
        title: "Reading Adventures",
        price: "22.99",
        grade: 2,
        description: "Exciting stories to improve reading comprehension",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "6",
        title: "World History",
        price: "42.99",
        grade: 9,
        description: "Comprehensive study of global civilizations and cultures",
        imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "7",
        title: "Social Studies Explorer",
        price: "29.99",
        grade: 4,
        description: "Learn about communities, geography, and citizenship",
        imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        id: "8",
        title: "Earth Science",
        price: "34.99",
        grade: 6,
        description: "Explore geology, weather, and environmental science",
        imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    sampleBooks.forEach(book => {
      this.books.set(book.id, book);
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBooksByGrade(grade: number): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.grade === grade);
  }

  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date().toISOString(),
      additionalInfo: insertOrder.additionalInfo || null,
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateBook(id: string, updateData: Partial<Book>): Promise<Book | undefined> {
    const existingBook = this.books.get(id);
    if (!existingBook) return undefined;
    
    const updatedBook = { ...existingBook, ...updateData };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: string): Promise<boolean> {
    return this.books.delete(id);
  }
}

export const storage = new MemStorage();
