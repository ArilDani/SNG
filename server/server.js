import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import { connectToMongoDB, disconnectFromMongoDB, client } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to match documents in MongoDB Atlas by string ID or ObjectId
function buildIdQuery(id) {
  const strId = String(id);
  const or = [{ id: strId }, { _id: strId }];
  if (ObjectId.isValid(strId) && strId.length === 24) {
    try {
      or.push({ _id: new ObjectId(strId) });
    } catch (e) {}
  }
  return { $or: or };
}

const DB_NAME = 'sng_agency';
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

// Default initial data for seeding & fallback
const defaultServices = [
  {
    id: 'SNG-01',
    name: 'Social Media Management',
    category: 'content',
    icon: '◎',
    desc: 'Pengelolaan media sosial, kalender konten, optimasi profil, dan strategi komunikasi untuk membangun kehadiran brand.',
    deliverables: 'Audit akun, content calendar, pengelolaan konten, evaluasi performa.',
    label: 'Social & Content',
    order: 1
  },
  {
    id: 'SNG-02',
    name: 'Content Creation & Campaign',
    category: 'content',
    icon: '✳',
    desc: 'Perencanaan dan pengembangan konten serta kampanye yang relevan dengan tren, identitas brand, dan karakter audiens.',
    deliverables: 'Content pillars, brief kreatif, rencana kampanye, evaluasi engagement.',
    label: 'Social & Content',
    order: 2
  },
  {
    id: 'SNG-03',
    name: 'Data & Social Media Analytics',
    category: 'strategy',
    icon: '⌕',
    desc: 'Analisis performa konten, audiens, dan kanal digital untuk menghasilkan insight sebagai dasar pengambilan keputusan.',
    deliverables: 'Audit data, analisis performa, insight audiens, rekomendasi optimasi.',
    label: 'Strategy & Data',
    order: 3
  },
  {
    id: 'SNG-04',
    name: 'SEO & Digital Optimization',
    category: 'digital',
    icon: '↗',
    desc: 'Optimasi mesin pencari dan kanal digital agar bisnis lebih mudah ditemukan serta memiliki kehadiran digital yang lebih kuat.',
    deliverables: 'Audit SEO, riset kata kunci, rekomendasi optimasi, evaluasi.',
    label: 'Digital Channel',
    order: 4
  },
  {
    id: 'SNG-05',
    name: 'Website & Digital Presence',
    category: 'digital',
    icon: '▣',
    desc: 'Pembuatan website, landing page, atau Blogger sebagai pusat informasi, representasi brand, dan titik konversi.',
    deliverables: 'Perencanaan halaman, desain UI, implementasi website, panduan pengelolaan.',
    label: 'Digital Channel',
    order: 5
  },
  {
    id: 'SNG-06',
    name: 'E-commerce Optimization',
    category: 'digital',
    icon: '⌘',
    desc: 'Penguatan katalog, pengalaman kanal penjualan, dan integrasi perjalanan pelanggan dari promosi hingga transaksi.',
    deliverables: 'Evaluasi toko digital, struktur katalog, rekomendasi optimasi, alur pelanggan.',
    label: 'Digital Channel',
    order: 6
  },
  {
    id: 'SNG-07',
    name: 'CRM & Customer Engagement',
    category: 'integration',
    icon: '◉',
    desc: 'Pengembangan pendekatan pengelolaan relasi dan interaksi pelanggan melalui kanal komunikasi digital yang relevan.',
    deliverables: 'Pemetaan customer journey, segmentasi, alur komunikasi, rekomendasi retensi.',
    label: 'Integration',
    order: 7
  },
  {
    id: 'SNG-08',
    name: 'Integrated Digital Marketing',
    category: 'integration',
    icon: '⌬',
    desc: 'Integrasi media sosial, website, e-commerce, WhatsApp, data, dan aktivitas pemasaran ke dalam satu ekosistem.',
    deliverables: 'Pemetaan kanal, strategi integrasi, rencana implementasi, metrik evaluasi.',
    label: 'Integration',
    order: 8
  }
];

