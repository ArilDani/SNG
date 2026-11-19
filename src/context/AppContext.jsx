import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../api';

const AppContext = createContext(null);

export const initialServices = [
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

export const initialArticles = [
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

export const initialSettings = {
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

export const initialTeam = [
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

export function AppProvider({ children }) {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0];
    return hash || 'home';
  });
  const [routeParam, setRouteParam] = useState(() => {
    const parts = window.location.hash.replace(/^#\/?/, '').split('/');
    return parts[1] || '';
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sng_user_v2');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const cached = localStorage.getItem('sng_services_v2');
      return cached ? JSON.parse(cached) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [articles, setArticles] = useState(() => {
    try {
      const cached = localStorage.getItem('sng_articles_v2');
      return cached ? JSON.parse(cached) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('sng_settings_v2');
      return cached ? { ...initialSettings, ...JSON.parse(cached) } : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [team, setTeam] = useState(() => {
    try {
      const cached = localStorage.getItem('sng_team_v2');
      return cached ? JSON.parse(cached) : initialTeam;
    } catch {
      return initialTeam;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [orderModalService, setOrderModalService] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  }, []);

  const navigateTo = useCallback((newRoute, param = '') => {
    const hashStr = param ? `#/${newRoute}/${param}` : `#/${newRoute}`;
    window.location.hash = hashStr;
    setRoute(newRoute);
    setRouteParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const parts = window.location.hash.replace(/^#\/?/, '').split('/');
      let r = parts[0] || 'home';
      const p = parts[1] || '';

      if (r === 'user') r = 'user-dashboard';
      if (r === 'admin') r = 'admin-dashboard';
      if (r === 'dashboard') {
        r = user?.role === 'admin' ? 'admin-dashboard' : 'user-dashboard';
      }

      setRoute(r);
      setRouteParam(p);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  // Save user to localStorage
  const updateUser = useCallback((userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('sng_user_v2', JSON.stringify(userData));
    } else {
      localStorage.removeItem('sng_user_v2');
    }
  }, []);

  const logout = useCallback(() => {
    updateUser(null);
    showToast('Anda telah keluar dari portal.');
    navigateTo('home');
  }, [updateUser, showToast, navigateTo]);

  // Fetch data with robust persistence & fallback
  const refreshServices = useCallback(async () => {
    try {
      const data = await api.getServices();
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
        localStorage.setItem('sng_services_v2', JSON.stringify(data));
      }
    } catch (e) {
      console.warn('Using local fallback for services:', e);
    }
  }, []);

  const refreshArticles = useCallback(async () => {
    try {
      const data = await api.getArticles();
      if (Array.isArray(data) && data.length > 0) {
        setArticles(data);
        localStorage.setItem('sng_articles_v2', JSON.stringify(data));
      }
    } catch (e) {
      console.warn('Using local fallback for articles:', e);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      if (data && typeof data === 'object') {
        setSettings(prev => {
          const merged = { ...prev, ...data };
          localStorage.setItem('sng_settings_v2', JSON.stringify(merged));
          return merged;
        });
      }
    } catch (e) {
      console.warn('Using local fallback for settings:', e);
    }
  }, []);

  const refreshTeam = useCallback(async () => {
    try {
      const data = await api.getTeam();
      if (Array.isArray(data) && data.length > 0) {
        setTeam(data);
        localStorage.setItem('sng_team_v2', JSON.stringify(data));
      }
    } catch (e) {
      console.warn('Using local fallback for team:', e);
    }
  }, []);

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true);
      await Promise.allSettled([
        refreshServices(),
        refreshArticles(),
        refreshSettings(),
        refreshTeam()
      ]);
      setIsLoading(false);
    }
    loadAll();
  }, [refreshServices, refreshArticles, refreshSettings, refreshTeam]);

  return (
    <AppContext.Provider
      value={{
        route,
        routeParam,
        navigateTo,
        user,
        updateUser,
        logout,
        services,
        setServices,
        refreshServices,
        articles,
        setArticles,
        refreshArticles,
        settings,
        setSettings,
        refreshSettings,
        team,
        setTeam,
        refreshTeam,
        isLoading,
        orderModalService,
        setOrderModalService,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toastMessage,
        toastVisible,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
