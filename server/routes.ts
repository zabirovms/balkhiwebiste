import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertDivanPoemSchema, insertMasnaviBookSchema, insertMasnaviPoemSchema, insertCollectionSchema, insertDailyVerseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes, prefix all with /api
  const apiRouter = express.Router();
  
  // Divan poems endpoints
  apiRouter.get("/divan-poems", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const tag = req.query.tag as string | undefined;
    
    const poems = await storage.getDivanPoems(page, limit, tag);
    res.json(poems);
  });
  
  apiRouter.get("/divan-poems/ghazal/:ghazalNumber", async (req, res) => {
    const ghazalNumber = parseInt(req.params.ghazalNumber);
    const poem = await storage.getDivanPoemByGhazal(ghazalNumber);
    
    if (!poem) {
      return res.status(404).json({ message: "Ghazal not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.get("/divan-poems/favorites", async (req, res) => {
    const poems = await storage.getFavoriteDivanPoems();
    res.json(poems);
  });
  
  apiRouter.post("/divan-poems/:id/toggle-favorite", async (req, res) => {
    const id = parseInt(req.params.id);
    const poem = await storage.toggleDivanPoemFavorite(id);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.post("/divan-poems", async (req, res) => {
    try {
      const validatedData = insertDivanPoemSchema.parse(req.body);
      const poem = await storage.createDivanPoem(validatedData);
      res.status(201).json(poem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid poem data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create poem" });
    }
  });
  
  // Masnavi books endpoints
  apiRouter.get("/masnavi-books", async (req, res) => {
    const books = await storage.getMasnaviBooks();
    res.json(books);
  });
  
  apiRouter.get("/masnavi-books/daftar/:daftarNumber", async (req, res) => {
    const daftarNumber = parseInt(req.params.daftarNumber);
    const book = await storage.getMasnaviBookByDaftar(daftarNumber);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.json(book);
  });
  
  apiRouter.post("/masnavi-books", async (req, res) => {
    try {
      const validatedData = insertMasnaviBookSchema.parse(req.body);
      const book = await storage.createMasnaviBook(validatedData);
      res.status(201).json(book);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid book data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create book" });
    }
  });
  
  // Masnavi poems endpoints
  apiRouter.get("/masnavi-poems/book/:bookId", async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const poems = await storage.getMasnaviPoemsByBookId(bookId);
    res.json(poems);
  });
  
  apiRouter.get("/masnavi-poems/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const poem = await storage.getMasnaviPoem(id);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.post("/masnavi-poems/:id/toggle-favorite", async (req, res) => {
    const id = parseInt(req.params.id);
    const poem = await storage.toggleMasnaviPoemFavorite(id);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.post("/masnavi-poems", async (req, res) => {
    try {
      const validatedData = insertMasnaviPoemSchema.parse(req.body);
      const poem = await storage.createMasnaviPoem(validatedData);
      res.status(201).json(poem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid poem data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create poem" });
    }
  });
  
  // Collections endpoints
  apiRouter.get("/collections", async (req, res) => {
    const collections = await storage.getCollections();
    res.json(collections);
  });
  
  apiRouter.get("/collections/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const collection = await storage.getCollection(id);
    
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    
    res.json(collection);
  });
  
  apiRouter.post("/collections", async (req, res) => {
    try {
      const validatedData = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validatedData);
      res.status(201).json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid collection data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create collection" });
    }
  });
  
  // Daily verse endpoints
  apiRouter.get("/daily-verse", async (req, res) => {
    const verse = await storage.getDailyVerse();
    
    if (!verse) {
      return res.status(404).json({ message: "No daily verse available" });
    }
    
    res.json(verse);
  });
  
  apiRouter.get("/random-verse", async (req, res) => {
    const verse = await storage.getRandomVerse();
    
    if (!verse) {
      return res.status(404).json({ message: "No verses available" });
    }
    
    res.json(verse);
  });
  
  apiRouter.post("/daily-verses", async (req, res) => {
    try {
      const validatedData = insertDailyVerseSchema.parse(req.body);
      const verse = await storage.createDailyVerse(validatedData);
      res.status(201).json(verse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid verse data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create verse" });
    }
  });
  
  // Search endpoint
  apiRouter.get("/search", async (req, res) => {
    const query = req.query.q as string;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const results = await storage.searchPoems(query);
    res.json(results);
  });
  
  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