const defaultArticles = [
  {
    id: 'A01',
    category: 'DIGITAL STRATEGY',
    date: 'INSIGHT / 01',
    title: 'Digital marketing bukan sekadar hadir di semua platform',
    excerpt: 'Mengapa konsistensi strategi dan keterhubungan kanal lebih penting daripada sekadar memperbanyak platform.',
    read: '4 MIN READ',
    body: [
      'Banyak bisnis merasa perlu hadir di setiap platform digital. Namun, kehadiran tanpa arah sering membuat energi dan anggaran pemasaran tersebar tanpa hasil yang mudah dievaluasi.',
      'Strategi digital yang baik dimulai dari tujuan bisnis dan karakter audiens. Pilih kanal yang benar-benar digunakan pelanggan, susun pesan yang konsisten, lalu hubungkan perjalanan pelanggan dari tahap mengenal brand hingga transaksi.',
      'Bagi UMKM, langkah awal yang realistis adalah memetakan kanal utama, menetapkan indikator sederhana, dan melakukan evaluasi rutin. Pertumbuhan tidak harus dimulai dengan banyak platform—yang penting setiap kanal memiliki peran yang jelas.'
    ],
    order: 1
  },
  {
    id: 'A02',
    category: 'DATA & ANALYTICS',
    date: 'INSIGHT / 02',
    title: 'Mengubah data media sosial menjadi keputusan bisnis',
    excerpt: 'Mengenali metrik yang relevan dan membaca performa konten sebagai bahan evaluasi strategi.',
    read: '5 MIN READ',
    body: [
      'Data media sosial dapat membantu bisnis memahami konten yang menarik perhatian, karakter audiens, dan pola interaksi. Namun, angka baru menjadi insight ketika dibaca dalam konteks tujuan bisnis.',
      'Jangkauan dapat menunjukkan seberapa luas konten ditemukan. Engagement membantu membaca respons audiens. Klik, pesan, atau tindakan lanjutan memberi petunjuk tentang minat terhadap produk dan layanan. Setiap metrik perlu dipilih sesuai tujuan kampanye.',
      'Buat evaluasi sederhana secara berkala: apa yang berjalan baik, apa yang perlu diperbaiki, dan eksperimen apa yang akan dilakukan berikutnya. Pendekatan ini membantu keputusan pemasaran menjadi lebih terarah.'
    ],
    order: 2
  },
  {
    id: 'A03',
    category: 'UMKM GROWTH',
    date: 'INSIGHT / 03',
    title: 'Membangun ekosistem digital yang saling terhubung',
    excerpt: 'Website, WhatsApp, e-commerce, dan media sosial sebaiknya menjadi bagian dari satu customer journey.',
    read: '3 MIN READ',
    body: [
      'Calon pelanggan dapat mengenal bisnis melalui media sosial, mencari informasi di website, bertanya melalui WhatsApp, lalu menyelesaikan transaksi melalui katalog atau marketplace. Setiap kanal memiliki peran dalam perjalanan tersebut.',
      'Ketika informasi, identitas brand, dan pesan tidak konsisten, pelanggan dapat mengalami kebingungan. Integrasi digital membantu bisnis menghadirkan pengalaman yang lebih jelas dan mudah diakses.',
      'Mulailah dengan memastikan informasi produk, kontak, katalog, dan pesan utama konsisten. Setelah itu, evaluasi titik perjalanan pelanggan yang paling sering terhenti dan tentukan perbaikan yang paling berdampak.'
    ],
    order: 3
  }
];

const defaultSettings = {
  heroKicker: 'A NEW POINT OF GROWTH — SNG / 001',
  heroTitleLine1: 'The Singularity',
  heroTitleLine2: 'of Growth.',
  heroQuestion: 'Saat dunia digital terus berubah, mungkin yang dibutuhkan bisnis Anda bukan sekadar lebih banyak konten—tetapi arah yang lebih tepat.',
  location: 'Makassar · Indonesia',
  email: 'halo@sngagency.id',
  phone: '+62 812 3456 7890',
  brandTagline: 'STRATEGY. NEXUS. GROWTH.',
  aboutVision: 'Menjadi agensi digital berbasis data yang inovatif dan adaptif dalam membantu UMKM mengembangkan bisnis melalui pemasaran digital yang terintegrasi, terukur, dan sesuai dengan kebutuhan mitra.',
  isTeamSectionActive: true
};

