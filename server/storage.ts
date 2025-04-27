import { eq, like, or, and, desc, sql } from 'drizzle-orm';
import { db } from './db';
import { 
  users, poems, divanPoems, mixedPoems, highlightedVerses, quotes,
  type User, type InsertUser, 
  type Poem, type InsertPoem,
  type DivanPoem, type InsertDivanPoem,
  type MixedPoem, type InsertMixedPoem,
  type HighlightedVerse, type InsertHighlightedVerse,
  type Quote, type InsertQuote
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Poem methods
  getPoems(page?: number, limit?: number): Promise<Poem[]>;
  getPoemById(poemId: number): Promise<Poem | undefined>;
  getPoemsByVolumeNum(volumeNum: number): Promise<Poem[]>;
  createPoem(poem: InsertPoem): Promise<Poem>;
  
  // DivanPoem methods
  getDivanPoems(page?: number, limit?: number): Promise<DivanPoem[]>;
  getDivanPoemById(id: number): Promise<DivanPoem | undefined>;
  createDivanPoem(poem: InsertDivanPoem): Promise<DivanPoem>;
  
  // MixedPoem methods
  getMixedPoems(page?: number, limit?: number): Promise<MixedPoem[]>;
  getMixedPoemById(id: number): Promise<MixedPoem | undefined>;
  createMixedPoem(poem: InsertMixedPoem): Promise<MixedPoem>;
  
  // HighlightedVerse methods
  getHighlightedVerses(): Promise<HighlightedVerse[]>;
  getHighlightedVerseById(verseId: number): Promise<HighlightedVerse | undefined>;
  getRandomHighlightedVerse(): Promise<HighlightedVerse | undefined>;
  createHighlightedVerse(verse: InsertHighlightedVerse): Promise<HighlightedVerse>;
  
  // Quote methods
  getQuotes(): Promise<Quote[]>;
  getQuoteById(id: number): Promise<Quote | undefined>;
  getRandomQuote(): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  
  // Search method
  searchPoems(query: string): Promise<(Poem | DivanPoem | MixedPoem)[]>;
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Poem methods
  async getPoems(page: number = 1, limit: number = 10): Promise<Poem[]> {
    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(poems)
      .limit(limit)
      .offset(offset)
      .orderBy(poems.poemId);
  }

  async getPoemById(poemId: number): Promise<Poem | undefined> {
    const [poem] = await db
      .select()
      .from(poems)
      .where(eq(poems.poemId, poemId));
    return poem || undefined;
  }

  async getPoemsByVolumeNum(volumeNum: number): Promise<Poem[]> {
    return await db
      .select()
      .from(poems)
      .where(eq(poems.volumeNum, volumeNum))
      .orderBy(poems.poemId);
  }

  async createPoem(poem: InsertPoem): Promise<Poem> {
    // We need to wrap the object in an array because the insert method expects an array
    const [newPoem] = await db
      .insert(poems)
      .values([poem])
      .returning();
    return newPoem;
  }

  // DivanPoem methods
  async getDivanPoems(page: number = 1, limit: number = 10): Promise<DivanPoem[]> {
    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(divanPoems)
      .limit(limit)
      .offset(offset)
      .orderBy(divanPoems.id);
  }

  async getDivanPoemById(id: number): Promise<DivanPoem | undefined> {
    const [poem] = await db
      .select()
      .from(divanPoems)
      .where(eq(divanPoems.id, id));
    return poem || undefined;
  }

  async createDivanPoem(poem: InsertDivanPoem): Promise<DivanPoem> {
    const [newPoem] = await db
      .insert(divanPoems)
      .values(poem)
      .returning();
    return newPoem;
  }

  // MixedPoem methods
  async getMixedPoems(page: number = 1, limit: number = 10): Promise<MixedPoem[]> {
    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(mixedPoems)
      .limit(limit)
      .offset(offset)
      .orderBy(mixedPoems.id);
  }

  async getMixedPoemById(id: number): Promise<MixedPoem | undefined> {
    const [poem] = await db
      .select()
      .from(mixedPoems)
      .where(eq(mixedPoems.id, id));
    return poem || undefined;
  }

  async createMixedPoem(poem: InsertMixedPoem): Promise<MixedPoem> {
    const [newPoem] = await db
      .insert(mixedPoems)
      .values(poem)
      .returning();
    return newPoem;
  }

  // HighlightedVerse methods
  async getHighlightedVerses(): Promise<HighlightedVerse[]> {
    return await db
      .select()
      .from(highlightedVerses)
      .orderBy(highlightedVerses.verseId);
  }

  async getHighlightedVerseById(verseId: number): Promise<HighlightedVerse | undefined> {
    const [verse] = await db
      .select()
      .from(highlightedVerses)
      .where(eq(highlightedVerses.verseId, verseId));
    return verse || undefined;
  }

  async getRandomHighlightedVerse(): Promise<HighlightedVerse | undefined> {
    const [verse] = await db
      .select()
      .from(highlightedVerses)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return verse || undefined;
  }

  async createHighlightedVerse(verse: InsertHighlightedVerse): Promise<HighlightedVerse> {
    const [newVerse] = await db
      .insert(highlightedVerses)
      .values(verse)
      .returning();
    return newVerse;
  }

  // Quote methods
  async getQuotes(): Promise<Quote[]> {
    return await db
      .select()
      .from(quotes)
      .orderBy(quotes.id);
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    const [quote] = await db
      .select()
      .from(quotes)
      .where(eq(quotes.id, id));
    return quote || undefined;
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    const [quote] = await db
      .select()
      .from(quotes)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return quote || undefined;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db
      .insert(quotes)
      .values(quote)
      .returning();
    return newQuote;
  }

  // Search method
  async searchPoems(query: string): Promise<(Poem | DivanPoem | MixedPoem)[]> {
    // Split the query into words for better search
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    if (searchTerms.length === 0) {
      return [];
    }
    
    // Create LIKE conditions for each search term
    const poemConditions = searchTerms.map(term => 
      or(
        like(poems.poemText, `%${term}%`),
        like(poems.sectionTitle, `%${term}%`),
        like(poems.bookTitle, `%${term}%`)
      )
    );
    
    const divanConditions = searchTerms.map(term => 
      or(
        like(divanPoems.poemText, `%${term}%`),
        like(divanPoems.sectionTitle, `%${term}%`)
      )
    );
    
    const mixedConditions = searchTerms.map(term => 
      like(mixedPoems.poemText, `%${term}%`)
    );
    
    // Get matching poems
    const poemResults = await db
      .select()
      .from(poems)
      .where(and(...poemConditions))
      .limit(10);
    
    // Get matching Divan poems
    const divanResults = await db
      .select()
      .from(divanPoems)
      .where(and(...divanConditions))
      .limit(10);
    
    // Get matching Mixed poems
    const mixedResults = await db
      .select()
      .from(mixedPoems)
      .where(and(...mixedConditions))
      .limit(10);
    
    // Combine and sort results
    return [...poemResults, ...divanResults, ...mixedResults];
  }
}

export const storage = new DatabaseStorage();