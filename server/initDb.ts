import { db } from './db';
import { sql } from 'drizzle-orm';
import {
  users, poems, divanPoems, mixedPoems, highlightedVerses, quotes
} from "@shared/schema";

export async function initializeDatabase() {
  try {
    console.log('Checking if database needs initialization...');
    
    // Database already exists, so we don't need to initialize it
    console.log('Using existing database structure and data.');
    return;
    
    // NOTE: The code below is commented out as we're using an existing database
    /*
    // Check if users table is empty
    const userCount = await db.select({ count: sql`count(*)` }).from(users);
    if (Number(userCount[0].count) > 0) {
      console.log('Database already contains data, skipping initialization.');
      return;
    }
    
    console.log('Initializing database with sample data...');
    
    // Initialize sample data
    await initializeUsers();
    await initializePoems();
    await initializeDivanPoems();
    await initializeMixedPoems();
    await initializeHighlightedVerses();
    await initializeQuotes();
    
    console.log('Database initialization completed successfully.');
    */
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function initializeUsers() {
  await db.insert(users).values([
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
  ]);
  console.log('Users initialized.');
}

async function initializePoems() {
  await db.insert(poems).values([
    {
      volumeNum: 1,
      uniqueId: 101,
      poemText: 'Бишнав аз най чун ҳикоят мекунад,\nАз ҷудоиҳо шикоят мекунад.\nКаз найистон то маро бубридаанд,\nДар нафирам марду зан нолидаанд.',
      volumeNumber: '1',
      sectionTitle: 'Најнома',
      bookTitle: 'Маснавии Маънавӣ'
    },
    {
      volumeNum: 1,
      uniqueId: 102,
      poemText: 'Эй дӯст, нигоҳи ту чи нури аҷабест,\nДар чашми ту сад рози ниҳон аз тарабест.\nЛабҳои ту гӯё чу шакар аз чи сабаб?\nШояд ки сухан гуфтани ту бе сабабест.',
      volumeNumber: '1',
      sectionTitle: 'Ғазали 42',
      bookTitle: 'Девони Шамс'
    }
  ]);
  console.log('Poems initialized.');
}

async function initializeDivanPoems() {
  await db.insert(divanPoems).values([
    {
      poemId: 1001,
      createdAt: new Date(),
      sectionTitle: 'Ғазали 24',
      poemText: 'Дар зимистон нури хуршед омадӣ,\nФасли гул рӯйи чу хуршед омадӣ.\nМарҳабо, эй ҷони ҷонҳо, марҳабо,\nМарҳабо, эй ҷони ҷонафзо, даро.'
    },
    {
      poemId: 1002,
      createdAt: new Date(),
      sectionTitle: 'Ғазали 42',
      poemText: 'Эй дӯст, нигоҳи ту чи нури аҷабест,\nДар чашми ту сад рози ниҳон аз тарабест.\nЛабҳои ту гӯё чу шакар аз чи сабаб?\nШояд ки сухан гуфтани ту бе сабабест.'
    }
  ]);
  console.log('Divan poems initialized.');
}

async function initializeMixedPoems() {
  await db.insert(mixedPoems).values([
    {
      createdAt: new Date(),
      poemText: 'Эй нури ҳақиқат, ки ҷаҳон равшан аз он аст,\nМаъшуқи ҳақиқӣ, ки ҳама ҷон аз он аст.\nАз ишқи ту ҳар зарра ба раққосӣ омад,\nДар шӯру тараб ом ду ҷаҳон аз он аст.'
    },
    {
      createdAt: new Date(),
      poemText: 'Буд шоҳе дар замоне пеш аз ин,\nМулки дунё будаш ҳам мулки дин.\nИттифоқан шоҳ рӯзе шуд савор,\nБо хавосаш дар шикор ва корзор.'
    }
  ]);
  console.log('Mixed poems initialized.');
}

async function initializeHighlightedVerses() {
  await db.insert(highlightedVerses).values([
    {
      poemUniqueId: 101,
      verseText: 'Бишнав аз най чун ҳикоят мекунад,\nАз ҷудоиҳо шикоят мекунад.'
    },
    {
      poemUniqueId: 102,
      verseText: 'Эй дӯст, нигоҳи ту чи нури аҷабест,\nДар чашми ту сад рози ниҳон аз тарабест.'
    }
  ]);
  console.log('Highlighted verses initialized.');
}

async function initializeQuotes() {
  await db.insert(quotes).values([
    {
      text: '"Биё, биё, ҳар чи ҳастӣ, биё, \nГар кофиру габру бутпарастӣ, биё. \nИн даргаҳи мо даргаҳи навмедӣ нест, \nСад бор агар тавба шикастӣ, биё."'
    },
    {
      text: '"Дар дили мо ҷуз муҳаббат нест ҷо, \nЧун дили мо хонаи Мавлост то. \nБо ҳама кас меҳрубонӣ мекунем, \nДушманон яксӯ ва бегона куҷо?"'
    }
  ]);
  console.log('Quotes initialized.');
}