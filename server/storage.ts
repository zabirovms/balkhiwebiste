import { eq, like, or, and, desc, sql } from 'drizzle-orm';
import { db } from './db';
import { 
  users, divanPoems, masnaviBooks, masnaviPoems, collections, dailyVerses,
  type User, type InsertUser, 
  type DivanPoem, type InsertDivanPoem,
  type MasnaviBook, type InsertMasnaviBook,
  type MasnaviPoem, type InsertMasnaviPoem,
  type Collection, type InsertCollection,
  type DailyVerse, type InsertDailyVerse
} from "@shared/schema";

export interface IStorage {
  // User methods (from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // DivanPoem methods
  getDivanPoems(page?: number, limit?: number, tag?: string): Promise<DivanPoem[]>;
  getDivanPoemByGhazal(ghazalNumber: number): Promise<DivanPoem | undefined>;
  getFavoriteDivanPoems(): Promise<DivanPoem[]>;
  toggleDivanPoemFavorite(id: number): Promise<DivanPoem | undefined>;
  createDivanPoem(poem: InsertDivanPoem): Promise<DivanPoem>;
  
  // MasnaviBook methods
  getMasnaviBooks(): Promise<MasnaviBook[]>;
  getMasnaviBookByDaftar(daftarNumber: number): Promise<MasnaviBook | undefined>;
  createMasnaviBook(book: InsertMasnaviBook): Promise<MasnaviBook>;
  
  // MasnaviPoem methods
  getMasnaviPoemsByBookId(bookId: number): Promise<MasnaviPoem[]>;
  getMasnaviPoem(id: number): Promise<MasnaviPoem | undefined>;
  toggleMasnaviPoemFavorite(id: number): Promise<MasnaviPoem | undefined>;
  createMasnaviPoem(poem: InsertMasnaviPoem): Promise<MasnaviPoem>;
  
  // Collection methods
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  
  // DailyVerse methods
  getDailyVerse(): Promise<DailyVerse | undefined>;
  getRandomVerse(): Promise<DailyVerse | undefined>;
  createDailyVerse(verse: InsertDailyVerse): Promise<DailyVerse>;
  
  // Search method
  searchPoems(query: string): Promise<(DivanPoem | MasnaviPoem)[]>;
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
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

  async getDivanPoems(page: number = 1, limit: number = 10, tag?: string): Promise<DivanPoem[]> {
    const offset = (page - 1) * limit;
    
    let query = db.select().from(divanPoems);
    
    if (tag) {
      // Using PostgreSQL array contains operation
      query = query.where(sql`${divanPoems.tags} @> ARRAY[${tag}]::text[]`);
    }
    
    return await query.limit(limit).offset(offset).orderBy(divanPoems.ghazalNumber);
  }

  async getDivanPoemByGhazal(ghazalNumber: number): Promise<DivanPoem | undefined> {
    const [poem] = await db
      .select()
      .from(divanPoems)
      .where(eq(divanPoems.ghazalNumber, ghazalNumber));
    return poem || undefined;
  }

  async getFavoriteDivanPoems(): Promise<DivanPoem[]> {
    return await db
      .select()
      .from(divanPoems)
      .where(eq(divanPoems.isFavorite, true))
      .orderBy(divanPoems.ghazalNumber);
  }

  async toggleDivanPoemFavorite(id: number): Promise<DivanPoem | undefined> {
    // First get the current state
    const [poem] = await db
      .select()
      .from(divanPoems)
      .where(eq(divanPoems.id, id));
    
    if (!poem) return undefined;
    
    // Toggle the favorite status
    const [updatedPoem] = await db
      .update(divanPoems)
      .set({ isFavorite: !poem.isFavorite })
      .where(eq(divanPoems.id, id))
      .returning();
    
    return updatedPoem;
  }

  async createDivanPoem(poem: InsertDivanPoem): Promise<DivanPoem> {
    const [newPoem] = await db
      .insert(divanPoems)
      .values(poem)
      .returning();
    return newPoem;
  }

  async getMasnaviBooks(): Promise<MasnaviBook[]> {
    return await db
      .select()
      .from(masnaviBooks)
      .orderBy(masnaviBooks.daftarNumber);
  }

