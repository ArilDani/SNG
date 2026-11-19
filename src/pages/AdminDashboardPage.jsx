import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';
import sngLogo from '../assets/sng-logo-clean.png';
import BlogWriterStudio from '../components/BlogWriterStudio';
import {
  IconOverview,
  IconUsers,
  IconUser,
  IconOrders,
  IconServices,
  IconArticles,
  IconTeam,
  IconMessages,
  IconSettings,
  IconExternal,
  IconLogout,
  IconTrash,
  IconRefresh,
  IconSearch,
  IconCheck,
  IconPlus,
  IconEdit,
  IconDatabase,
  IconCrown,
  IconShield,
  IconGlobe
} from '../components/Icons';

const STATUS_OPTIONS = [
  'Menunggu Ditinjau',
  'Dalam Peninjauan',
  'Penawaran Dikirim',
  'Disetujui',
  'Sedang Dikerjakan',
  'Selesai',
  'Ditolak'
];

export default function AdminDashboardPage() {
  const {
    user,
    logout,
    navigateTo,
    services,
    refreshServices,
    articles,
    refreshArticles,
    settings,
    refreshSettings,
    team,
    refreshTeam,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  // Modal states for CRUD operations
  const [orderDetailModal, setOrderDetailModal] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [dbHealth, setDbHealth] = useState(null);

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setDbHealth(data);
      } catch (e) {}
    };
    checkDb();
    const interval = setInterval(checkDb, 5000);
    return () => clearInterval(interval);
  }, []);

  // Team CRUD modal state
  const [teamModal, setTeamModal] = useState({
    open: false,
    isEdit: false,
    data: { id: '', name: '', role: '', photo: '', skills: '', bio: '', portfolio: '' }
  });

  // Service CRUD modal state
  const [serviceModal, setServiceModal] = useState({
    open: false,
    isEdit: false,
    data: { id: '', name: '', category: 'strategy', icon: '✧', desc: '', deliverables: '', label: '' }
  });

  // Article CRUD modal state
  const [articleModal, setArticleModal] = useState({
    open: false,
    isEdit: false,
    data: { id: '', category: 'DIGITAL STRATEGY', date: 'INSIGHT / 04', title: '', excerpt: '', read: '4 MIN READ', body: '' }
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings]);

  // Load all data
  const loadAdminData = useCallback(async () => {
    try {
      const [ordersRes, messagesRes, usersRes] = await Promise.allSettled([
        api.getOrders(),
        api.getMessages(),
        api.getUsers()
      ]);
      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value || []);
      if (messagesRes.status === 'fulfilled') setMessages(messagesRes.value || []);
      if (usersRes.status === 'fulfilled') setUsersList(usersRes.value || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // If user is not admin, show direct redirection prompt
  if (user?.role !== 'admin') {
    return (
      <div className="app-page active">
        <div className="dashboard-shell">
          <aside className="dash-sidebar">
            <div className="brand" onClick={() => navigateTo('home')}>
              <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
              <span>SNG CONTROL<small>ADMIN CONSOLE</small></span>
            </div>
          </aside>
          <div className="dash-main">
            <div className="dash-panel">
              <div className="empty-state">
                <b>Akses Terbatas: Administrator</b>
                Silakan masuk dengan akun berwenang untuk mengelola sistem backend MongoDB Atlas.
                <br />
                <button
                  className="btn btn-dark"
                  style={{ marginTop: '20px' }}
                  onClick={() => navigateTo('login')}
                >
                  <span>Masuk ke Akun Admin</span>
                  <IconExternal size={12} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ORDERS ACTIONS
  // -------------------------------------------------------------
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrder(orderId, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      showToast(`Status pesanan ${orderId} diubah menjadi: ${newStatus}`);
    } catch (err) {
      showToast('Gagal memperbarui status: ' + err.message);
    }
  };

  const handleSaveAdminNote = async () => {
    if (!orderDetailModal) return;
    try {
      await api.updateOrder(orderDetailModal.id, { adminNote: adminNoteInput });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderDetailModal.id ? { ...o, adminNote: adminNoteInput } : o))
      );
      setOrderDetailModal(null);
      showToast('Catatan admin berhasil disimpan dan dikirim ke klien!');
    } catch (err) {
      showToast('Gagal menyimpan catatan: ' + err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Hapus pesanan ${orderId} dari database?`)) return;
    try {
      await api.deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      showToast(`Pesanan ${orderId} berhasil dihapus.`);
    } catch (err) {
      showToast('Gagal menghapus pesanan: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // SERVICES CRUD
  // -------------------------------------------------------------
  const openAddServiceModal = () => {
    setServiceModal({
      open: true,
      isEdit: false,
      data: {
        id: `SNG-0${services.length + 1}`,
        name: '',
        category: 'strategy',
        icon: '✧',
        desc: '',
        deliverables: '',
        label: 'Strategy & Data'
      }
    });
  };

  const openEditServiceModal = (svc) => {
    setServiceModal({
      open: true,
      isEdit: true,
      data: { ...svc, id: svc.id || svc._id }
    });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    const { id, _id, name, category, icon, desc, deliverables, label } = serviceModal.data;
    const targetId = id || _id;
    if (!name || !desc) {
      showToast('Nama dan deskripsi layanan wajib diisi.');
      return;
    }

    try {
      if (serviceModal.isEdit && targetId) {
        await api.updateService(targetId, { name, category, icon, desc, deliverables, label });
        showToast(`Layanan "${name}" berhasil diperbarui di database!`);
      } else {
        await api.createService({ id, name, category, icon, desc, deliverables, label });
        showToast(`Layanan baru "${name}" berhasil ditambahkan ke database!`);
      }
      await refreshServices();
      setServiceModal({ ...serviceModal, open: false });
    } catch (err) {
      showToast('Gagal menyimpan layanan: ' + err.message);
    }
  };

  const handleDeleteService = async (serviceId, serviceName) => {
    if (!window.confirm(`Hapus layanan "${serviceName}" dari database? Perubahan akan langsung terlihat di katalog depan.`)) return;
    try {
      await api.deleteService(serviceId);
      await refreshServices();
      showToast(`Layanan "${serviceName}" berhasil dihapus.`);
    } catch (err) {
      showToast('Gagal menghapus layanan: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // ARTICLES CRUD (BLOG STUDIO)
  // -------------------------------------------------------------
  const openAddArticleModal = () => {
    setArticleModal({
      open: true,
      isEdit: false,
      data: {
        id: `A0${articles.length + 1}`,
        category: 'DIGITAL STRATEGY',
        date: `INSIGHT / 0${articles.length + 1}`,
        title: '',
        excerpt: '',
        read: '4 MIN READ',
        body: '',
        coverImage: ''
      }
    });
  };

  const openEditArticleModal = (art) => {
    setArticleModal({
      open: true,
      isEdit: true,
      data: {
        ...art,
        id: art.id || art._id,
        body: Array.isArray(art.body) ? art.body.join('\n\n') : (art.body || '')
      }
    });
  };

  const handleSaveArticle = async (articleData) => {
    const isEdit = articleModal.isEdit;
    const targetId = articleData.id || articleModal.data?.id || articleModal.data?._id;

    if (!articleData.title || !articleData.excerpt) {
      showToast('Judul dan ringkasan artikel wajib diisi.');
      return;
    }

    const bodyParagraphs = typeof articleData.body === 'string'
      ? articleData.body.split('\n\n').filter((p) => p.trim().length > 0)
      : Array.isArray(articleData.body) ? articleData.body : [];

    const payload = {
      ...articleData,
      body: bodyParagraphs
    };

    try {
      if (isEdit && targetId) {
        await api.updateArticle(targetId, payload);
        showToast(`Artikel "${articleData.title}" berhasil diperbarui!`);
      } else {
        await api.createArticle(payload);
        showToast(`Artikel baru "${articleData.title}" berhasil diterbitkan!`);
      }
      await refreshArticles();
      setArticleModal({ open: false, isEdit: false, data: {} });
    } catch (err) {
      showToast('Gagal menyimpan artikel: ' + err.message);
    }
  };

  const handleDeleteArticle = async (articleId, articleTitle) => {
    if (!window.confirm(`Hapus artikel "${articleTitle}" dari database?`)) return;
    try {
      await api.deleteArticle(articleId);
      await refreshArticles();
      showToast(`Artikel "${articleTitle}" berhasil dihapus.`);
    } catch (err) {
      showToast('Gagal menghapus artikel: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // TEAM CRUD & TOGGLE
  // -------------------------------------------------------------
  const openCreateTeamModal = () => {
    setTeamModal({
      open: true,
      isEdit: false,
      data: {
        id: `TEAM-0${team.length + 1}`,
        name: '',
        role: '',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        skills: '',
        bio: '',
        portfolio: ''
      }
    });
  };

  const openEditTeamModal = (member) => {
    setTeamModal({
      open: true,
      isEdit: true,
      data: {
        ...member,
        id: member.id || member._id,
        skills: Array.isArray(member.skills) ? member.skills.join(', ') : (member.skills || '')
      }
    });
  };

  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    const { id, _id, name, role, photo, skills, bio, portfolio } = teamModal.data;
    const targetId = id || _id;
    if (!name || !role) {
      showToast('Nama dan posisi/role anggota tim wajib diisi.');
      return;
    }

    const skillsArray = typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : Array.isArray(skills) ? skills : [];

    try {
      if (teamModal.isEdit && targetId) {
        await api.updateTeamMember(targetId, { name, role, photo, skills: skillsArray, bio, portfolio });
        showToast(`Data tim "${name}" berhasil diperbarui!`);
      } else {
        await api.createTeamMember({ id, name, role, photo, skills: skillsArray, bio, portfolio });
        showToast(`Anggota tim baru "${name}" berhasil ditambahkan!`);
      }
      await refreshTeam();
      setTeamModal({ ...teamModal, open: false });
    } catch (err) {
      showToast('Gagal menyimpan data tim: ' + err.message);
    }
  };

  const handleDeleteTeamMember = async (memberId, memberName) => {
    if (!window.confirm(`Hapus anggota tim "${memberName}" dari daftar?`)) return;
    try {
      await api.deleteTeamMember(memberId);
      await refreshTeam();
      showToast(`Anggota tim "${memberName}" berhasil dihapus.`);
    } catch (err) {
      showToast('Gagal menghapus anggota tim: ' + err.message);
    }
  };

  const handleToggleTeamSection = async () => {
    const newStatus = settings.isTeamSectionActive === false;
    try {
      await api.updateSettings({ ...settings, isTeamSectionActive: newStatus });
      await refreshSettings();
      showToast(newStatus ? 'Section Behind the SNG diaktifkan di website!' : 'Section Behind the SNG dinonaktifkan dari website.');
    } catch (err) {
      showToast('Gagal mengubah status section: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // USERS & ROLE ACTIONS (MONGODB ATLAS)
  // -------------------------------------------------------------
  const handleRoleChange = async (userId, userName, newRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      setUsersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      showToast(`Role pengguna "${userName}" diubah menjadi: ${newRole === 'admin' ? 'Administrator' : 'Klien'}`);
    } catch (err) {
      showToast('Gagal mengubah role pengguna: ' + err.message);
    }
  };

  const handleDeleteUser = async (userId, userName, userEmail) => {
    if (user?.email && userEmail?.toLowerCase() === user.email.toLowerCase()) {
      showToast('Tidak dapat menghapus akun Anda sendiri yang sedang aktif.');
      return;
    }
    if (!window.confirm(`Hapus pengguna "${userName}" (${userEmail}) dari database MongoDB?`)) return;
    try {
      await api.deleteUser(userId);
      setUsersList((prev) => prev.filter((u) => u.id !== userId));
      showToast(`Pengguna "${userName}" berhasil dihapus.`);
    } catch (err) {
      showToast('Gagal menghapus pengguna: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // MESSAGES ACTIONS
  // -------------------------------------------------------------
  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm('Hapus pesan kontak ini?')) return;
    try {
      await api.deleteMessage(msgId);
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
      showToast('Pesan berhasil dihapus dari database.');
    } catch (err) {
      showToast('Gagal menghapus pesan: ' + err.message);
    }
  };

  // -------------------------------------------------------------
  // SETTINGS ACTIONS
  // -------------------------------------------------------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settingsForm);
      await refreshSettings();
      showToast('Pengaturan website berhasil diperbarui dan tersimpan di database!');
    } catch (err) {
      showToast('Gagal menyimpan pengaturan: ' + err.message);
    }
  };

  return (
    <div className="app-page active">
      <div className="dashboard-shell">
        {/* SIDEBAR NAVIGATION */}
        <aside className="dash-sidebar">
          <div className="brand" onClick={() => navigateTo('home')}>
            <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
            <span>SNG CONTROL<small>ADMIN CONSOLE</small></span>
          </div>

          <div className="dash-label">MANAGEMENT</div>

          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            <IconOverview size={15} />
            <span>Overview</span>
          </button>

          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <IconUsers size={15} />
            <span>Pengguna & Role</span>
            <span className="dash-count-badge">{usersList.length}</span>
          </button>

          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            <IconOrders size={15} />
            <span>Pesanan</span>
            <span className="dash-count-badge">{orders.length}</span>
          </button>

          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            <IconServices size={15} />
            <span>Layanan CRUD</span>
            <span className="dash-count-badge">{services.length}</span>
          </button>

          <button
            className={activeTab === 'articles' ? 'active' : ''}
            onClick={() => setActiveTab('articles')}
          >
            <IconArticles size={15} />
            <span>Artikel CRUD</span>
            <span className="dash-count-badge">{articles.length}</span>
          </button>

          <button
            className={activeTab === 'team' ? 'active' : ''}
            onClick={() => setActiveTab('team')}
          >
            <IconTeam size={15} />
            <span>Tim Behind SNG</span>
            <span className="dash-count-badge">{team.length}</span>
          </button>

          <button
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            <IconMessages size={15} />
            <span>Pesan Masuk</span>
            <span className="dash-count-badge">{messages.length}</span>
          </button>

          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <IconSettings size={15} />
            <span>Hero & Situs</span>
          </button>

          <div className="dash-label">SYSTEM</div>

          <button onClick={() => navigateTo('home')}>
            <IconGlobe size={15} />
            <span>Website SNG</span>
            <IconExternal size={11} style={{ marginLeft: 'auto', opacity: 0.6 }} />
          </button>

          <button onClick={logout} className="dash-btn-logout">
            <IconLogout size={15} />
            <span>Keluar</span>
          </button>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="dash-main">
          {/* Top Bar with Dribbble-style Breadcrumb, Title & User Card */}
          <div className="dash-top">
            <div className="dash-top-title-group">
              <div className="dash-breadcrumb">
                <span className="dash-breadcrumb-root">SNG CONTROL</span>
                <span className="dash-breadcrumb-separator">/</span>
                <span className="dash-breadcrumb-active">
                  {activeTab === 'users'
                    ? 'PENGGUNA & ROLE'
                    : activeTab === 'orders'
                    ? 'PESANAN LAYANAN'
                    : activeTab === 'services'
                    ? 'KATALOG LAYANAN'
                    : activeTab === 'articles'
                    ? 'ARTIKEL & INSIGHT'
                    : activeTab === 'team'
                    ? 'BEHIND THE SNG'
                    : activeTab === 'messages'
                    ? 'PESAN MASUK'
                    : activeTab === 'settings'
                    ? 'PENGATURAN SITUS'
                    : 'OVERVIEW'}
                </span>
              </div>
              <h1 className="dash-main-title">
                {activeTab === 'users'
                  ? 'Kelola Pengguna & Hak Akses'
                  : activeTab === 'orders'
                  ? 'Daftar Pesanan Masuk'
                  : activeTab === 'services'
                  ? 'Manajemen Katalog Layanan'
                  : activeTab === 'articles'
                  ? 'Manajemen Artikel & Insight'
                  : activeTab === 'team'
                  ? 'Tim Behind the SNG'
                  : activeTab === 'messages'
                  ? 'Pesan Kontak Klien'
                  : activeTab === 'settings'
                  ? 'Pengaturan Hero & Brand'
                  : 'Dashboard Overview'}
              </h1>
              <p className="dash-main-desc">
                Sistem manajemen konten dan transaksi real-time dengan sinkronisasi MongoDB Atlas.
              </p>
            </div>

            <div className="dash-top-actions">
              <div className="dash-live-status-pill">
                <span className={`live-pulse-dot ${dbHealth?.isAtlas ? 'connected' : 'connecting'}`}></span>
                <IconDatabase size={13} />
                <span>{dbHealth?.isAtlas ? 'ATLAS CONNECTED' : 'CONNECTING ATLAS'}</span>
              </div>

              <div className="dash-user-profile-card">
                <div className="user-avatar-initials">
                  {(user?.name || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="user-profile-info">
                  <strong className="user-profile-name">{user?.name || 'Administrator'}</strong>
                  <span className="user-profile-role-tag">
                    <IconCrown size={10} />
                    <span>ADMINISTRATOR</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="metric-grid">
                <div className="metric" onClick={() => setActiveTab('users')} style={{ cursor: 'pointer' }}>
                  <div className="metric-header-row">
                    <small>Pengguna Terdaftar</small>
                    <div className="metric-icon-box">
                      <IconUsers size={16} />
                    </div>
                  </div>
                  <strong>{usersList.length}</strong>
                  <span>{usersList.filter(u => u.role === 'admin').length} Admin · {usersList.filter(u => u.role !== 'admin').length} Klien</span>
                </div>

                <div className="metric" onClick={() => setActiveTab('orders')} style={{ cursor: 'pointer' }}>
                  <div className="metric-header-row">
                    <small>Total Pesanan</small>
                    <div className="metric-icon-box">
                      <IconOrders size={16} />
                    </div>
                  </div>
                  <strong>{orders.length}</strong>
                  <span>Semua brief masuk</span>
                </div>

                <div className="metric" onClick={() => setActiveTab('orders')} style={{ cursor: 'pointer' }}>
                  <div className="metric-header-row">
                    <small>Menunggu Ditinjau</small>
                    <div className="metric-icon-box pending-box">
                      <IconShield size={16} />
                    </div>
                  </div>
                  <strong style={{ color: '#ffb347' }}>
                    {orders.filter((o) => o.status === 'Menunggu Ditinjau').length}
                  </strong>
                  <span>Perlu tindak lanjut</span>
                </div>

                <div className="metric" onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
                  <div className="metric-header-row">
                    <small>Layanan Aktif</small>
                    <div className="metric-icon-box">
                      <IconServices size={16} />
                    </div>
                  </div>
                  <strong>{services.length}</strong>
                  <span>Katalog terpublikasi</span>
                </div>
              </div>

              {/* Database Live Banner */}
              <div className="dash-atlas-card">
                <div className="atlas-card-info">
                  <div className="atlas-status-headline">
                    <span className={`live-pulse-dot ${dbHealth?.isAtlas ? 'connected' : 'connecting'}`}></span>
                    <strong>
                      {dbHealth?.isAtlas ? 'MongoDB Atlas Cloud Database: Online & Terhubung' : 'MongoDB Atlas: Menghubungkan ke Cluster0...'}
                    </strong>
                  </div>
                  <p className="atlas-uri-info">
                    Cluster: <strong>cluster0.ol7ptsz.mongodb.net</strong> · Database: <strong>sng_agency</strong> · User: <strong>arildani60_db_user</strong>
                  </p>
                </div>
                <div className="atlas-stats-pills">
                  <span className="atlas-badge-pill">
                    <IconDatabase size={11} />
                    <span>8 KOLEKSI AKTIF</span>
                  </span>
                </div>
              </div>

              {/* Recent Orders Table Panel */}
              <div className="dash-panel">
                <div className="panel-head">
                  <div>
                    <h3>Permintaan Layanan Terbaru</h3>
                    <span>5 PESANAN TERAKHIR</span>
                  </div>
                  <button
                    className="dash-link-action"
                    onClick={() => setActiveTab('orders')}
                  >
                    <span>Lihat Semua Pesanan</span>
                    <IconExternal size={12} />
                  </button>
                </div>

                {orders.length > 0 ? (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>ID / Tanggal</th>
                          <th>Klien</th>
                          <th>Layanan</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id || o._id}>
                            <td>
                              <strong>{o.id}</strong>
                              <br />
                              <small>{new Date(o.createdAt).toLocaleDateString('id-ID')}</small>
                            </td>
                            <td>
                              <strong>{o.customer?.name}</strong>
                              <br />
                              <small>{o.customer?.email}</small>
                            </td>
                            <td>
                              <strong>{o.serviceName}</strong>
                              <br />
                              <small>{o.customer?.business || '-'}</small>
                            </td>
                            <td>
                              <select
                                className="table-select"
                                value={o.status}
                                onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                              >
                                {STATUS_OPTIONS.map((st) => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <button
                                className="dash-table-btn"
                                onClick={() => {
                                  setOrderDetailModal(o);
                                  setAdminNoteInput(o.adminNote || '');
                                }}
                              >
                                <IconEdit size={12} />
                                <span>Detail</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <b>Belum ada pesanan masuk</b>
                    Pesanan baru dari formulir katalog akan otomatis tercatat di sini.
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: USERS & ROLE MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Kelola Pengguna & Hak Akses Role ({usersList.length})</h3>
                  <span>KONTROL AKSES DATABASE</span>
                </div>
                <button
                  type="button"
                  className="dash-btn-secondary"
                  onClick={async () => {
                    try {
                      const res = await api.getUsers();
                      setUsersList(res);
                      showToast('Daftar pengguna diperbarui dari MongoDB Atlas.');
                    } catch (e) {
                      showToast('Gagal memuat: ' + e.message);
                    }
                  }}
                >
                  <IconRefresh size={13} />
                  <span>Muat Ulang</span>
                </button>
              </div>

              {/* User metrics */}
              <div className="metric-grid" style={{ marginBottom: '20px' }}>
                <div className="metric">
                  <div className="metric-header-row">
                    <small>Total Pengguna</small>
                    <IconUsers size={16} />
                  </div>
                  <strong>{usersList.length}</strong>
                  <span>Tersimpan di Atlas</span>
                </div>

                <div className="metric">
                  <div className="metric-header-row">
                    <small>Administrator</small>
                    <IconCrown size={16} style={{ color: '#a776ff' }} />
                  </div>
                  <strong style={{ color: '#c49eff' }}>
                    {usersList.filter(u => u.role === 'admin').length}
                  </strong>
                  <span>Akses Penuh Console</span>
                </div>

                <div className="metric">
                  <div className="metric-header-row">
                    <small>Klien / User</small>
                    <IconUser size={16} style={{ color: '#68e29a' }} />
                  </div>
                  <strong style={{ color: '#68e29a' }}>
                    {usersList.filter(u => u.role !== 'admin').length}
                  </strong>
                  <span>Akses Client Space</span>
                </div>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Ubah hak akses role pengguna secara langsung melalui dropdown pada tabel. Perubahan langsung tersimpan ke MongoDB Atlas. Pengguna yang diubah perannya menjadi Administrator akan langsung memperoleh hak akses ke Admin Console.
                </p>
              </div>

              {/* Search bar */}
              <div className="dash-search-row">
                <div className="dash-search-wrap">
                  <IconSearch size={14} className="search-svg" />
                  <input
                    type="text"
                    placeholder="Cari pengguna berdasarkan nama, email, atau nomor HP..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                {userSearch && (
                  <button
                    type="button"
                    className="dash-btn-ghost"
                    onClick={() => setUserSearch('')}
                  >
                    Reset
                  </button>
                )}
              </div>

              {usersList.length > 0 ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Pengguna</th>
                        <th>Email & Kontak</th>
                        <th>Terdaftar Pada</th>
                        <th>Status Role</th>
                        <th>Ubah Role (Live Dropdown)</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList
                        .filter(u => {
                          if (!userSearch.trim()) return true;
                          const q = userSearch.toLowerCase();
                          return (
                            (u.name && u.name.toLowerCase().includes(q)) ||
                            (u.email && u.email.toLowerCase().includes(q)) ||
                            (u.phone && u.phone.toLowerCase().includes(q)) ||
                            (u.role && u.role.toLowerCase().includes(q))
                          );
                        })
                        .map((u) => {
                          const isCurrentUser = user?.email && u.email?.toLowerCase() === user.email.toLowerCase();
                          const isAdmin = u.role === 'admin';
                          return (
                            <tr key={u.id || u.email}>
                              <td>
                                <div className="user-cell-row">
                                  <div className={`user-table-avatar ${isAdmin ? 'admin-avatar' : 'client-avatar'}`}>
                                    {(u.name || 'U').charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <strong style={{ color: '#ffffff', fontSize: '12px' }}>{u.name}</strong>
                                      {isCurrentUser && (
                                        <span className="self-tag">Anda</span>
                                      )}
                                    </div>
                                    <small style={{ color: '#88849c', fontFamily: 'var(--mono)', fontSize: '9px' }}>
                                      {u.id}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span style={{ color: '#dedbf0', fontWeight: 500 }}>{u.email}</span>
                                <br />
                                <small style={{ color: '#7a7690' }}>{u.phone || 'Nomor HP -'}</small>
                              </td>
                              <td>
                                <small style={{ color: '#9d98b2' }}>
                                  {u.createdAt
                                    ? new Date(u.createdAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                      })
                                    : '-'}
                                </small>
                              </td>
                              <td>
                                <span className={`user-role-badge ${isAdmin ? 'badge-role-admin' : 'badge-role-user'}`}>
                                  {isAdmin ? (
                                    <>
                                      <IconCrown size={11} />
                                      <span>ADMINISTRATOR</span>
                                    </>
                                  ) : (
                                    <>
                                      <IconUser size={11} />
                                      <span>USER / KLIEN</span>
                                    </>
                                  )}
                                </span>
                              </td>
                              <td>
                                <select
                                  className="table-select-role"
                                  value={u.role}
                                  onChange={(e) => handleRoleChange(u.id, u.name, e.target.value)}
                                  disabled={isCurrentUser}
                                  title={isCurrentUser ? 'Tidak dapat menurunkan role akun aktif Anda sendiri' : 'Ubah hak akses pengguna'}
                                >
                                  <option value="user">User / Klien (Client Space)</option>
                                  <option value="admin">Administrator (Admin Console)</option>
                                </select>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="dash-table-del-btn"
                                  disabled={isCurrentUser}
                                  title={isCurrentUser ? 'Akun aktif tidak dapat dihapus' : 'Hapus pengguna dari database'}
                                  onClick={() => handleDeleteUser(u.id, u.name, u.email)}
                                >
                                  <IconTrash size={12} />
                                  <span>Hapus</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <b>Tidak ada pengguna ditemukan</b>
                  Gunakan form pendaftaran untuk menambahkan akun baru.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Semua Permintaan Layanan ({orders.length})</h3>
                  <span>DATABASE LIVE SYNC</span>
                </div>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Perubahan status pada dropdown langsung tersimpan ke MongoDB Atlas. Klien yang membuka Client Space dengan email terkait akan melihat status dan catatan ini secara real-time.
                </p>
              </div>

              {orders.length > 0 ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ID / Tanggal</th>
                        <th>Klien & Kontak</th>
                        <th>Layanan & Bisnis</th>
                        <th>Anggaran & Brief</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id || o._id}>
                          <td>
                            <strong>{o.id}</strong>
                            <br />
                            <small>{new Date(o.createdAt).toLocaleDateString('id-ID')}</small>
                          </td>
                          <td>
                            <strong>{o.customer?.name}</strong>
                            <br />
                            <small>{o.customer?.email}</small>
                            <br />
                            <small style={{ color: '#777' }}>{o.customer?.phone || '-'}</small>
                          </td>
                          <td>
                            <strong>{o.serviceName}</strong>
                            <br />
                            <small>Bisnis: {o.customer?.business || '-'}</small>
                            <br />
                            <small>Tipe: {o.projectType}</small>
                          </td>
                          <td style={{ maxWidth: '240px' }}>
                            <small style={{ color: '#be9eff', fontWeight: 600 }}>{o.budget}</small>
                            <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#a29ebd', lineHeight: '1.5' }}>
                              {o.brief.slice(0, 85)}
                              {o.brief.length > 85 ? '…' : ''}
                            </p>
                          </td>
                          <td>
                            <select
                              className="table-select"
                              value={o.status}
                              onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                            {o.adminNote && (
                              <div style={{ marginTop: '5px', fontSize: '9px', color: '#9d76f5', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <IconCheck size={10} />
                                <span>Catatan terisi</span>
                              </div>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                className="dash-table-btn"
                                onClick={() => {
                                  setOrderDetailModal(o);
                                  setAdminNoteInput(o.adminNote || '');
                                }}
                              >
                                <IconEdit size={12} />
                                <span>Catatan</span>
                              </button>
                              <button
                                className="dash-table-del-btn"
                                onClick={() => handleDeleteOrder(o.id)}
                              >
                                <IconTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <b>Belum ada permintaan masuk</b>
                  Uji pemesanan dengan membuka katalog layanan di website.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICES CRUD */}
          {activeTab === 'services' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Katalog Layanan SNG ({services.length})</h3>
                  <span>KATALOG MARKETPLACE</span>
                </div>
                <button
                  className="dash-btn-primary"
                  onClick={openAddServiceModal}
                >
                  <IconPlus size={13} />
                  <span>Tambah Layanan Baru</span>
                </button>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Layanan di bawah ini disajikan langsung di halaman Home dan halaman Layanan. Tambah, ubah, atau hapus layanan di sini dan hasilnya langsung sinkron di frontend.
                </p>
              </div>

              <div className="dash-service-list">
                {services.map((s) => (
                  <div key={s.id || s._id} className="dash-service-card">
                    <div className="dash-service-content">
                      <div className="dash-service-title-row">
                        <span className="dash-service-icon-badge">{s.icon || '✧'}</span>
                        <strong>{s.name}</strong>
                      </div>
                      <span className="dash-service-cat-tag">Kategori: {s.category} · {s.label || s.category}</span>
                      <p className="dash-service-desc">{s.desc}</p>
                    </div>
                    <div className="dash-card-btn-actions">
                      <button className="dash-btn-secondary" onClick={() => openEditServiceModal(s)}>
                        <IconEdit size={12} />
                        <span>Edit</span>
                      </button>
                      <button className="dash-table-del-btn" onClick={() => handleDeleteService(s.id || s._id, s.name)}>
                        <IconTrash size={12} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ARTICLES CRUD */}
          {activeTab === 'articles' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Daftar Artikel & Insights ({articles.length})</h3>
                  <span>PUBLIKASI CMS</span>
                </div>
                <button
                  className="dash-btn-primary"
                  onClick={openAddArticleModal}
                >
                  <IconPlus size={13} />
                  <span>Tulis Artikel Baru</span>
                </button>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Kelola artikel edukasi strategi pemasaran digital. Artikel yang dipublikasikan di sini langsung tayang di halaman Artikel dan ringkasannya tampil di Home.
                </p>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                {articles.map((a) => (
                  <div key={a.id || a._id} className="dash-article-row">
                    <div>
                      <span className="dash-article-meta-tag">
                        {a.category} · {a.date} · {a.read}
                      </span>
                      <h4 className="dash-article-title">{a.title}</h4>
                      <p className="dash-article-excerpt">{a.excerpt}</p>
                    </div>
                    <div className="dash-card-btn-actions">
                      <button className="dash-btn-secondary" onClick={() => openEditArticleModal(a)}>
                        <IconEdit size={12} />
                        <span>Edit</span>
                      </button>
                      <button className="dash-table-del-btn" onClick={() => handleDeleteArticle(a.id || a._id, a.title)}>
                        <IconTrash size={12} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BEHIND THE SNG (TEAM) */}
          {activeTab === 'team' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Behind The SNG — Manajemen Tim ({team.length} Anggota)</h3>
                  <span>TIM AGSI & EXPERT</span>
                </div>
                <button className="dash-btn-primary" onClick={openCreateTeamModal}>
                  <IconPlus size={13} />
                  <span>Tambah Anggota Tim</span>
                </button>
              </div>

              {/* Master toggle card */}
              <div className="dash-team-toggle-bar">
                <div className="team-toggle-left">
                  <div className="toggle-indicator-dot" style={{ background: settings.isTeamSectionActive !== false ? '#4ade80' : '#f87171' }}></div>
                  <div>
                    <strong>Status Section "Behind the SNG":</strong>
                    <span className="toggle-status-text">
                      {settings.isTeamSectionActive !== false ? 'AKTIF (Tampil di Home & About)' : 'NONAKTIF (Disembunyikan)'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`dash-btn-secondary ${settings.isTeamSectionActive !== false ? 'btn-warn' : 'btn-accent'}`}
                  onClick={handleToggleTeamSection}
                >
                  {settings.isTeamSectionActive !== false ? 'Nonaktifkan Section' : 'Aktifkan Section'}
                </button>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Kelola anggota tim Behind the SNG. Setiap perubahan foto, posisi, daftar keahlian, dan portofolio langsung sinkron di halaman Home dan About.
                </p>
              </div>

              {team && team.length > 0 ? (
                <div className="admin-team-grid">
                  {team.map((member, idx) => (
                    <div key={member.id || idx} className="admin-team-card">
                      <div className="admin-team-card-top">
                        <img
                          src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                          alt={member.name}
                          className="admin-team-avatar"
                        />
                        <div className="admin-team-meta">
                          <h4>{member.name}</h4>
                          <span className="admin-team-role">{member.role}</span>
                          <small className="mono">ID: {member.id}</small>
                        </div>
                      </div>

                      {member.bio && (
                        <p className="admin-team-bio">{member.bio}</p>
                      )}

                      <div className="admin-team-section-box">
                        <small className="mono">KEAHLIAN / SKILLS:</small>
                        <div className="admin-team-skills">
                          {(Array.isArray(member.skills) ? member.skills : (member.skills ? member.skills.split(',') : [])).map((s, sIdx) => (
                            <span key={sIdx} className="admin-skill-badge">
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {member.portfolio && (
                        <div className="admin-team-section-box">
                          <small className="mono">PORTOFOLIO:</small>
                          <p className="admin-team-portfolio-text">{member.portfolio}</p>
                        </div>
                      )}

                      <div className="admin-card-actions">
                        <button
                          className="dash-btn-secondary"
                          onClick={() => openEditTeamModal(member)}
                        >
                          <IconEdit size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="dash-table-del-btn"
                          onClick={() => handleDeleteTeamMember(member.id || member._id, member.name)}
                        >
                          <IconTrash size={12} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <b>Belum ada anggota tim terdaftar</b>
                  Klik tombol "+ Tambah Anggota Tim" di atas untuk menambahkan anggota tim.
                </div>
              )}
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Pesan Masuk dari Formulir Contact ({messages.length})</h3>
                  <span>INBOX KONSULTASI</span>
                </div>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Pesan pertanyaan atau permintaan diskusi dari calon klien melalui formulir kontak langsung tercatat di sini.
                </p>
              </div>

              {messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id || m._id} className="dash-message-card">
                    <div>
                      <div className="dash-msg-sender-row">
                        <strong>{m.name}</strong>
                        <span className="dash-msg-email">· {m.email} {m.business ? `(${m.business})` : ''}</span>
                      </div>
                      <p className="dash-msg-text">
                        <span style={{ color: '#be9eff', fontWeight: 600 }}>Kebutuhan: {m.need || m.subject}</span>
                        <br />
                        {m.message}
                      </p>
                      <small className="dash-msg-date">
                        {new Date(m.createdAt || m.date).toLocaleString('id-ID')}
                      </small>
                    </div>
                    <button
                      className="dash-table-del-btn"
                      onClick={() => handleDeleteMessage(m.id)}
                    >
                      <IconTrash size={12} />
                      <span>Hapus</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <b>Belum ada pesan masuk</b>
                  Pesan kontak dari calon klien akan muncul di sini.
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Pengaturan Konten Hero & Website</h3>
                  <span>KONTROL TEKS CMS</span>
                </div>
              </div>

              <div className="dash-notice-box">
                <IconShield size={16} className="notice-icon" />
                <p>
                  Ubah teks judul hero, pertanyaan panduan, nomor kontak, dan email agensi. Perubahan disimpan langsung di database MongoDB Atlas dan otomatis terupdate di seluruh halaman.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="dash-settings-form">
                <div className="form-grid">
                  <div className="field full">
                    <label>Kicker / Badge Atas Hero</label>
                    <input
                      type="text"
                      value={settingsForm.heroKicker || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroKicker: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Judul Hero Baris 1</label>
                    <input
                      type="text"
                      value={settingsForm.heroTitleLine1 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleLine1: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Judul Hero Baris 2</label>
                    <input
                      type="text"
                      value={settingsForm.heroTitleLine2 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleLine2: e.target.value })}
                    />
                  </div>

                  <div className="field full">
                    <label>Teks Sub-Judul Hero</label>
                    <textarea
                      rows={3}
                      value={settingsForm.heroQuestion || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroQuestion: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Email Kontak Resmi</label>
                    <input
                      type="email"
                      value={settingsForm.email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Nomor WhatsApp Resmi</label>
                    <input
                      type="text"
                      value={settingsForm.phone || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="field full">
                    <label>Lokasi Agensi</label>
                    <input
                      type="text"
                      value={settingsForm.location || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="dash-btn-primary">
                    <IconCheck size={14} />
                    <span>Simpan Pengaturan</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ORDER DETAIL & ADMIN NOTE */}
      {orderDetailModal && (
        <div
          className="cosmic-modal-overlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderDetailModal(null);
          }}
        >
          <div className="cosmic-auth-card" style={{ maxWidth: '600px' }}>
            <div className="cosmic-card-glow"></div>
            <div className="cosmic-modal-head">
              <div>
                <span className="cosmic-badge-kicker">SNG / ORDER DETAIL</span>
                <h2 className="cosmic-auth-title">Detail Permintaan Layanan</h2>
              </div>
              <button
                className="cosmic-modal-close-btn"
                onClick={() => setOrderDetailModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="cosmic-modal-body" style={{ color: '#e6e4f3', fontSize: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px', lineHeight: '1.7' }}>
                <p style={{ margin: 0 }}>
                  <strong>Layanan:</strong> {orderDetailModal.serviceName} ({orderDetailModal.id})<br />
                  <strong>Klien:</strong> {orderDetailModal.customer?.name} ({orderDetailModal.customer?.email})<br />
                  <strong>Bisnis:</strong> {orderDetailModal.customer?.business || '-'}<br />
                  <strong>WhatsApp:</strong> {orderDetailModal.customer?.phone || '-'}<br />
                  <strong>Anggaran:</strong> {orderDetailModal.budget}<br />
                  <strong>Status:</strong> {orderDetailModal.status}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '10px', color: '#be9eff', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--mono)' }}>
                  Brief Proyek Klien:
                </label>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', maxHeight: '140px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                  {orderDetailModal.brief}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '10px', color: '#be9eff', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--mono)' }}>
                  Catatan / Rekomendasi Admin (Dapat dilihat Klien di Client Space):
                </label>
                <textarea
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(180,140,255,0.3)', color: '#fff', fontSize: '12px', outline: 'none' }}
                  placeholder="Tuliskan catatan konsultasi, estimasi penawaran, atau langkah berikutnya..."
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="cosmic-btn-ghost"
                  onClick={() => setOrderDetailModal(null)}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="cosmic-btn-primary"
                  onClick={handleSaveAdminNote}
                >
                  <IconCheck size={13} />
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SERVICE CREATE / EDIT */}
      {serviceModal.open && (
        <div
          className="cosmic-modal-overlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setServiceModal({ ...serviceModal, open: false });
          }}
        >
          <div className="cosmic-auth-card" style={{ maxWidth: '580px' }}>
            <div className="cosmic-card-glow"></div>
            <div className="cosmic-modal-head">
              <div>
                <span className="cosmic-badge-kicker">SNG / LAYANAN CMS</span>
                <h2 className="cosmic-auth-title">
                  {serviceModal.isEdit ? 'Ubah Data Layanan' : 'Tambah Layanan Baru'}
                </h2>
              </div>
              <button
                className="cosmic-modal-close-btn"
                onClick={() => setServiceModal({ ...serviceModal, open: false })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="cosmic-auth-form">
              <div className="cosmic-form-group">
                <label>Nama Layanan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Digital Campaign & Ads"
                  value={serviceModal.data.name}
                  onChange={(e) =>
                    setServiceModal({ ...serviceModal, data: { ...serviceModal.data, name: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-row">
                <div className="cosmic-form-group">
                  <label>Kategori</label>
                  <select
                    className="table-select"
                    value={serviceModal.data.category}
                    onChange={(e) =>
                      setServiceModal({ ...serviceModal, data: { ...serviceModal.data, category: e.target.value } })
                    }
                  >
                    <option value="strategy">Strategy & Data</option>
                    <option value="content">Content & Social</option>
                    <option value="digital">Digital Channel</option>
                    <option value="integration">Integration & Ecosystem</option>
                  </select>
                </div>

                <div className="cosmic-form-group">
                  <label>Icon / Simbol</label>
                  <input
                    type="text"
                    value={serviceModal.data.icon}
                    onChange={(e) =>
                      setServiceModal({ ...serviceModal, data: { ...serviceModal.data, icon: e.target.value } })
                    }
                  />
                </div>
              </div>

              <div className="cosmic-form-group">
                <label>Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(180,140,255,0.3)', color: '#fff', fontSize: '12px' }}
                  value={serviceModal.data.desc}
                  onChange={(e) =>
                    setServiceModal({ ...serviceModal, data: { ...serviceModal.data, desc: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-actions">
                <button
                  type="button"
                  className="cosmic-btn-ghost"
                  onClick={() => setServiceModal({ ...serviceModal, open: false })}
                >
                  Batal
                </button>
                <button type="submit" className="cosmic-btn-primary">
                  <IconCheck size={13} />
                  <span>Simpan Layanan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ARTICLE CREATE / EDIT */}
      {/* BLOG WRITER STUDIO (FULL RICH BLOG EDITING & PREVIEW) */}
      <BlogWriterStudio
        isOpen={articleModal.open}
        onClose={() => setArticleModal({ ...articleModal, open: false })}
        article={articleModal.data}
        isEdit={articleModal.isEdit}
        onSave={handleSaveArticle}
      />

      {/* MODAL: TEAM MEMBER CREATE / EDIT */}
      {teamModal.open && (
        <div
          className="cosmic-modal-overlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTeamModal({ ...teamModal, open: false });
          }}
        >
          <div className="cosmic-auth-card" style={{ maxWidth: '600px' }}>
            <div className="cosmic-card-glow"></div>
            <div className="cosmic-modal-head">
              <div>
                <span className="cosmic-badge-kicker">SNG / TEAM CMS</span>
                <h2 className="cosmic-auth-title">
                  {teamModal.isEdit ? 'Ubah Data Anggota Tim' : 'Tambah Anggota Tim Baru'}
                </h2>
              </div>
              <button
                className="cosmic-modal-close-btn"
                onClick={() => setTeamModal({ ...teamModal, open: false })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="cosmic-auth-form">
              <div className="cosmic-form-row">
                <div className="cosmic-form-group">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama anggota tim"
                    value={teamModal.data.name}
                    onChange={(e) =>
                      setTeamModal({ ...teamModal, data: { ...teamModal.data, name: e.target.value } })
                    }
                  />
                </div>

                <div className="cosmic-form-group">
                  <label>Role / Posisi Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lead Creative Strategist"
                    value={teamModal.data.role}
                    onChange={(e) =>
                      setTeamModal({ ...teamModal, data: { ...teamModal.data, role: e.target.value } })
                    }
                  />
                </div>
              </div>

              <div className="cosmic-form-group">
                <label>URL Foto Profil</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={teamModal.data.photo}
                  onChange={(e) =>
                    setTeamModal({ ...teamModal, data: { ...teamModal.data, photo: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-group">
                <label>Keahlian / Skills (Pisahkan dengan tanda koma)</label>
                <input
                  type="text"
                  placeholder="Contoh: SEO, Google Analytics, Copywriting"
                  value={teamModal.data.skills}
                  onChange={(e) =>
                    setTeamModal({ ...teamModal, data: { ...teamModal.data, skills: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-group">
                <label>Deskripsi Singkat / Bio</label>
                <textarea
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(180,140,255,0.3)', color: '#fff', fontSize: '12px' }}
                  placeholder="Fokus dan keunggulan kerja..."
                  value={teamModal.data.bio}
                  onChange={(e) =>
                    setTeamModal({ ...teamModal, data: { ...teamModal.data, bio: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-group">
                <label>Portofolio / Pengalaman Kunci</label>
                <input
                  type="text"
                  placeholder="Contoh: Menangani 50+ UMKM di Makassar"
                  value={teamModal.data.portfolio}
                  onChange={(e) =>
                    setTeamModal({ ...teamModal, data: { ...teamModal.data, portfolio: e.target.value } })
                  }
                />
              </div>

              <div className="cosmic-form-actions">
                <button
                  type="button"
                  className="cosmic-btn-ghost"
                  onClick={() => setTeamModal({ ...teamModal, open: false })}
                >
                  Batal
                </button>
                <button type="submit" className="cosmic-btn-primary">
                  <IconCheck size={13} />
                  <span>Simpan Data Tim</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
