import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendOrderNotification } from "./services/emailService";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get books by grade
  app.get("/api/books/grade/:grade", async (req, res) => {
    try {
      const grade = parseInt(req.params.grade);
      if (isNaN(grade) || grade < 1 || grade > 9) {
        return res.status(400).json({ message: "Invalid grade. Must be between 1 and 9." });
      }
      
      const books = await storage.getBooksByGrade(grade);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books by grade" });
    }
  });

  // Get single book
  app.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBook(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedOrder = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedOrder);
      
      // Send email notification
      try {
        await sendOrderNotification(order);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the order creation if email fails
      }
      
      res.status(201).json(order);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: error.errors 
        });
      }
      console.error('Order creation failed:', error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get order
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Update book
  app.put("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to update book" });
    }
  });

  // Delete book
  app.delete("/api/books/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBook(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
