import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPoemSchema, insertDivanPoemSchema, insertMixedPoemSchema, insertHighlightedVerseSchema, insertQuoteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes, prefix all with /api
  const apiRouter = express.Router();
  
  // Poems endpoints
  apiRouter.get("/poems", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const poems = await storage.getPoems(page, limit);
    res.json(poems);
  });
  
  apiRouter.get("/poems/:poemId", async (req, res) => {
    const poemId = parseInt(req.params.poemId);
    const poem = await storage.getPoemById(poemId);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.get("/poems/volume/:volumeNum", async (req, res) => {
    const volumeNum = parseInt(req.params.volumeNum);
    const poems = await storage.getPoemsByVolumeNum(volumeNum);
    res.json(poems);
  });
  
  apiRouter.post("/poems", async (req, res) => {
    try {
      const validatedData = insertPoemSchema.parse(req.body);
      const poem = await storage.createPoem(validatedData);
      res.status(201).json(poem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid poem data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create poem" });
    }
  });
  
  // Divan poems endpoints
  apiRouter.get("/divan-poems", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const poems = await storage.getDivanPoems(page, limit);
    res.json(poems);
  });
  
  apiRouter.get("/divan-poems/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const poem = await storage.getDivanPoemById(id);
    
    if (!poem) {
      return res.status(404).json({ message: "Divan poem not found" });
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
  
  // Mixed poems endpoints
  apiRouter.get("/mixed-poems", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const poems = await storage.getMixedPoems(page, limit);
    res.json(poems);
  });
  
  apiRouter.get("/mixed-poems/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const poem = await storage.getMixedPoemById(id);
    
    if (!poem) {
      return res.status(404).json({ message: "Mixed poem not found" });
    }
    
    res.json(poem);
  });
  
  apiRouter.post("/mixed-poems", async (req, res) => {
    try {
      const validatedData = insertMixedPoemSchema.parse(req.body);
      const poem = await storage.createMixedPoem(validatedData);
      res.status(201).json(poem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid poem data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create poem" });
    }
  });
  
  // Highlighted verses endpoints
  apiRouter.get("/highlighted-verses", async (req, res) => {
    const verses = await storage.getHighlightedVerses();
    res.json(verses);
  });
  
  apiRouter.get("/highlighted-verses/:verseId", async (req, res) => {
    const verseId = parseInt(req.params.verseId);
    const verse = await storage.getHighlightedVerseById(verseId);
    
    if (!verse) {
      return res.status(404).json({ message: "Highlighted verse not found" });
    }
    
    res.json(verse);
  });
  
  apiRouter.get("/highlighted-verses/random", async (req, res) => {
    const verse = await storage.getRandomHighlightedVerse();
    
    if (!verse) {
      return res.status(404).json({ message: "No highlighted verses available" });
    }
    
    res.json(verse);
  });
  
  apiRouter.post("/highlighted-verses", async (req, res) => {
    try {
      const validatedData = insertHighlightedVerseSchema.parse(req.body);
      const verse = await storage.createHighlightedVerse(validatedData);
      res.status(201).json(verse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid verse data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create verse" });
    }
  });
  
  // Quotes endpoints
  apiRouter.get("/quotes", async (req, res) => {
    const quotes = await storage.getQuotes();
    res.json(quotes);
  });
  
  apiRouter.get("/quotes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const quote = await storage.getQuoteById(id);
    
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    
    res.json(quote);
  });
  
  apiRouter.get("/quotes/random", async (req, res) => {
    const quote = await storage.getRandomQuote();
    
    if (!quote) {
      return res.status(404).json({ message: "No quotes available" });
    }
    
    res.json(quote);
  });
  
  apiRouter.post("/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quote data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create quote" });
    }
  });
  
  // Daily verse (using highlighted verses)
  apiRouter.get("/daily-verse", async (req, res) => {
    const verse = await storage.getRandomHighlightedVerse();
    
    if (!verse) {
      return res.status(404).json({ message: "No daily verse available" });
    }
    
    // Convert to the format expected by the frontend
    const dailyVerse = {
      text: verse.verseText,
      source: "Маснавии Маънавӣ", // Default source
      date: new Date().toISOString().split('T')[0],
      audioUrl: null // No audio in the original database
    };
    
    res.json(dailyVerse);
  });
  
  apiRouter.get("/random-verse", async (req, res) => {
    const verse = await storage.getRandomHighlightedVerse();
    
    if (!verse) {
      return res.status(404).json({ message: "No verses available" });
    }
    
    // Convert to the format expected by the frontend
    const dailyVerse = {
      text: verse.verseText,
      source: "Маснавии Маънавӣ", // Default source
      date: new Date().toISOString().split('T')[0],
      audioUrl: null // No audio in the original database
    };
    
    res.json(dailyVerse);
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
