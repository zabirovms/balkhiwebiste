import { 
  users, type User, type InsertUser,
  divanPoems, type DivanPoem, type InsertDivanPoem,
  masnaviBooks, type MasnaviBook, type InsertMasnaviBook,
  masnaviPoems, type MasnaviPoem, type InsertMasnaviPoem,
  collections, type Collection, type InsertCollection,
  dailyVerses, type DailyVerse, type InsertDailyVerse
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private divanPoems: Map<number, DivanPoem>;
  private masnaviBooks: Map<number, MasnaviBook>;
  private masnaviPoems: Map<number, MasnaviPoem>;
  private collections: Map<number, Collection>;
  private dailyVerses: Map<number, DailyVerse>;
  
  currentId: number;
  
  constructor() {
    this.users = new Map();
    this.divanPoems = new Map();
    this.masnaviBooks = new Map();
    this.masnaviPoems = new Map();
    this.collections = new Map();
    this.dailyVerses = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods (from template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // DivanPoem methods
  async getDivanPoems(page: number = 1, limit: number = 10, tag?: string): Promise<DivanPoem[]> {
    let poems = Array.from(this.divanPoems.values());
    
    if (tag) {
      poems = poems.filter(poem => poem.tags.includes(tag));
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return poems.slice(startIndex, endIndex);
  }
  
  async getDivanPoemByGhazal(ghazalNumber: number): Promise<DivanPoem | undefined> {
    return Array.from(this.divanPoems.values()).find(
      (poem) => poem.ghazalNumber === ghazalNumber
    );
  }
  
  async getFavoriteDivanPoems(): Promise<DivanPoem[]> {
    return Array.from(this.divanPoems.values()).filter(
      (poem) => poem.isFavorite
    );
  }
  
  async toggleDivanPoemFavorite(id: number): Promise<DivanPoem | undefined> {
    const poem = this.divanPoems.get(id);
    if (poem) {
      const updatedPoem = { ...poem, isFavorite: !poem.isFavorite };
      this.divanPoems.set(id, updatedPoem);
      return updatedPoem;
    }
    return undefined;
  }
  
  async createDivanPoem(poem: InsertDivanPoem): Promise<DivanPoem> {
    const id = this.currentId++;
    const newPoem: DivanPoem = { ...poem, id };
    this.divanPoems.set(id, newPoem);
    return newPoem;
  }
  
  // MasnaviBook methods
  async getMasnaviBooks(): Promise<MasnaviBook[]> {
    return Array.from(this.masnaviBooks.values());
  }
  
  async getMasnaviBookByDaftar(daftarNumber: number): Promise<MasnaviBook | undefined> {
    return Array.from(this.masnaviBooks.values()).find(
      (book) => book.daftarNumber === daftarNumber
    );
  }
  
  async createMasnaviBook(book: InsertMasnaviBook): Promise<MasnaviBook> {
    const id = this.currentId++;
    const newBook: MasnaviBook = { ...book, id };
    this.masnaviBooks.set(id, newBook);
    return newBook;
  }
  
  // MasnaviPoem methods
  async getMasnaviPoemsByBookId(bookId: number): Promise<MasnaviPoem[]> {
    return Array.from(this.masnaviPoems.values()).filter(
      (poem) => poem.bookId === bookId
    );
  }
  
  async getMasnaviPoem(id: number): Promise<MasnaviPoem | undefined> {
    return this.masnaviPoems.get(id);
  }
  
  async toggleMasnaviPoemFavorite(id: number): Promise<MasnaviPoem | undefined> {
    const poem = this.masnaviPoems.get(id);
    if (poem) {
      const updatedPoem = { ...poem, isFavorite: !poem.isFavorite };
      this.masnaviPoems.set(id, updatedPoem);
      return updatedPoem;
    }
    return undefined;
  }
  
  async createMasnaviPoem(poem: InsertMasnaviPoem): Promise<MasnaviPoem> {
    const id = this.currentId++;
    const newPoem: MasnaviPoem = { ...poem, id };
    this.masnaviPoems.set(id, newPoem);
    return newPoem;
  }
  
  // Collection methods
  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }
  
  async getCollection(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }
  
  async createCollection(collection: InsertCollection): Promise<Collection> {
    const id = this.currentId++;
    const newCollection: Collection = { ...collection, id };
    this.collections.set(id, newCollection);
    return newCollection;
  }
  
  // DailyVerse methods
  async getDailyVerse(): Promise<DailyVerse | undefined> {
    const today = new Date().toISOString().split('T')[0];
    return Array.from(this.dailyVerses.values()).find(
      (verse) => verse.date === today
    ) || this.getRandomVerse();
  }
  
  async getRandomVerse(): Promise<DailyVerse | undefined> {
    const verses = Array.from(this.dailyVerses.values());
    if (verses.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  }
  
  async createDailyVerse(verse: InsertDailyVerse): Promise<DailyVerse> {
    const id = this.currentId++;
    const newVerse: DailyVerse = { ...verse, id };
    this.dailyVerses.set(id, newVerse);
    return newVerse;
  }
  
  // Search method
  async searchPoems(query: string): Promise<(DivanPoem | MasnaviPoem)[]> {
    const lowercaseQuery = query.toLowerCase();
    
    const matchingDivanPoems = Array.from(this.divanPoems.values()).filter(
      poem => poem.title.toLowerCase().includes(lowercaseQuery) || 
              poem.content.toLowerCase().includes(lowercaseQuery)
    );
    
    const matchingMasnaviPoems = Array.from(this.masnaviPoems.values()).filter(
      poem => poem.title.toLowerCase().includes(lowercaseQuery) || 
              poem.content.toLowerCase().includes(lowercaseQuery)
    );
    
    return [...matchingDivanPoems, ...matchingMasnaviPoems];
  }
  
  // Initialize with sample data
  private initializeSampleData() {
    // Add sample Divan Poems
    this.createDivanPoem({
      ghazalNumber: 24,
      title: "Ғазали 24",
      content: "\"Биё, биё, ҳар чи ҳастӣ, биё, \nГар кофирӣ, гар бидпарастӣ, биё.\n\nДаргоҳи мо даргоҳи навмедӣ нест,\nСад бор агар тавба шикастӣ, биё.\"",
      baytCount: 18,
      tags: ["Ишқ", "Ирфон"],
      isFavorite: false,
      audioUrl: "/audio/ghazal-24.mp3",
      explanation: "Дар ин ғазал, Мавлоно ба мафҳуми раҳмат ва бахшоиш ишора мекунад. Шоир таъкид менамояд, ки инсон ҳарчанд гунаҳкор бошад ҳам, метавонад ба сӯи маърифат ва муҳаббати илоҳӣ бозгардад."
    });
    
    this.createDivanPoem({
      ghazalNumber: 50,
      title: "Ғазали 50",
      content: "\"Дар ҷаҳон ҳар кӣ паре дорад, пеши рӯи ту ояд,\nЗи ғамат ҳар кӣ ҳазин аст, ӯ сӯи ту биояд.\"",
      baytCount: 21,
      tags: ["Ҳикмат", "Табиат"],
      isFavorite: false,
      audioUrl: "/audio/ghazal-50.mp3",
      explanation: "Дар ин ғазал Мавлоно дар бораи масъалаи ҷазбаи инсон ба сӯи ҳақиқат сухан меронад."
    });
    
    this.createDivanPoem({
      ghazalNumber: 100,
      title: "Ғазали 100",
      content: "\"Нури ҳақро набувад нуру дигар,\nНест андар рухи ӯ ранги дигар.\"",
      baytCount: 14,
      tags: ["Ирфон", "Инсон"],
      isFavorite: false,
      audioUrl: "/audio/ghazal-100.mp3",
      explanation: "Дар ин ғазал Мавлоно мафҳуми нури ҳақиқат ва асолати онро баён мекунад."
    });
    
    // Add sample Masnavi Books
    this.createMasnaviBook({
      daftarNumber: 1,
      title: "Дафтари аввал",
      description: "Дар бораи ишқ, маърифат ва роҳи маънавӣ. Оғози Маснавӣ бо най ва ҳикояти он.",
      baytCount: 4003,
      imageUrl: "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      themeColor: "blue"
    });
    
    this.createMasnaviBook({
      daftarNumber: 2,
      title: "Дафтари дуюм",
      description: "Дар бораи ҳикматҳои ирфонӣ ва мавзӯъҳои ахлоқӣ. Баёни тамсилҳои фалсафӣ.",
      baytCount: 3810,
      imageUrl: "https://images.unsplash.com/photo-1625859043880-56ebc1a50ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      themeColor: "green"
    });
    
    this.createMasnaviBook({
      daftarNumber: 3,
      title: "Дафтари сеюм",
      description: "Дар бораи тафаккури ирфонӣ ва маънии ҳаёт. Ҳикоятҳои пурмаъно ва рамзӣ.",
      baytCount: 4810,
      imageUrl: "https://images.unsplash.com/photo-1551645900-62b12f87a80f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      themeColor: "amber"
    });
    
    // Add sample Masnavi Poems
    this.createMasnaviPoem({
      bookId: 1,
      title: "Ҳикояти Най",
      content: "\"Бишнав аз най чун ҳикоят мекунад,\nАз ҷудоиҳо шикоят мекунад.\"",
      baytCount: 35,
      explanation: "Оғози Маснавӣ бо ҳикояти най, ки рамзи инсони комил аст.",
      audioUrl: "/audio/ney-story.mp3",
      isFavorite: false
    });
    
    // Add sample Collections
    this.createCollection({
      title: "Ишқ ва ирфон",
      description: "Маҷмӯи ашъор дар мавзӯи ишқ ва роҳи маънавии ирфон.",
      poemCount: 45,
      imageUrl: "https://images.unsplash.com/photo-1566933293069-a55a2436a5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      type: "divan"
    });
    
    this.createCollection({
      title: "Ҳикматҳо",
      description: "Ҳикматҳои ахлоқӣ ва фалсафӣ дар ашъори Мавлоно.",
      poemCount: 32,
      imageUrl: "https://images.unsplash.com/photo-1565794462772-5cf29c8513fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      type: "masnavi"
    });
    
    this.createCollection({
      title: "Рубоиёт",
      description: "Гулчини беҳтарин рубоиёти Мавлоно аз Девони Шамс.",
      poemCount: 60,
      imageUrl: "https://images.unsplash.com/photo-1589813642001-2c5e8fd0bc0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
      type: "divan"
    });
    
    // Add sample Daily Verses
    this.createDailyVerse({
      text: "\"Биё, биё, ҳар чи ҳастӣ, биё, \nГар кофирӣ, гар бидпарастӣ, биё.\"",
      source: "Девони Шамс, Ғазали 24",
      audioUrl: "/audio/daily-verse-1.mp3",
      date: new Date().toISOString().split('T')[0]
    });
    
    this.createDailyVerse({
      text: "\"Дар ҷаҳон ҳар кӣ паре дорад, пеши рӯи ту ояд,\nЗи ғамат ҳар кӣ ҳазин аст, ӯ сӯи ту биояд.\"",
      source: "Девони Шамс, Ғазали 50",
      audioUrl: "/audio/daily-verse-2.mp3",
      date: "2023-06-01"
    });
    
    this.createDailyVerse({
      text: "\"Нури ҳақро набувад нуру дигар,\nНест андар рухи ӯ ранги дигар.\"",
      source: "Девони Шамс, Ғазали 100",
      audioUrl: "/audio/daily-verse-3.mp3",
      date: "2023-06-02"
    });
  }
}

export const storage = new MemStorage();
