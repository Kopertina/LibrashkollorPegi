import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  grade: integer("grade").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  additionalInfo: text("additional_info"),
  orderItems: text("order_items").notNull(), // JSON string
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: text("created_at").notNull().default(sql`datetime('now')`),
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Cart item type for frontend
export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.string(),
  grade: z.number(),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
