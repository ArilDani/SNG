import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';
import sngLogo from '../assets/sng-logo-clean.png';

export default function UserDashboardPage() {
  const { user, logout, navigateTo, setIsAuthModalOpen, updateUser, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = useCallback(async () => {
    if (!user?.email) return;
    try {
      const data = await api.getOrders(user.email);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch user orders:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const handleLoginUserDemo = () => {
    updateUser({
      name: 'Budi Santoso (Klien Demo)',
      email: 'budi@tokoberkah.com',
      role: 'user'
    });
    showToast('Berhasil masuk sebagai Akun Klien Demo.');
  };

  const handleLoginAdminDemo = () => {
    updateUser({
      name: 'Admin SNG',
      email: 'admin@sngagency.id',
      role: 'admin'
    });
    showToast('Berhasil masuk sebagai Admin Console.');
    navigateTo('admin-dashboard');
  };

  if (!user) {
    return (
      <div className="app-page active">
        <div className="dashboard-shell">
          <aside className="dash-sidebar">
            <div className="brand" onClick={() => navigateTo('home')}>
              <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
              <span>SNG PORTAL<small>CLIENT SPACE</small></span>
            </div>
            <div className="dash-label">WORKSPACE</div>
            <button className="active">◫ &nbsp; Ringkasan</button>
            <div className="dash-label">NAVIGATION</div>
            <button onClick={() => navigateTo('home')}>↗ &nbsp; Website SNG</button>
          </aside>
          <div className="dash-main">
            <div className="dash-top">
              <div>
                <h1>Client Space</h1>
                <p>Silakan masuk untuk melihat dan mengelola pesanan Anda.</p>
              </div>
              <span className="tag">CLIENT PORTAL / 01</span>
            </div>
            <div className="dash-panel">
              <div className="empty-state">
                <b>Masuk untuk melihat Client Space</b>
                Login sebagai user untuk melihat pesanan dan profil Anda.
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <button className="btn btn-dark" onClick={handleLoginUserDemo}>
                    👤 Masuk dengan Akun Klien Demo ↗
                  </button>
                  <button className="btn btn-outline" style={{ color: '#171821', borderColor: 'rgba(20,20,30,.25)' }} onClick={handleLoginAdminDemo}>
                    ⚡ Buka Admin Demo ↗
                  </button>
                  <button className="btn btn-outline" style={{ color: '#171821', borderColor: 'rgba(20,20,30,.25)' }} onClick={() => setIsAuthModalOpen(true)}>
                    Pilihan Lain ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusClass = (status) => {
    if (status === 'Selesai') return 'done';
    if (status === 'Ditolak') return 'rejected';
    if (['Disetujui', 'Sedang Dikerjakan', 'Penawaran Dikirim', 'Dalam Peninjauan'].includes(status)) return 'progress';
    return '';
  };

  const pendingCount = orders.filter((o) => !['Selesai', 'Ditolak'].includes(o.status)).length;
  const doneCount = orders.filter((o) => o.status === 'Selesai').length;

  return (
    <div className="app-page active">
      <div className="dashboard-shell">
        <aside className="dash-sidebar">
          <div className="brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
            <span>SNG PORTAL<small>CLIENT SPACE</small></span>
          </div>

          <div className="dash-label">WORKSPACE</div>
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            ◫ &nbsp; Ringkasan
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            ▤ &nbsp; Pesanan saya
          </button>
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            ◉ &nbsp; Profil
          </button>

          <div className="dash-label">NAVIGATION</div>
          <button onClick={() => navigateTo('services')}>
            ＋ &nbsp; Pesan layanan
          </button>
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
              <h1 id="userDashTitle">
                {activeTab === 'orders' ? 'Pesanan saya' : activeTab === 'profile' ? 'Profil' : 'Ringkasan'}
              </h1>
              <p id="userWelcome">
                Halo, {user.name}. Pantau permintaan layanan dan progres proyek Anda di sini.
              </p>
            </div>
            <span className="tag">CLIENT PORTAL / 01</span>
          </div>

          {activeTab === 'profile' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Informasi akun</h3>
                <span>CLIENT PROFILE</span>
              </div>
              <div className="field">
                <label>Nama</label>
                <input readOnly value={user.name} />
              </div>
              <div className="field">
                <label>Email</label>
                <input readOnly value={user.email} />
              </div>
              <p className="form-note">
                Profil tersimpan pada database MongoDB Atlas dan terintegrasi dengan Client Portal SNG.
              </p>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="dash-panel">
              <div className="panel-head">
                <h3>Semua pesanan Anda</h3>
                <span>{orders.length} RECORDS</span>
              </div>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <article key={o.id || o._id} className="order-card">
                    <div className="order-card-top">
                      <div>
                        <h3>{o.serviceName}</h3>
                        <p>{o.id} · {new Date(o.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                      <span className={`status ${getStatusClass(o.status)}`}>{o.status}</span>
                    </div>
                    <div className="order-card-meta">
                      <span>BUSINESS · {o.customer?.business || '-'}</span>
                      <span>TYPE · {o.projectType}</span>
                      <span>BUDGET · {o.budget}</span>
                    </div>
                    {o.adminNote && (
                      <p style={{ marginTop: '12px' }}>
                        <b>Catatan SNG:</b> {o.adminNote}
                      </p>
                    )}
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <b>Belum ada pesanan</b>
                  Pesanan layanan yang Anda kirim akan muncul di sini.
                  <br />
                  <button
                    className="btn btn-dark"
                    style={{ marginTop: '15px' }}
                    onClick={() => navigateTo('services')}
                  >
                    Jelajahi layanan ↗
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              <div className="metric-grid">
                <div className="metric">
                  <small>Total permintaan</small>
                  <strong>{orders.length}</strong>
                  <span>Seluruh pesanan Anda</span>
                </div>
                <div className="metric">
                  <small>Diproses</small>
                  <strong>{pendingCount}</strong>
                  <span>Menunggu / berjalan</span>
                </div>
                <div className="metric">
                  <small>Selesai</small>
                  <strong>{doneCount}</strong>
                  <span>Proyek selesai</span>
                </div>
                <div className="metric">
                  <small>Account</small>
                  <strong>01</strong>
                  <span>Client portal</span>
                </div>
              </div>

              <div className="notice">
                Informasi status akan diperbarui oleh tim SNG setelah permintaan ditinjau dan tersimpan di database MongoDB Atlas.
              </div>

              <div className="dash-panel">
                <div className="panel-head">
                  <h3>Aktivitas terbaru</h3>
                  <span>RECENT ORDERS</span>
                </div>
                {orders.length > 0 ? (
                  orders.slice(0, 3).map((o) => (
                    <article key={o.id || o._id} className="order-card">
                      <div className="order-card-top">
                        <div>
                          <h3>{o.serviceName}</h3>
                          <p>{o.id} · {new Date(o.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                        <span className={`status ${getStatusClass(o.status)}`}>{o.status}</span>
                      </div>
                      <div className="order-card-meta">
                        <span>BUSINESS · {o.customer?.business || '-'}</span>
                        <span>TYPE · {o.projectType}</span>
                        <span>BUDGET · {o.budget}</span>
                      </div>
                      {o.adminNote && (
                        <p style={{ marginTop: '12px' }}>
                          <b>Catatan SNG:</b> {o.adminNote}
                        </p>
                      )}
                    </article>
                  ))
                ) : (
                  <div className="empty-state">
                    <b>Belum ada aktivitas</b>
                    Mulai dengan memilih layanan yang sesuai kebutuhan bisnis Anda.
                    <br />
                    <button
                      className="btn btn-dark"
                      style={{ marginTop: '15px' }}
                      onClick={() => navigateTo('services')}
                    >
                      Pilih layanan ↗
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