const defaultTeam = [
  {
    id: 'TEAM-01',
    name: 'Aril Dani',
    role: 'Founder & Head of Strategy',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    skills: ['Strategy & Direction', 'Growth Marketing', 'Data Integration', 'Brand Architecture'],
    bio: 'Merumuskan arsitektur strategi pertumbuhan digital berbasis integrasi kanal dan efisiensi konversi untuk UMKM & Brand.',
    portfolio: 'Arsitek 100+ roadmap digital & skala bisnis',
    order: 1
  },
  {
    id: 'TEAM-02',
    name: 'Sarah Wijaya',
    role: 'Lead Creative & Content Architect',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    skills: ['Creative Direction', 'Copywriting & Narrative', 'Social Media Strategy', 'Campaign Production'],
    bio: 'Menerjemahkan identitas brand ke dalam narasi visual, pilar konten terstruktur, dan kampanye media sosial berkekuatan tinggi.',
    portfolio: 'Kampanye visual viral & pilar narasi brand',
    order: 2
  },
  {
    id: 'TEAM-03',
    name: 'Budi Pratama',
    role: 'Data Analyst & Performance SEO Specialist',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    skills: ['Technical SEO', 'Google Analytics 4', 'Audience Segmentation', 'Funnel Optimization'],
    bio: 'Mengolah data analitik, pola perilaku audiens, dan audit algoritma search engine menjadi peta keputusan yang terukur.',
    portfolio: 'Optimasi peringkat 1 Google & analitik funnel',
    order: 3
  },
  {
    id: 'TEAM-04',
    name: 'Nadia Kirana',
    role: 'Web & Omnichannel Ecosystem Engineer',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    skills: ['UI/UX Engineering', 'Web Development', 'E-commerce & CRM', 'WhatsApp Automation'],
    bio: 'Membangun website modern responsif, katalog e-commerce, dan integrasi titik sentuh digital yang saling terhubung erat.',
    portfolio: 'Platform website modern & alur CRM interaktif',
    order: 4
  }
];

// Default users for authentication & role management
const defaultUsers = [
  {
    id: 'USR-ADMIN-01',
    name: 'M. Aril Ardani',
    email: 'arildani60@gmail.com',
    password: '@GitGut#11',
    role: 'admin',
    phone: '+62 812 3456 7890',
    createdAt: new Date().toISOString()
  },
  {
    id: 'USR-ADMIN-02',
    name: 'Admin SNG',
    email: 'admin@sngagency.id',
    password: 'admin123',
    role: 'admin',
    phone: '+62 812 0000 0001',
    createdAt: new Date().toISOString()
  },
  {
    id: 'USR-CLIENT-01',
    name: 'Budi Santoso',
    email: 'budi@tokoberkah.com',
    password: 'user123',
    role: 'user',
    phone: '+62 813 9999 8888',
    createdAt: new Date().toISOString()
  }
];

// In-memory data store
let memoryServices = [...defaultServices];
let memoryArticles = [...defaultArticles];
let memorySettings = { ...defaultSettings };
let memoryOrders = [];
let memoryMessages = [];
let memoryTeam = [...defaultTeam];
let memoryUsers = [...defaultUsers];

let db = null;

// Persistent file-based storage engine
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadDatabaseFromFile() {
  ensureDataDir();
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (data) {
        if (Array.isArray(data.services) && data.services.length > 0) memoryServices = data.services;
        if (Array.isArray(data.articles) && data.articles.length > 0) memoryArticles = data.articles;
        if (data.settings) memorySettings = { ...defaultSettings, ...data.settings };
        if (Array.isArray(data.orders)) memoryOrders = data.orders;
        if (Array.isArray(data.messages)) memoryMessages = data.messages;
        if (Array.isArray(data.team) && data.team.length > 0) memoryTeam = data.team;
        if (Array.isArray(data.users) && data.users.length > 0) {
          memoryUsers = data.users;
          // Ensure arildani60@gmail.com is present with admin role
          if (!memoryUsers.some(u => u.email.toLowerCase() === 'arildani60@gmail.com')) {
            memoryUsers.unshift(defaultUsers[0]);
          }
        }
        console.log('Loaded persistent database from server/data/database.json');
        return true;
      }
    } catch (e) {
      console.warn('Failed to parse database.json, re-saving default data:', e.message);
    }
  }
  saveDatabaseToFile();
  return false;
}

