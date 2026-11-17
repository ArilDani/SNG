import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';
import sngLogo from '../assets/sng-logo-clean.png';

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
    setIsAuthModalOpen,
    services,
    refreshServices,
    articles,
    refreshArticles,
    settings,
    refreshSettings,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal states for CRUD operations
  const [orderDetailModal, setOrderDetailModal] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

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
      const [ordersRes, messagesRes] = await Promise.allSettled([
        api.getOrders(),
        api.getMessages()
      ]);
      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value || []);
      if (messagesRes.status === 'fulfilled') setMessages(messagesRes.value || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // If user is not admin, allow quick login as admin
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
                <b>Akses Admin Console</b>
                Silakan masuk sebagai admin untuk mengelola layanan, artikel, pesanan, dan pengaturan website secara realtime dengan MongoDB.
                <br />
                <button
                  className="btn btn-dark"
                  style={{ marginTop: '20px' }}
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Masuk sebagai admin ↗
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
      data: { ...svc }
    });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    const { id, name, category, icon, desc, deliverables, label } = serviceModal.data;
    if (!name || !desc) {
      showToast('Nama dan deskripsi layanan wajib diisi.');
      return;
    }

    try {
      if (serviceModal.isEdit) {
        await api.updateService(id, { name, category, icon, desc, deliverables, label });
        showToast(`Layanan ${name} berhasil diperbarui di database!`);
      } else {
        await api.createService({ id, name, category, icon, desc, deliverables, label });
        showToast(`Layanan baru ${name} berhasil ditambahkan ke database!`);
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
  // ARTICLES CRUD
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
        body: ''
      }
    });
  };

  const openEditArticleModal = (article) => {
    setArticleModal({
      open: true,
      isEdit: true,
      data: {
        ...article,
        body: Array.isArray(article.body) ? article.body.join('\n\n') : article.body
      }
    });
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    const { id, category, date, title, excerpt, read, body } = articleModal.data;
    if (!title || !excerpt) {
      showToast('Judul dan ringkasan artikel wajib diisi.');
      return;
    }

    const paragraphs = body ? body.split('\n\n').filter(Boolean) : [excerpt];

    try {
      if (articleModal.isEdit) {
        await api.updateArticle(id, { category, date, title, excerpt, read, body: paragraphs });
        showToast(`Artikel "${title}" berhasil diperbarui!`);
      } else {
        await api.createArticle({ id, category, date, title, excerpt, read, body: paragraphs });
        showToast(`Artikel baru "${title}" berhasil ditambahkan ke database!`);
      }
      await refreshArticles();
      setArticleModal({ ...articleModal, open: false });
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
        <aside className="dash-sidebar">
          <div className="brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
            <span>SNG CONTROL<small>ADMIN CONSOLE</small></span>
          </div>

          <div className="dash-label">MANAGEMENT</div>
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            ◫ &nbsp; Overview
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            ▤ &nbsp; Pesanan ({orders.length})
          </button>
          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            ◇ &nbsp; Layanan CRUD ({services.length})
          </button>
          <button
            className={activeTab === 'articles' ? 'active' : ''}
            onClick={() => setActiveTab('articles')}
          >
            ✎ &nbsp; Artikel CRUD ({articles.length})
          </button>
          <button
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            ✉ &nbsp; Pesan Masuk ({messages.length})
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            ⚙ &nbsp; Hero & Situs
          </button>

          <div className="dash-label">SYSTEM</div>
          <button onClick={() => navigateTo('home')}>
            ↗ &nbsp; Website SNG
          </button>
          <button onClick={logout}>
            ⇥ &nbsp; Keluar
          </button>
        </aside>

        <div className="dash-main">
          <div className="dash-top">
            <div>
              <h1>
                {activeTab === 'orders'
                  ? 'Kelola Pesanan'
                  : activeTab === 'services'
                  ? 'Kelola Layanan (CRUD)'
                  : activeTab === 'articles'
                  ? 'Kelola Artikel & Insight (CRUD)'
                  : activeTab === 'messages'
                  ? 'Pesan Masuk (Contact)'
                  : activeTab === 'settings'
                  ? 'Pengaturan Hero & Website'
                  : 'Overview'}
              </h1>
              <p>Kelola data secara langsung dengan MongoDB Atlas. Perubahan langsung aktif di frontend.</p>
            </div>
            <span className="tag">ADMIN CONSOLE / MONGODB ATLAS</span>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="metric-grid">
                <div className="metric">
                  <small>Total Pesanan</small>
                  <strong>{orders.length}</strong>
                  <span>Semua permintaan</span>
                </div>
                <div className="metric">
                  <small>Menunggu Review</small>
                  <strong>{orders.filter((o) => o.status === 'Menunggu Ditinjau').length}</strong>
                  <span>Perlu ditindaklanjuti</span>
                </div>
                <div className="metric">
                  <small>Layanan Aktif</small>
                  <strong>{services.length}</strong>
                  <span>Katalog SNG</span>
                </div>
                <div className="metric">
                  <small>Pesan Masuk</small>
                  <strong>{messages.length}</strong>
                  <span>Formulir Contact</span>
                </div>
              </div>

              <div className="notice">
                Semua data tersimpan secara persisten di MongoDB Atlas via driver resmi Node.js (`MongoClient`). Setiap pembaruan status atau konten akan langsung terubah di frontend tanpa reload.
              </div>

              <div className="dash-panel">
                <div className="panel-head">
                  <h3>Permintaan Layanan Terbaru</h3>
                  <button
                    className="text-link"
                    style={{ background: 'none', border: 0, color: '#6845a7' }}
                    onClick={() => setActiveTab('orders')}
                  >
                    Semua pesanan ↗
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
                              {new Date(o.createdAt).toLocaleDateString('id-ID')}
                            </td>
                            <td>
                              {o.customer?.name}
                              <br />
                              <small>{o.customer?.email}</small>
                            </td>
                            <td>
                              {o.serviceName}
                              <br />
                              <small>{o.customer?.business}</small>
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
                                className="text-link"
                                style={{ color: '#6945a4', border: 0, background: 'none' }}
                                onClick={() => {
                                  setOrderDetailModal(o);
                                  setAdminNoteInput(o.adminNote || '');
                                }}
                              >
                                Detail & Catatan
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
                    Pesanan yang dikirim melalui katalog layanan akan muncul di sini secara otomatis.
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Semua Permintaan Layanan ({orders.length})</h3>
                <span>DATABASE LIVE SYNC</span>
              </div>
              <div className="notice">
                Pilih status pada dropdown untuk memperbarui status pesanan di database. Klien yang membuka Client Space dengan email terkait akan melihat status dan catatan ini secara real-time.
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
                            {o.customer?.email}
                            <br />
                            <small>{o.customer?.phone || '-'}</small>
                          </td>
                          <td>
                            <strong>{o.serviceName}</strong>
                            <br />
                            <small>Brand: {o.customer?.business || '-'}</small>
                            <br />
                            <small>Tipe: {o.projectType}</small>
                          </td>
                          <td style={{ maxWidth: '240px' }}>
                            <small style={{ fontWeight: 'bold' }}>Budget: {o.budget}</small>
                            <p style={{ margin: '4px 0 0', fontSize: '9px', color: '#555' }}>
                              {o.brief.slice(0, 90)}
                              {o.brief.length > 90 ? '…' : ''}
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
                              <div style={{ marginTop: '5px', fontSize: '8px', color: '#6845a7' }}>
                                ✓ Catatan terisi
                              </div>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <button
                                className="btn btn-dark btn-sm"
                                onClick={() => {
                                  setOrderDetailModal(o);
                                  setAdminNoteInput(o.adminNote || '');
                                }}
                              >
                                Catatan
                              </button>
                              <button
                                className="text-link"
                                style={{ color: '#900', border: 0, background: 'none', textAlign: 'left', fontSize: '9px' }}
                                onClick={() => handleDeleteOrder(o.id)}
                              >
                                Hapus
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
                  Uji pemesanan dengan membuka halaman Layanan dan mengirim brief proyek.
                </div>
              )}
            </div>
          )}

          {/* TAB: SERVICES (FULL CRUD) */}
          {activeTab === 'services' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Daftar Layanan di Database ({services.length})</h3>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={openAddServiceModal}
                >
                  ＋ Tambah Layanan
                </button>
              </div>
              <div className="notice">
                Layanan di bawah ini disajikan langsung di halaman depan (Home) dan halaman Layanan (Marketplace). Tambah, ubah, atau hapus layanan di sini dan lihat hasilnya langsung terubah di frontend!
              </div>

              <div className="dash-service-list">
                {services.map((s) => (
                  <div key={s.id || s._id} className="dash-service">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', color: '#7a4de2' }}>{s.icon || '✧'}</span>
                        <b>{s.name}</b>
                      </div>
                      <small>Kategori: {s.category} · {s.label || s.category}</small>
                      <p style={{ margin: '6px 0 0', fontSize: '9px', color: '#555', lineHeight: '1.5' }}>
                        {s.desc.slice(0, 110)}...
                      </p>
                    </div>
                    <div className="dash-actions">
                      <button onClick={() => openEditServiceModal(s)}>Edit</button>
                      <button className="del" onClick={() => handleDeleteService(s.id, s.name)}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARTICLES (FULL CRUD) */}
          {activeTab === 'articles' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Daftar Artikel & Insights ({articles.length})</h3>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={openAddArticleModal}
                >
                  ＋ Tambah Artikel
                </button>
              </div>
              <div className="notice">
                Kelola artikel edukasi dan panduan strategi UMKM. Artikel ini langsung ditampilkan di halaman depan dan halaman Artikel.
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                {articles.map((a) => (
                  <div
                    key={a.id || a._id}
                    style={{
                      padding: '16px',
                      border: '1px solid rgba(20,20,30,.12)',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,.3)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '15px'
                    }}
                  >
                    <div>
                      <span className="eyebrow" style={{ color: '#7a4de2', fontSize: '8px' }}>
                        {a.category} · {a.date} · {a.read}
                      </span>
                      <h4 style={{ margin: '6px 0', fontSize: '14px', letterSpacing: '-0.03em' }}>
                        {a.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '10px', color: '#555', lineHeight: '1.6' }}>
                        {a.excerpt}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ color: '#2b2c36', borderColor: 'rgba(20,20,30,.2)' }}
                        onClick={() => openEditArticleModal(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-dark btn-sm"
                        style={{ background: '#9e2d2d' }}
                        onClick={() => handleDeleteArticle(a.id, a.title)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Pesan Masuk dari Halaman Contact ({messages.length})</h3>
                <span>INBOX</span>
              </div>
              <div className="notice">
                Pesan dari calon klien yang mengisi formulir di halaman Contact tersimpan langsung ke MongoDB.
              </div>

              {messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id || m._id} className="message-row">
                    <div>
                      <b>
                        {m.name}{' '}
                        <span style={{ fontWeight: 400, color: '#777' }}>
                          · {m.email} {m.business ? `(${m.business})` : ''}
                        </span>
                      </b>
                      <p>
                        <span style={{ color: '#6845a7', fontWeight: 600 }}>Kebutuhan: {m.need}</span>
                        <br />
                        {m.message}
                      </p>
                      <small className="mono" style={{ fontSize: '8px', color: '#777' }}>
                        {new Date(m.date).toLocaleString('id-ID')}
                      </small>
                    </div>
                    <button
                      className="text-link"
                      style={{ color: '#900', border: 0, background: 'none', cursor: 'pointer' }}
                      onClick={() => handleDeleteMessage(m.id)}
                    >
                      Hapus
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <b>Belum ada pesan masuk</b>
                  Pesan dari formulir Contact akan muncul di sini.
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS (SITE & HERO) */}
          {activeTab === 'settings' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Pengaturan Konten Hero & Website</h3>
                <span>SITE CMS</span>
              </div>
              <div className="notice">
                Ubah headline, deskripsi hero, lokasi, dan kontak. Perubahan disimpan di database dan langsung memperbarui tampilan Hero dan Footer website secara dinamis!
              </div>

              <form onSubmit={handleSaveSettings}>
                <div className="form-grid">
                  <div className="field full">
                    <label>Hero Kicker</label>
                    <input
                      value={settingsForm.heroKicker || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroKicker: e.target.value })}
                      placeholder="A NEW POINT OF GROWTH — SNG / 001"
                    />
                  </div>

                  <div className="field">
                    <label>Hero Title Line 1</label>
                    <input
                      value={settingsForm.heroTitleLine1 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleLine1: e.target.value })}
                      placeholder="Masih bertumbuh"
                    />
                  </div>

                  <div className="field">
                    <label>Hero Title Line 2 (Gradient Text)</label>
                    <input
                      value={settingsForm.heroTitleLine2 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleLine2: e.target.value })}
                      placeholder="dengan cara lama?"
                    />
                  </div>

                  <div className="field full">
                    <label>Hero Question / Subheading</label>
                    <textarea
                      value={settingsForm.heroQuestion || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroQuestion: e.target.value })}
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="field">
                    <label>Lokasi</label>
                    <input
                      value={settingsForm.location || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      placeholder="Makassar · Indonesia"
                    />
                  </div>

                  <div className="field">
                    <label>Email Kontak</label>
                    <input
                      value={settingsForm.email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      placeholder="halo@sngagency.id"
                    />
                  </div>

                  <div className="field">
                    <label>Telepon / WhatsApp</label>
                    <input
                      value={settingsForm.phone || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>

                  <div className="field">
                    <label>Brand Tagline</label>
                    <input
                      value={settingsForm.brandTagline || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandTagline: e.target.value })}
                      placeholder="STRATEGY. NEXUS. GROWTH."
                    />
                  </div>

                  <div className="field full">
                    <label>Visi Agensi (About Page)</label>
                    <textarea
                      value={settingsForm.aboutVision || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutVision: e.target.value })}
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button type="submit" className="btn btn-dark">
                    Simpan Pengaturan ke MongoDB ↗
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
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderDetailModal(null);
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <small>SNG / Order Detail</small>
                <h2>Detail Permintaan Layanan</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setOrderDetailModal(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>{orderDetailModal.serviceName}</strong> ({orderDetailModal.id})<br />
                Diajukan pada: {new Date(orderDetailModal.createdAt).toLocaleString('id-ID')}
              </p>
              <div style={{ background: 'rgba(255,255,255,.4)', padding: '14px', borderRadius: '6px', margin: '14px 0', fontSize: '11px', lineHeight: '1.8' }}>
                <b>Klien:</b> {orderDetailModal.customer?.name} ({orderDetailModal.customer?.email})<br />
                <b>Bisnis / Brand:</b> {orderDetailModal.customer?.business || '-'}<br />
                <b>No. WhatsApp / Telepon:</b> {orderDetailModal.customer?.phone || '-'}<br />
                <b>Jenis Kebutuhan:</b> {orderDetailModal.projectType}<br />
                <b>Anggaran:</b> {orderDetailModal.budget}<br />
                <b>Status Saat Ini:</b> <span className="status">{orderDetailModal.status}</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ font: '9px var(--mono)', textTransform: 'uppercase', color: '#636671', display: 'block', marginBottom: '6px' }}>
                  Brief Proyek Klien:
                </label>
                <div style={{ padding: '12px', background: 'white', borderRadius: '5px', fontSize: '11px', color: '#333', border: '1px solid rgba(20,20,30,.15)', maxHeight: '150px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                  {orderDetailModal.brief}
                </div>
              </div>

              <div className="field">
                <label>Catatan Admin untuk Klien (Akan Muncul di Dashboard Klien):</label>
                <textarea
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Tuliskan respon, jadwal konsultasi, atau penawaran untuk klien di sini..."
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                style={{ color: '#343540', borderColor: 'rgba(20,20,30,.2)' }}
                onClick={() => setOrderDetailModal(null)}
              >
                Tutup
              </button>
              <button className="btn btn-dark" onClick={handleSaveAdminNote}>
                Simpan Catatan ke Klien ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SERVICE CREATE / EDIT */}
      {serviceModal.open && (
        <div
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setServiceModal({ ...serviceModal, open: false });
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <small>SNG / Layanan CRUD</small>
                <h2>{serviceModal.isEdit ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setServiceModal({ ...serviceModal, open: false })}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveService}>
              <div className="modal-body">
                <div className="field">
                  <label>ID Layanan (Unik)</label>
                  <input
                    value={serviceModal.data.id}
                    readOnly={serviceModal.isEdit}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, id: e.target.value }
                      })
                    }
                    placeholder="SNG-09"
                    required
                  />
                </div>

                <div className="field">
                  <label>Nama Layanan *</label>
                  <input
                    value={serviceModal.data.name}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, name: e.target.value }
                      })
                    }
                    placeholder="Nama layanan"
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label>Kategori</label>
                    <select
                      value={serviceModal.data.category}
                      onChange={(e) =>
                        setServiceModal({
                          ...serviceModal,
                          data: { ...serviceModal.data, category: e.target.value }
                        })
                      }
                    >
                      <option value="strategy">Strategy & Data</option>
                      <option value="content">Content & Social</option>
                      <option value="digital">Digital Channel</option>
                      <option value="integration">Integration</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Simbol / Icon</label>
                    <input
                      value={serviceModal.data.icon}
                      onChange={(e) =>
                        setServiceModal({
                          ...serviceModal,
                          data: { ...serviceModal.data, icon: e.target.value }
                        })
                      }
                      placeholder="◎, ✳, ⌕, ↗, ▣, ⌘, ◉, ⌬, ✧"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Deskripsi Layanan *</label>
                  <textarea
                    value={serviceModal.data.desc}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, desc: e.target.value }
                      })
                    }
                    placeholder="Jelaskan ruang lingkup layanan..."
                    required
                    rows="3"
                  ></textarea>
                </div>

                <div className="field">
                  <label>Deliverables (Output Proyek)</label>
                  <input
                    value={serviceModal.data.deliverables || ''}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, deliverables: e.target.value }
                      })
                    }
                    placeholder="Contoh: Audit akun, kalender konten, laporan evaluasi bulanan."
                  />
                </div>

                <div className="field">
                  <label>Label Badge</label>
                  <input
                    value={serviceModal.data.label || ''}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, label: e.target.value }
                      })
                    }
                    placeholder="Social & Content"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ color: '#343540', borderColor: 'rgba(20,20,30,.2)' }}
                  onClick={() => setServiceModal({ ...serviceModal, open: false })}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-dark">
                  {serviceModal.isEdit ? 'Perbarui Layanan' : 'Simpan Layanan'} ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ARTICLE CREATE / EDIT */}
      {articleModal.open && (
        <div
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setArticleModal({ ...articleModal, open: false });
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <small>SNG / Artikel CRUD</small>
                <h2>{articleModal.isEdit ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setArticleModal({ ...articleModal, open: false })}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveArticle}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="field">
                    <label>Kategori</label>
                    <input
                      value={articleModal.data.category}
                      onChange={(e) =>
                        setArticleModal({
                          ...articleModal,
                          data: { ...articleModal.data, category: e.target.value }
                        })
                      }
                      placeholder="DIGITAL STRATEGY"
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Waktu Baca</label>
                    <input
                      value={articleModal.data.read}
                      onChange={(e) =>
                        setArticleModal({
                          ...articleModal,
                          data: { ...articleModal.data, read: e.target.value }
                        })
                      }
                      placeholder="4 MIN READ"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Judul Artikel *</label>
                  <input
                    value={articleModal.data.title}
                    onChange={(e) =>
                      setArticleModal({
                        ...articleModal,
                        data: { ...articleModal.data, title: e.target.value }
                      })
                    }
                    placeholder="Judul artikel..."
                    required
                  />
                </div>

                <div className="field">
                  <label>Ringkasan (Excerpt) *</label>
                  <textarea
                    value={articleModal.data.excerpt}
                    onChange={(e) =>
                      setArticleModal({
                        ...articleModal,
                        data: { ...articleModal.data, excerpt: e.target.value }
                      })
                    }
                    placeholder="Ringkasan singkat artikel yang tampil pada kartu preview..."
                    required
                    rows="2"
                  ></textarea>
                </div>

                <div className="field">
                  <label>Isi Lengkap Artikel (Pisahkan paragraf dengan 2 baris baru/Enter)</label>
                  <textarea
                    value={articleModal.data.body}
                    onChange={(e) =>
                      setArticleModal({
                        ...articleModal,
                        data: { ...articleModal.data, body: e.target.value }
                      })
                    }
                    placeholder="Tuliskan isi artikel lengkap di sini..."
                    rows="6"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ color: '#343540', borderColor: 'rgba(20,20,30,.2)' }}
                  onClick={() => setArticleModal({ ...articleModal, open: false })}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-dark">
                  {articleModal.isEdit ? 'Perbarui Artikel' : 'Simpan Artikel'} ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