  async getMasnaviBookByDaftar(daftarNumber: number): Promise<MasnaviBook | undefined> {
    const [book] = await db
      .select()
      .from(masnaviBooks)
      .where(eq(masnaviBooks.daftarNumber, daftarNumber));
    return book || undefined;
  }

  async createMasnaviBook(book: InsertMasnaviBook): Promise<MasnaviBook> {
    const [newBook] = await db
      .insert(masnaviBooks)
      .values(book)
      .returning();
    return newBook;
  }

  async getMasnaviPoemsByBookId(bookId: number): Promise<MasnaviPoem[]> {
    return await db
      .select()
      .from(masnaviPoems)
      .where(eq(masnaviPoems.bookId, bookId))
      .orderBy(masnaviPoems.id);
  }

  async getMasnaviPoem(id: number): Promise<MasnaviPoem | undefined> {
    const [poem] = await db
      .select()
      .from(masnaviPoems)
      .where(eq(masnaviPoems.id, id));
    return poem || undefined;
  }

  async toggleMasnaviPoemFavorite(id: number): Promise<MasnaviPoem | undefined> {
    // First get the current state
    const [poem] = await db
      .select()
      .from(masnaviPoems)
      .where(eq(masnaviPoems.id, id));
    
    if (!poem) return undefined;
    
    // Toggle the favorite status
    const [updatedPoem] = await db
      .update(masnaviPoems)
      .set({ isFavorite: !poem.isFavorite })
      .where(eq(masnaviPoems.id, id))
      .returning();
    
    return updatedPoem;
  }

  async createMasnaviPoem(poem: InsertMasnaviPoem): Promise<MasnaviPoem> {
    const [newPoem] = await db
      .insert(masnaviPoems)
      .values(poem)
      .returning();
    return newPoem;
  }

  async getCollections(): Promise<Collection[]> {
    return await db
      .select()
      .from(collections)
      .orderBy(collections.id);
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id));
    return collection || undefined;
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [newCollection] = await db
      .insert(collections)
      .values(collection)
      .returning();
    return newCollection;
  }

  async getDailyVerse(): Promise<DailyVerse | undefined> {
    // Get the most recent daily verse
    const [verse] = await db
      .select()
      .from(dailyVerses)
      .orderBy(desc(dailyVerses.date))
      .limit(1);
    
    return verse || undefined;
  }

  async getRandomVerse(): Promise<DailyVerse | undefined> {
    // Using PostgreSQL's random() function to get a random verse
    const [verse] = await db
      .select()
      .from(dailyVerses)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    
    return verse || undefined;
  }

  async createDailyVerse(verse: InsertDailyVerse): Promise<DailyVerse> {
    const [newVerse] = await db
      .insert(dailyVerses)
      .values(verse)
      .returning();
    return newVerse;
  }

  async searchPoems(query: string): Promise<(DivanPoem | MasnaviPoem)[]> {
    // Split the query into words for better search
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    if (searchTerms.length === 0) {
      return [];
    }
    
    // Create LIKE conditions for each search term
    const divanConditions = searchTerms.map(term => 
      or(
        like(divanPoems.content, `%${term}%`),
        like(divanPoems.title, `%${term}%`),
        sql`${divanPoems.tags} @> ARRAY[${term}]::text[]`
      )
    );
    
    const masnaviConditions = searchTerms.map(term => 
      or(
        like(masnaviPoems.content, `%${term}%`),
        like(masnaviPoems.title, `%${term}%`),
        sql`${masnaviPoems.tags} @> ARRAY[${term}]::text[]`
      )
    );
    
    // Get matching Divan poems
    const divanResults = await db
      .select()
      .from(divanPoems)
      .where(and(...divanConditions))
      .limit(20);
    
    // Get matching Masnavi poems
    const masnaviResults = await db
      .select()
      .from(masnaviPoems)
      .where(and(...masnaviConditions))
      .limit(20);
    
    // Combine and sort results
    return [...divanResults, ...masnaviResults].sort((a, b) => 
      // Sort by most relevant - prioritize title matches
      (b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0) - 
      (a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0)
    );
  }
}

export const storage = new DatabaseStorage();