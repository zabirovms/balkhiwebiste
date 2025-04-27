import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Poems schema for Divan Shams
export const divanPoems = pgTable("divan_poems", {
  id: serial("id").primaryKey(),
  ghazalNumber: integer("ghazal_number").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  baytCount: integer("bayt_count").notNull(),
  tags: text("tags").array().notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  imageUrl: text("image_url"),
  audioUrl: text("audio_url"),
  explanation: text("explanation"),
});

export const insertDivanPoemSchema = createInsertSchema(divanPoems).omit({
  id: true,
});

// Masnavi books schema
export const masnaviBooks = pgTable("masnavi_books", {
  id: serial("id").primaryKey(),
  daftarNumber: integer("daftar_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  baytCount: integer("bayt_count").notNull(),
  imageUrl: text("image_url"),
  themeColor: text("theme_color").notNull(),
});

export const insertMasnaviBookSchema = createInsertSchema(masnaviBooks).omit({
  id: true,
});

// Masnavi poems schema
export const masnaviPoems = pgTable("masnavi_poems", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  baytCount: integer("bayt_count").notNull(),
  tags: text("tags").array().notNull(),
  explanation: text("explanation"),
  imageUrl: text("image_url"),
  audioUrl: text("audio_url"),
  isFavorite: boolean("is_favorite").default(false).notNull(),
});

export const insertMasnaviPoemSchema = createInsertSchema(masnaviPoems).omit({
  id: true,
});

// Collections schema
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  poemCount: integer("poem_count").notNull(),
  imageUrl: text("image_url").notNull(),
  type: text("type").notNull(), // 'divan', 'masnavi', or 'mixed'
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
});

// Daily verses schema
export const dailyVerses = pgTable("daily_verses", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  source: text("source").notNull(),
  audioUrl: text("audio_url"),
  date: text("date").notNull(),
});

export const insertDailyVerseSchema = createInsertSchema(dailyVerses).omit({
  id: true,
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type DivanPoem = typeof divanPoems.$inferSelect;
export type InsertDivanPoem = z.infer<typeof insertDivanPoemSchema>;

export type MasnaviBook = typeof masnaviBooks.$inferSelect;
export type InsertMasnaviBook = z.infer<typeof insertMasnaviBookSchema>;

export type MasnaviPoem = typeof masnaviPoems.$inferSelect;
export type InsertMasnaviPoem = z.infer<typeof insertMasnaviPoemSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type DailyVerse = typeof dailyVerses.$inferSelect;
export type InsertDailyVerse = z.infer<typeof insertDailyVerseSchema>;
