import { db } from './db';
import {
  users, divanPoems, masnaviBooks, masnaviPoems, collections, dailyVerses
} from "@shared/schema";

export async function initializeDatabase() {
  try {
    console.log('Checking if database needs initialization...');
    
    // Check if users table is empty
    const userCount = await db.select({ count: sql`count(*)` }).from(users);
    if (Number(userCount[0].count) > 0) {
      console.log('Database already contains data, skipping initialization.');
      return;
    }
    
    console.log('Initializing database with sample data...');
    
    // Initialize sample data
    await initializeUsers();
    await initializeDivanPoems();
    await initializeMasnaviBooks();
    await initializeMasnaviPoems();
    await initializeCollections();
    await initializeDailyVerses();
    
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function initializeUsers() {
  await db.insert(users).values([
    { username: 'admin', passwordHash: 'admin123', email: 'admin@example.com', role: 'admin' },
    { username: 'user', passwordHash: 'user123', email: 'user@example.com', role: 'user' }
  ]);
  console.log('Users initialized.');
}

async function initializeDivanPoems() {
  await db.insert(divanPoems).values([
    {
      ghazalNumber: 24,
      title: 'Ғазали 24',
      content: 'Дар зимистон нури хуршед омадӣ,\nФасли гул рӯйи чу хуршед омадӣ.\nМарҳабо, эй ҷони ҷонҳо, марҳабо,\nМарҳабо, эй ҷони ҷонафзо, даро.',
      baytCount: 12,
      tags: ['Ишқ', 'Ирфон'],
      isFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1630519162138-1f79d13c887e?w=800',
      audioUrl: 'https://example.com/audio/ghazal24.mp3',
      explanation: 'Дар ин ғазал Мавлоно дар васфи ёри хеш сухан мегӯяд ва ӯро ба хуршед ташбеҳ медиҳад.'
    },
    {
      ghazalNumber: 42,
      title: 'Ғазали 42',
      content: 'Эй дӯст, нигоҳи ту чи нури аҷабест,\nДар чашми ту сад рози ниҳон аз тарабест.\nЛабҳои ту гӯё чу шакар аз чи сабаб?\nШояд ки сухан гуфтани ту бе сабабест.',
      baytCount: 8,
      tags: ['Ишқ', 'Маърифат'],
      isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1630519186880-28a6669256fe?w=800',
      audioUrl: 'https://example.com/audio/ghazal42.mp3'
    },
    {
      ghazalNumber: 76,
      title: 'Ғазали 76',
      content: 'Эй нури ҳақиқат, ки ҷаҳон равшан аз он аст,\nМаъшуқи ҳақиқӣ, ки ҳама ҷон аз он аст.\nАз ишқи ту ҳар зарра ба раққосӣ омад,\nДар шӯру тараб ом ду ҷаҳон аз он аст.',
      baytCount: 10,
      tags: ['Ишқ', 'Ҳикмат', 'Ирфон'],
      isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1590697349527-81d073040683?w=800'
    }
  ]);
  console.log('Divan poems initialized.');
}

async function initializeMasnaviBooks() {
  await db.insert(masnaviBooks).values([
    {
      daftarNumber: 1,
      title: 'Дафтари аввал',
      description: 'Дафтари аввали Маснавӣ бо ҳикояти най оғоз мешавад, ки дар он Мавлоно дарди ҷудоӣ аз асли хешро баён мекунад.',
      baytCount: 4003,
      imageUrl: 'https://images.unsplash.com/photo-1625895185147-bf4805f597cc?w=800'
    },
    {
      daftarNumber: 2,
      title: 'Дафтари дуввум',
      description: 'Дафтари дуввуми Маснавӣ бо ҳикояти подшоҳу канизак оғоз мешавад ва ба мавзӯъҳои ишқу маърифат мепардозад.',
      baytCount: 3810,
      imageUrl: 'https://images.unsplash.com/photo-1632406896548-3d619fb80bd9?w=800'
    },
    {
      daftarNumber: 3,
      title: 'Дафтари севвум',
      description: 'Дафтари севвуми Маснавӣ бо ҳикояти шоҳ ва қассоби ринд оғоз мешавад ва ба масъалаҳои ахлоқӣ ва маънавӣ таваҷҷуҳ мекунад.',
      baytCount: 4810,
      imageUrl: 'https://images.unsplash.com/photo-1608318012990-9ab72b585a12?w=800'
    }
  ]);
  console.log('Masnavi books initialized.');
}

async function initializeMasnaviPoems() {
  // Get the book IDs
  const books = await db.select().from(masnaviBooks);
  const bookIdMap = new Map(books.map(book => [book.daftarNumber, book.id]));
  
  if (books.length === 0) {
    console.log('No Masnavi books found, skipping poem initialization.');
    return;
  }
  
  await db.insert(masnaviPoems).values([
    {
      bookId: bookIdMap.get(1)!,
      title: 'Најнома',
      content: 'Бишнав аз най чун ҳикоят мекунад,\nАз ҷудоиҳо шикоят мекунад.\nКаз найистон то маро бубридаанд,\nДар нафирам марду зан нолидаанд.',
      baytCount: 18,
      tags: ['Ишқ', 'Ҷудоӣ', 'Ирфон'],
      isFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1568793264149-9ecd7a56aa71?w=800',
      audioUrl: 'https://example.com/audio/naynoma.mp3',
      explanation: 'Дар ин шеър, най рамзи инсони комил аст, ки аз асли хеш ҷудо афтодааст ва барои бозгашт ба он ҳасрат мехӯрад.'
    },
    {
      bookId: bookIdMap.get(1)!,
      title: 'Ҳикояти мардони кӯр ва фил',
      content: 'Пил андар хонаи торик буд,\nАрзааш овард аз Ҳиндустон.\nАз барои дидани ӯ мардумон,\nАндар он зулмат ҳамешуд ҳар зимон.',
      baytCount: 14,
      tags: ['Ҳикмат', 'Маърифат'],
      isFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1577452151857-ce63a5e21e6f?w=800',
      audioUrl: 'https://example.com/audio/fil.mp3'
    },
    {
      bookId: bookIdMap.get(2)!,
      title: 'Ҳикояти подшоҳ ва канизак',
      content: 'Буд шоҳе дар замоне пеш аз ин,\nМулки дунё будаш ҳам мулки дин.\nИттифоқан шоҳ рӯзе шуд савор,\nБо хавосаш дар шикор ва корзор.',
      baytCount: 22,
      tags: ['Ишқ', 'Табобат', 'Ирфон'],
      isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1544129681-3ba1eb710d8a?w=800'
    }
  ]);
  console.log('Masnavi poems initialized.');
}

async function initializeCollections() {
  await db.insert(collections).values([
    {
      title: 'Ишқ ва ирфон',
      description: 'Маҷмӯаи ашъор дар мавзӯи ишқ ва ирфон аз Мавлоно Ҷалолуддини Балхӣ',
      imageUrl: 'https://images.unsplash.com/photo-1629647587255-984a442f6ff7?w=800',
      poemIds: '[1, 3, 4]',
      type: 'mixed'
    },
    {
      title: 'Ҳикмат ва маърифат',
      description: 'Маҷмӯаи ашъори ҳикматомез аз Мавлоно Ҷалолуддини Балхӣ',
      imageUrl: 'https://images.unsplash.com/photo-1632406895715-c447149e770e?w=800',
      poemIds: '[2, 5]',
      type: 'mixed'
    }
  ]);
  console.log('Collections initialized.');
}

async function initializeDailyVerses() {
  await db.insert(dailyVerses).values([
    {
      text: '"Биё, биё, ҳар чи ҳастӣ, биё, \nГар кофиру габру бутпарастӣ, биё. \nИн даргаҳи мо даргаҳи навмедӣ нест, \nСад бор агар тавба шикастӣ, биё."',
      source: 'Девони Шамс',
      date: new Date(),
      featured: true
    },
    {
      text: '"Дар дили мо ҷуз муҳаббат нест ҷо, \nЧун дили мо хонаи Мавлост то. \nБо ҳама кас меҳрубонӣ мекунем, \nДушманон яксӯ ва бегона куҷо?"',
      source: 'Девони Шамс',
      date: new Date(Date.now() - 86400000), // Yesterday
      featured: false
    }
  ]);
  console.log('Daily verses initialized.');
}

// Add SQL helper
import { sql } from 'drizzle-orm';