function saveDatabaseToFile() {
  try {
    ensureDataDir();
    const data = {
      services: memoryServices,
      articles: memoryArticles,
      settings: memorySettings,
      orders: memoryOrders,
      messages: memoryMessages,
      team: memoryTeam,
      users: memoryUsers,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database.json:', err.message);
  }
}

// Initial load from file
loadDatabaseFromFile();

async function initDatabase() {
  try {
    await connectToMongoDB();
    db = client.db(DB_NAME);

    // Sync / seed services
    const servicesCol = db.collection('services');
    const serviceCount = await servicesCol.countDocuments();
    if (serviceCount === 0) {
      console.log('Seeding initial services to MongoDB...');
      await servicesCol.insertMany(memoryServices);
    } else {
      memoryServices = await servicesCol.find({}).sort({ order: 1, _id: 1 }).toArray();
    }

    // Sync / seed articles
    const articlesCol = db.collection('articles');
    const articleCount = await articlesCol.countDocuments();
    if (articleCount === 0) {
      console.log('Seeding initial articles to MongoDB...');
      await articlesCol.insertMany(memoryArticles);
    } else {
      memoryArticles = await articlesCol.find({}).sort({ order: 1, _id: 1 }).toArray();
    }

    // Sync / seed settings
    const settingsCol = db.collection('settings');
    const settingsDoc = await settingsCol.findOne({ key: 'main_settings' });
    if (!settingsDoc) {
      console.log('Seeding initial site settings to MongoDB...');
      await settingsCol.insertOne({ key: 'main_settings', ...memorySettings });
    } else {
      memorySettings = { ...defaultSettings, ...settingsDoc };
    }

    // Sync / seed team
    const teamCol = db.collection('team');
    const teamCount = await teamCol.countDocuments();
    if (teamCount === 0) {
      console.log('Seeding initial team to MongoDB...');
      await teamCol.insertMany(memoryTeam);
    } else {
      memoryTeam = await teamCol.find({}).sort({ order: 1, _id: 1 }).toArray();
    }

    // Sync / seed users & ensure Admin account is stored in MongoDB Atlas
    const usersCol = db.collection('users');
    // Upsert the requested admin account: arildani60@gmail.com / @GitGut#11
    await usersCol.updateOne(
      { email: 'arildani60@gmail.com' },
      {
        $set: {
          id: 'USR-ADMIN-01',
          name: 'M. Aril Ardani',
          email: 'arildani60@gmail.com',
          password: '@GitGut#11',
          role: 'admin',
          phone: '+62 812 3456 7890',
          updatedAt: new Date().toISOString()
        },
        $setOnInsert: {
          createdAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    console.log('Admin account arildani60@gmail.com ensured in MongoDB Atlas (role: admin).');

    // Seed remaining default users if needed
    for (const defU of defaultUsers) {
      const exists = await usersCol.findOne({ email: defU.email });
      if (!exists) {
        await usersCol.insertOne(defU);
      }
    }

    memoryUsers = await usersCol.find({}).sort({ createdAt: -1 }).toArray();

    // Save synced data to file
    saveDatabaseToFile();
    console.log('MongoDB initialization & syncing completed successfully.');
  } catch (err) {
    console.warn('MongoDB Atlas not reached / running with persistent local database engine:', err.message);
  }
}

// Auto-retry connecting to MongoDB Atlas every 8 seconds
setInterval(async () => {
  if (!db) {
    try {
      const c = await connectToMongoDB();
      if (c) {
        db = c.db(DB_NAME);
        await initDatabase();
      }
    } catch (e) {}
  }
}, 8000);

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health check & Database Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: !!db ? 'mongodb_atlas' : 'connecting_to_atlas',
    isAtlas: !!db,
    cluster: 'cluster0.ol7ptsz.mongodb.net',
    user: 'arildani60_db_user',
    servicesCount: memoryServices.length,
    articlesCount: memoryArticles.length,
    teamCount: memoryTeam.length,
    usersCount: memoryUsers.length,
    time: new Date()
  });
});

