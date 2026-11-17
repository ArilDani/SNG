import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectToMongoDB, disconnectFromMongoDB, client } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_NAME = 'sng_agency';

// Default initial data for seeding & in-memory fallback
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
  heroTitleLine1: 'Masih bertumbuh',
  heroTitleLine2: 'dengan cara lama?',
  heroQuestion: 'Saat dunia digital terus berubah, mungkin yang dibutuhkan bisnis Anda bukan sekadar lebih banyak konten—tetapi arah yang lebih tepat.',
  location: 'Makassar · Indonesia',
  email: 'halo@sngagency.id',
  phone: '+62 812 3456 7890',
  brandTagline: 'STRATEGY. NEXUS. GROWTH.',
  aboutVision: 'Menjadi agensi digital berbasis data yang inovatif dan adaptif dalam membantu UMKM mengembangkan bisnis melalui pemasaran digital yang terintegrasi, terukur, dan sesuai dengan kebutuhan mitra.'
};

// Resilient memory store
let memoryServices = [...defaultServices];
let memoryArticles = [...defaultArticles];
let memorySettings = { ...defaultSettings };
let memoryOrders = [];
let memoryMessages = [];

let db = null;

async function initDatabase() {
  try {
    await connectToMongoDB();
    db = client.db(DB_NAME);

    // Seed services if collection is empty
    const servicesCol = db.collection('services');
    const serviceCount = await servicesCol.countDocuments();
    if (serviceCount === 0) {
      console.log('Seeding initial services to MongoDB...');
      await servicesCol.insertMany(defaultServices);
    } else {
      memoryServices = await servicesCol.find({}).sort({ order: 1, _id: 1 }).toArray();
    }

    // Seed articles if empty
    const articlesCol = db.collection('articles');
    const articleCount = await articlesCol.countDocuments();
    if (articleCount === 0) {
      console.log('Seeding initial articles to MongoDB...');
      await articlesCol.insertMany(defaultArticles);
    } else {
      memoryArticles = await articlesCol.find({}).sort({ order: 1, _id: 1 }).toArray();
    }

    // Seed settings if empty
    const settingsCol = db.collection('settings');
    const settingsDoc = await settingsCol.findOne({ key: 'main_settings' });
    if (!settingsDoc) {
      console.log('Seeding initial site settings to MongoDB...');
      await settingsCol.insertOne({ key: 'main_settings', ...defaultSettings });
    } else {
      memorySettings = { ...defaultSettings, ...settingsDoc };
    }

    console.log('MongoDB initialization & seeding completed successfully.');
  } catch (err) {
    console.warn('MongoDB connection pending / using resilient local memory store:', err.message);
  }
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: !!db, time: new Date() });
});

