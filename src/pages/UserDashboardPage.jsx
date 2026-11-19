import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';
import sngLogo from '../assets/sng-logo-clean.png';
import {
  IconOverview,
  IconOrders,
  IconUser,
  IconExternal,
  IconLogout,
  IconPlus,
  IconGlobe,
  IconCheck,
  IconShield
} from '../components/Icons';

export default function UserDashboardPage() {
  const { user, logout, navigateTo, updateUser, showToast } = useApp();
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
            <button className="active">
              <IconOverview size={15} />
              <span>Ringkasan</span>
            </button>
            <div className="dash-label">NAVIGATION</div>
            <button onClick={() => navigateTo('home')}>
              <IconGlobe size={15} />
              <span>Website SNG</span>
            </button>
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
                Login sebagai klien untuk melihat riwayat pesanan dan status konsultasi Anda.
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <button className="dash-btn-primary" onClick={() => navigateTo('login')}>
                    <span>Masuk ke Akun Klien</span>
                    <IconExternal size={13} />
                  </button>
                  <button className="dash-btn-secondary" onClick={() => navigateTo('register')}>
                    <span>Daftar Akun Baru</span>
                    <IconPlus size={13} />
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
            <IconOverview size={15} />
            <span>Ringkasan</span>
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            <IconOrders size={15} />
            <span>Pesanan Saya</span>
            <span className="dash-count-badge">{orders.length}</span>
          </button>
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <IconUser size={15} />
            <span>Profil Akun</span>
          </button>

          <div className="dash-label">NAVIGATION</div>
          <button onClick={() => navigateTo('services')}>
            <IconPlus size={15} />
            <span>Pesan Layanan</span>
          </button>
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

        <div className="dash-main">
          <div className="dash-top">
            <div>
              <div className="dash-breadcrumb">
                <span className="dash-breadcrumb-root">CLIENT SPACE</span>
                <span className="dash-breadcrumb-separator">/</span>
                <span className="dash-breadcrumb-active">
                  {activeTab === 'orders' ? 'PESANAN SAYA' : activeTab === 'profile' ? 'PROFIL' : 'RINGKASAN'}
                </span>
              </div>
              <h1 id="userDashTitle">
                {activeTab === 'orders' ? 'Pesanan Saya' : activeTab === 'profile' ? 'Profil Akun' : 'Ringkasan Client Space'}
              </h1>
              <p id="userWelcome">
                Halo, {user.name}. Pantau permintaan layanan dan progres proyek Anda di sini.
              </p>
            </div>
            <div className="dash-top-actions">
              <div className="dash-user-profile-card">
                <div className="user-avatar-initials client-avatar">
                  {(user?.name || 'K').charAt(0).toUpperCase()}
                </div>
                <div className="user-profile-info">
                  <strong className="user-profile-name">{user?.name}</strong>
                  <span className="user-profile-role-tag client-tag">
                    <IconUser size={10} />
                    <span>KLIEN SNG</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Informasi Akun Klien</h3>
                  <span>CLIENT PROFILE</span>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '14px', maxWidth: '500px' }}>
                <div className="field">
                  <label>Nama Lengkap</label>
                  <input readOnly value={user.name || ''} />
                </div>
                <div className="field">
                  <label>Alamat Email</label>
                  <input readOnly value={user.email || ''} />
                </div>
                <div className="field">
                  <label>Nomor WhatsApp</label>
                  <input readOnly value={user.phone || '-'} />
                </div>
                <div className="field">
                  <label>Status Peran (Role)</label>
                  <input readOnly value="User / Klien (Akses Client Space)" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              <div className="metric-grid">
                <div className="metric">
                  <div className="metric-header-row">
                    <small>Total Permintaan</small>
                    <IconOrders size={16} />
                  </div>
                  <strong>{orders.length}</strong>
                  <span>Brief yang diajukan</span>
                </div>

                <div className="metric">
                  <div className="metric-header-row">
                    <small>Dalam Proses / Review</small>
                    <IconShield size={16} style={{ color: '#ffb347' }} />
                  </div>
                  <strong style={{ color: '#ffb347' }}>{pendingCount}</strong>
                  <span>Menunggu / dikerjakan</span>
                </div>

                <div className="metric">
                  <div className="metric-header-row">
                    <small>Selesai</small>
                    <IconCheck size={16} style={{ color: '#4ade80' }} />
                  </div>
                  <strong style={{ color: '#4ade80' }}>{doneCount}</strong>
                  <span>Layanan tuntas</span>
                </div>
              </div>

              <div className="dash-panel">
                <div className="panel-head">
                  <div>
                    <h3>Pesanan Aktif Terbaru</h3>
                    <span>STATUS PROYEK</span>
                  </div>
                  <button
                    className="dash-link-action"
                    onClick={() => setActiveTab('orders')}
                  >
                    <span>Semua Pesanan</span>
                    <IconExternal size={12} />
                  </button>
                </div>

                {orders.length > 0 ? (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {orders.slice(0, 3).map((o) => (
                      <div key={o.id || o._id} className="dash-client-order-card">
                        <div className="dash-client-order-top">
                          <div>
                            <h4>{o.serviceName}</h4>
                            <span className="order-id-meta">ID: {o.id} · {new Date(o.createdAt).toLocaleDateString('id-ID')}</span>
                          </div>
                          <span className={`status ${getStatusClass(o.status)}`}>
                            {o.status}
                          </span>
                        </div>
                        {o.adminNote && (
                          <div className="client-admin-note-box">
                            <strong>Catatan dari Tim SNG:</strong>
                            <p>{o.adminNote}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <b>Belum ada pesanan aktif</b>
                    Jelajahi layanan kami dan ajukan brief konsultasi Anda.
                    <br />
                    <button
                      className="dash-btn-primary"
                      style={{ marginTop: '16px' }}
                      onClick={() => navigateTo('services')}
                    >
                      <IconPlus size={13} />
                      <span>Eksplorasi Layanan</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="dash-panel">
              <div className="panel-head">
                <div>
                  <h3>Semua Pesanan Layanan Anda ({orders.length})</h3>
                  <span>RIWAYAT KONSULTASI</span>
                </div>
              </div>

              {orders.length > 0 ? (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {orders.map((o) => (
                    <div key={o.id || o._id} className="dash-client-order-card">
                      <div className="dash-client-order-top">
                        <div>
                          <h4>{o.serviceName}</h4>
                          <span className="order-id-meta">
                            ID: {o.id} · Diajukan pada {new Date(o.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <span className={`status ${getStatusClass(o.status)}`}>
                          {o.status}
                        </span>
                      </div>

                      <div className="client-order-details-grid">
                        <div>
                          <small>BISNIS / BRAND:</small>
                          <p>{o.customer?.business || '-'}</p>
                        </div>
                        <div>
                          <small>ESTIMASI ANGGARAN:</small>
                          <p>{o.budget || '-'}</p>
                        </div>
                        <div>
                          <small>TIPE KEBUTUHAN:</small>
                          <p>{o.projectType || '-'}</p>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <small style={{ color: '#8d89a4', fontSize: '9px', fontFamily: 'var(--mono)' }}>RINGKASAN BRIEF:</small>
                        <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#cac5df', lineHeight: '1.6' }}>{o.brief}</p>
                      </div>

                      {o.adminNote && (
                        <div className="client-admin-note-box">
                          <strong>Catatan & Tindak Lanjut dari Tim SNG:</strong>
                          <p>{o.adminNote}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <b>Belum ada pesanan</b>
                  Silakan kirim brief konsultasi dari katalog layanan.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