// 1. SERVICES CRUD
app.get('/api/services', async (req, res) => {
  try {
    if (db) {
      const list = await db.collection('services').find({}).sort({ order: 1, _id: 1 }).toArray();
      if (list && list.length > 0) {
        memoryServices = list;
        saveDatabaseToFile();
      }
    }
    res.json(memoryServices);
  } catch (error) {
    res.json(memoryServices);
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const { name, category, icon, desc, deliverables, label } = req.body;
    if (!name || !desc) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }

    const newService = {
      id: 'SNG-' + Date.now().toString().slice(-5),
      name: name.trim(),
      category: category || 'strategy',
      icon: icon || '✧',
      desc: desc.trim(),
      deliverables: deliverables ? deliverables.trim() : '',
      label: label ? label.trim() : category,
      order: memoryServices.length + 1,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('services').insertOne(newService);
      } catch (err) {
        console.warn('Mongo insert service error:', err.message);
      }
    }
    memoryServices.push(newService);
    saveDatabaseToFile();

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;

    if (db) {
      try {
        await db.collection('services').updateOne(buildIdQuery(id), { $set: updateData });
      } catch (err) {
        console.warn('Mongo update service error:', err.message);
      }
    }

    const idx = memoryServices.findIndex(s => s.id === id || String(s._id) === id);
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updateData };
    }
    saveDatabaseToFile();

    res.json({ success: true, updated: updateData, service: idx !== -1 ? memoryServices[idx] : updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('services').deleteOne(buildIdQuery(id));
      } catch (err) {
        console.warn('Mongo delete service error:', err.message);
      }
    }
    memoryServices = memoryServices.filter(s => s.id !== id && String(s._id) !== id);
    saveDatabaseToFile();

    res.json({ success: true, message: `Service ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. ORDERS CRUD
app.get('/api/orders', async (req, res) => {
  try {
    const email = req.query.email;
    let result = memoryOrders;
    if (email) {
      result = result.filter(o => o.userEmail?.toLowerCase() === email.toLowerCase());
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { serviceId, serviceName, userName, userEmail, userPhone, businessName, brief } = req.body;
    if (!serviceName || !userName || !userEmail) {
      return res.status(400).json({ error: 'Service name, your name, and email are required.' });
    }

    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      serviceId,
      serviceName,
      userName,
      userEmail,
      userPhone: userPhone || '',
      businessName: businessName || '',
      brief: brief || '',
      status: 'Menunggu Ditinjau',
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('orders').insertOne(newOrder);
      } catch (err) {
        console.warn('Mongo order insert error:', err.message);
      }
    }
    memoryOrders.unshift(newOrder);
    saveDatabaseToFile();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, adminNote } = req.body;

    const idx = memoryOrders.findIndex(o => o.id === id || String(o._id) === id);
    if (idx !== -1) {
      if (status) memoryOrders[idx].status = status;
      if (notes !== undefined) memoryOrders[idx].notes = notes;
      if (adminNote !== undefined) memoryOrders[idx].adminNote = adminNote;
      memoryOrders[idx].updatedAt = new Date().toISOString();

      if (db) {
        try {
          await db.collection('orders').updateOne(
            buildIdQuery(id),
            { $set: {
                status: memoryOrders[idx].status,
                notes: memoryOrders[idx].notes || '',
                adminNote: memoryOrders[idx].adminNote || '',
                updatedAt: memoryOrders[idx].updatedAt
              }
            }
          );
        } catch (err) {
          console.warn('Mongo order update error:', err.message);
        }
      }
      saveDatabaseToFile();
      return res.json({ success: true, order: memoryOrders[idx] });
    }
    res.status(404).json({ error: 'Order not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      try {
        await db.collection('orders').deleteOne(buildIdQuery(id));
      } catch (err) {}
    }
    memoryOrders = memoryOrders.filter(o => o.id !== id && String(o._id) !== id);
    saveDatabaseToFile();
    res.json({ success: true, message: `Order ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. MESSAGES (CONTACT FORM)
app.get('/api/messages', (req, res) => {
  res.json(memoryMessages);
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMsg = {
      id: 'MSG-' + Date.now().toString().slice(-6),
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : 'Pertanyaan Umum',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('messages').insertOne(newMsg);
      } catch (err) {}
    }
    memoryMessages.unshift(newMsg);
    saveDatabaseToFile();

    res.status(201).json({ success: true, message: newMsg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      try {
        await db.collection('messages').deleteOne({ id });
      } catch (err) {}
    }
    memoryMessages = memoryMessages.filter(m => m.id !== id);
    saveDatabaseToFile();
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ARTICLES CRUD
app.get('/api/articles', async (req, res) => {
  try {
    if (db) {
      const list = await db.collection('articles').find({}).sort({ order: 1, _id: 1 }).toArray();
      if (list && list.length > 0) {
        memoryArticles = list;
        saveDatabaseToFile();
      }
    }
    res.json(memoryArticles);
  } catch (error) {
    res.json(memoryArticles);
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const { category, title, excerpt, read, body, coverImage } = req.body;
    if (!title || !excerpt) {
      return res.status(400).json({ error: 'Title and excerpt are required.' });
    }

    const newArticle = {
      id: 'A-' + Date.now().toString().slice(-5),
      category: category || 'INSIGHT',
      date: 'INSIGHT / ' + (memoryArticles.length + 1).toString().padStart(2, '0'),
      title: title.trim(),
      excerpt: excerpt.trim(),
      read: read || '4 MIN READ',
      body: Array.isArray(body) ? body : [body || ''],
      coverImage: coverImage ? coverImage.trim() : '',
      order: memoryArticles.length + 1,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('articles').insertOne(newArticle);
      } catch (err) {}
    }
    memoryArticles.push(newArticle);
    saveDatabaseToFile();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;

    if (db) {
      try {
        await db.collection('articles').updateOne(buildIdQuery(id), { $set: updateData });
      } catch (err) {
        console.warn('Mongo update article error:', err.message);
      }
    }

    const idx = memoryArticles.findIndex(a => a.id === id || String(a._id) === id);
    if (idx !== -1) {
      memoryArticles[idx] = { ...memoryArticles[idx], ...updateData };
    }
    saveDatabaseToFile();

    res.json({ success: true, updated: updateData, article: idx !== -1 ? memoryArticles[idx] : updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      try {
        await db.collection('articles').deleteOne(buildIdQuery(id));
      } catch (err) {}
    }
    memoryArticles = memoryArticles.filter(a => a.id !== id && String(a._id) !== id);
    saveDatabaseToFile();
    res.json({ success: true, message: `Article ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. SITE SETTINGS
app.get('/api/settings', async (req, res) => {
  try {
    if (db) {
      const doc = await db.collection('settings').findOne({ key: 'main_settings' });
      if (doc) {
        memorySettings = { ...defaultSettings, ...doc };
        saveDatabaseToFile();
        return res.json(memorySettings);
      }
    }
    res.json(memorySettings);
  } catch (error) {
    res.json(memorySettings);
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    delete updateFields._id;
    delete updateFields.key;

    if (db) {
      try {
        await db.collection('settings').updateOne(
          { key: 'main_settings' },
          { $set: updateFields },
          { upsert: true }
        );
      } catch (err) {}
    }
    memorySettings = { ...memorySettings, ...updateFields };
    saveDatabaseToFile();

    res.json({ success: true, settings: memorySettings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. BEHIND THE SNG (TEAM CRUD)
app.get('/api/team', async (req, res) => {
  try {
    if (db) {
      const list = await db.collection('team').find({}).sort({ order: 1, _id: 1 }).toArray();
      if (list && list.length > 0) {
        memoryTeam = list;
        saveDatabaseToFile();
      }
    }
    res.json(memoryTeam);
  } catch (error) {
    res.json(memoryTeam);
  }
});

app.post('/api/team', async (req, res) => {
  try {
    const { name, role, photo, skills, bio, portfolio } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required.' });
    }

    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const newMember = {
      id: 'TEAM-' + Date.now().toString().slice(-5),
      name: name.trim(),
      role: role.trim(),
      photo: photo ? photo.trim() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      skills: skillsArray,
      bio: bio ? bio.trim() : '',
      portfolio: portfolio ? portfolio.trim() : '',
      order: memoryTeam.length + 1,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('team').insertOne(newMember);
      } catch (err) {}
    }
    memoryTeam.push(newMember);
    saveDatabaseToFile();

    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/team/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;

    if (updateData.skills && typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (db) {
      try {
        await db.collection('team').updateOne(buildIdQuery(id), { $set: updateData });
      } catch (err) {
        console.warn('Mongo update team error:', err.message);
      }
    }

    const idx = memoryTeam.findIndex(t => t.id === id || String(t._id) === id);
    if (idx !== -1) {
      memoryTeam[idx] = { ...memoryTeam[idx], ...updateData };
    }
    saveDatabaseToFile();

    res.json({ success: true, updated: updateData, member: idx !== -1 ? memoryTeam[idx] : updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      try {
        await db.collection('team').deleteOne(buildIdQuery(id));
      } catch (err) {}
    }
    memoryTeam = memoryTeam.filter(t => t.id !== id && String(t._id) !== id);
    saveDatabaseToFile();
    res.json({ success: true, message: `Team member ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. AUTH & USER MANAGEMENT (MONGODB ATLAS)
// Register a new user (default role: user)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    let existingUser = null;
    if (db) {
      existingUser = await db.collection('users').findOne({ email: cleanEmail });
    }
    if (!existingUser) {
      existingUser = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar. Silakan gunakan menu Masuk.' });
    }

    const newUser = {
      id: 'USR-' + Date.now().toString().slice(-6),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: 'user', // Always user by default
      phone: phone ? phone.trim() : '',
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('users').insertOne(newUser);
      } catch (err) {
        console.warn('Mongo insert user error:', err.message);
      }
    }

    memoryUsers.unshift(newUser);
    saveDatabaseToFile();

    const safeUser = { ...newUser };
    delete safeUser.password;

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Akun Anda telah tersimpan di database.',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    let userDoc = null;
    if (db) {
      userDoc = await db.collection('users').findOne({ email: cleanEmail });
    }
    if (!userDoc) {
      userDoc = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (!userDoc) {
      return res.status(404).json({ error: 'Akun dengan email ini tidak ditemukan. Silakan mendaftar terlebih dahulu.' });
    }

    // Verify password if provided
    if (password && userDoc.password && userDoc.password !== password) {
      return res.status(401).json({ error: 'Password tidak sesuai. Silakan periksa kembali.' });
    }

    const safeUser = {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role || 'user',
      phone: userDoc.phone || '',
      createdAt: userDoc.createdAt
    };

    res.json({
      success: true,
      message: `Selamat datang kembali, ${safeUser.name}!`,
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin view)
app.get('/api/users', async (req, res) => {
  try {
    if (db) {
      const list = await db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
      if (list && list.length > 0) {
        memoryUsers = list;
        saveDatabaseToFile();
      }
    }
    // Return sanitized users (without password)
    const sanitized = memoryUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role || 'user',
      phone: u.phone || '',
      createdAt: u.createdAt
    }));
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (admin action: promote to admin / demote to user)
app.put('/api/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Role harus "admin" atau "user".' });
    }

    if (db) {
      try {
        await db.collection('users').updateOne(
          buildIdQuery(id),
          { $set: { role, updatedAt: new Date().toISOString() } }
        );
      } catch (err) {
        console.warn('Mongo update user role error:', err.message);
      }
    }

    const idx = memoryUsers.findIndex(u => u.id === id || String(u._id) === id);
    if (idx !== -1) {
      memoryUsers[idx].role = role;
      memoryUsers[idx].updatedAt = new Date().toISOString();
      saveDatabaseToFile();

      const safeUser = { ...memoryUsers[idx] };
      delete safeUser.password;
      return res.json({ success: true, message: `Role berhasil diubah menjadi ${role}`, user: safeUser });
    }

    res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('users').deleteOne(buildIdQuery(id));
      } catch (err) {}
    }

    memoryUsers = memoryUsers.filter(u => u.id !== id && String(u._id) !== id);
    saveDatabaseToFile();

    res.json({ success: true, message: `Pengguna ${id} berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. DASHBOARD STATS
app.get('/api/stats', async (req, res) => {
  try {
    const ordersCount = memoryOrders.length;
    const pendingOrders = memoryOrders.filter(o => o.status === 'Menunggu Ditinjau').length;
    const inProgressOrders = memoryOrders.filter(o => ['Dalam Peninjauan', 'Penawaran Dikirim', 'Disetujui', 'Sedang Dikerjakan'].includes(o.status)).length;
    const completedOrders = memoryOrders.filter(o => o.status === 'Selesai').length;

    const totalUsers = memoryUsers.length;
    const adminCount = memoryUsers.filter(u => u.role === 'admin').length;
    const clientCount = memoryUsers.filter(u => u.role === 'user').length;

    res.json({
      orders: {
        total: ordersCount,
        pending: pendingOrders,
        inProgress: inProgressOrders,
        completed: completedOrders
      },
      users: {
        total: totalUsers,
        admin: adminCount,
        clients: clientCount
      },
      messages: memoryMessages.length,
      services: memoryServices.length,
      articles: memoryArticles.length,
      team: memoryTeam.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend static build if available
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, async () => {
  console.log(`SNG Agency Backend Server running on port ${PORT}`);
  await initDatabase();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await disconnectFromMongoDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await disconnectFromMongoDB();
  process.exit(0);
});