// 1. SERVICES CRUD
app.get('/api/services', async (req, res) => {
  try {
    if (db) {
      const list = await db.collection('services').find({}).sort({ order: 1, _id: 1 }).toArray();
      memoryServices = list;
      return res.json(list);
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
      await db.collection('services').insertOne(newService);
    }
    memoryServices.push(newService);

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData._id;

    if (db) {
      await db.collection('services').updateOne({ id }, { $set: updateData });
    }

    const idx = memoryServices.findIndex(s => s.id === id);
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updateData };
    }

    res.json({ success: true, updated: updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (db) {
      await db.collection('services').deleteOne({ id });
    }
    memoryServices = memoryServices.filter(s => s.id !== id);

    res.json({ success: true, message: `Service ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. ORDERS CRUD
app.get('/api/orders', async (req, res) => {
  try {
    const { email } = req.query;
    if (db) {
      const filter = email ? { 'customer.email': email.toLowerCase().trim() } : {};
      const orders = await db.collection('orders').find(filter).sort({ createdAt: -1 }).toArray();
      return res.json(orders);
    }

    const list = email
      ? memoryOrders.filter(o => o.customer?.email?.toLowerCase() === email.toLowerCase().trim())
      : memoryOrders;
    res.json(list);
  } catch (error) {
    res.json(memoryOrders);
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customer, serviceId, serviceName, projectType, budget, brief } = req.body;

    if (!customer?.name || !customer?.email || !brief) {
      return res.status(400).json({ error: 'Customer name, email, and brief are required.' });
    }

    const newOrder = {
      id: 'SNG-' + Date.now().toString().slice(-7),
      createdAt: new Date().toISOString(),
      customer: {
        name: customer.name.trim(),
        email: customer.email.toLowerCase().trim(),
        phone: customer.phone ? customer.phone.trim() : '-',
        business: customer.business ? customer.business.trim() : '-'
      },
      serviceId: serviceId || 'SNG-GEN',
      serviceName: serviceName || 'Layanan SNG',
      projectType: projectType || 'Proyek satu kali',
      budget: budget || 'Belum ditentukan',
      brief: brief.trim(),
      status: 'Menunggu Ditinjau',
      adminNote: ''
    };

    if (db) {
      await db.collection('orders').insertOne(newOrder);
    }
    memoryOrders.unshift(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const updateFields = {};
    if (status !== undefined) updateFields.status = status;
    if (adminNote !== undefined) updateFields.adminNote = adminNote;

    if (db) {
      await db.collection('orders').updateOne({ id }, { $set: updateFields });
    }

    const idx = memoryOrders.findIndex(o => o.id === id);
    if (idx !== -1) {
      memoryOrders[idx] = { ...memoryOrders[idx], ...updateFields };
    }

    res.json({ success: true, updated: updateFields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. CONTACT MESSAGES CRUD
app.get('/api/messages', async (req, res) => {
  try {
    if (db) {
      const messages = await db.collection('messages').find({}).sort({ date: -1 }).toArray();
      memoryMessages = messages;
      return res.json(messages);
    }
    res.json(memoryMessages);
  } catch (error) {
    res.json(memoryMessages);
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, business, need, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMessage = {
      id: 'MSG-' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      business: business ? business.trim() : 'Tanpa nama bisnis',
      need: need || 'Konsultasi umum',
      message: message.trim()
    };

    if (db) {
      await db.collection('messages').insertOne(newMessage);
    }
    memoryMessages.unshift(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      await db.collection('messages').deleteOne({ id });
    }
    memoryMessages = memoryMessages.filter(m => m.id !== id);
    res.json({ success: true, message: `Message ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ARTICLES CRUD
app.get('/api/articles', async (req, res) => {
  try {
    if (db) {
      const articles = await db.collection('articles').find({}).sort({ order: 1, _id: 1 }).toArray();
      memoryArticles = articles;
      return res.json(articles);
    }
    res.json(memoryArticles);
  } catch (error) {
    res.json(memoryArticles);
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const { category, date, title, excerpt, read, body } = req.body;
    if (!title || !excerpt) {
      return res.status(400).json({ error: 'Title and excerpt are required.' });
    }

    const newArticle = {
      id: 'A' + Date.now().toString().slice(-4),
      category: category || 'DIGITAL STRATEGY',
      date: date || 'INSIGHT / 0' + (memoryArticles.length + 1),
      title: title.trim(),
      excerpt: excerpt.trim(),
      read: read || '4 MIN READ',
      body: Array.isArray(body) ? body : [body || excerpt],
      order: memoryArticles.length + 1
    };

    if (db) {
      await db.collection('articles').insertOne(newArticle);
    }
    memoryArticles.push(newArticle);

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData._id;

    if (db) {
      await db.collection('articles').updateOne({ id }, { $set: updateData });
    }

    const idx = memoryArticles.findIndex(a => a.id === id);
    if (idx !== -1) {
      memoryArticles[idx] = { ...memoryArticles[idx], ...updateData };
    }

    res.json({ success: true, updated: updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      await db.collection('articles').deleteOne({ id });
    }
    memoryArticles = memoryArticles.filter(a => a.id !== id);
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
    const updateFields = req.body;
    delete updateFields._id;
    delete updateFields.key;

    if (db) {
      await db.collection('settings').updateOne(
        { key: 'main_settings' },
        { $set: updateFields },
        { upsert: true }
      );
    }
    memorySettings = { ...memorySettings, ...updateFields };

    res.json({ success: true, settings: memorySettings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. DASHBOARD STATS
app.get('/api/stats', async (req, res) => {
  try {
    const ordersCount = memoryOrders.length;
    const pendingOrders = memoryOrders.filter(o => o.status === 'Menunggu Ditinjau').length;
    const inProgressOrders = memoryOrders.filter(o => ['Dalam Peninjauan', 'Penawaran Dikirim', 'Disetujui', 'Sedang Dikerjakan'].includes(o.status)).length;
    const completedOrders = memoryOrders.filter(o => o.status === 'Selesai').length;

    res.json({
      orders: {
        total: ordersCount,
        pending: pendingOrders,
        inProgress: inProgressOrders,
        completed: completedOrders
      },
      messages: memoryMessages.length,
      services: memoryServices.length,
      articles: memoryArticles.length
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
