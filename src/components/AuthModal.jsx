import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, updateUser, showToast, navigateTo, user } = useApp();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user'
  });

  useEffect(() => {
    if (!isAuthModalOpen) return;

    document.body.classList.add('modal-open');
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAuthModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // 1-Click Login as Admin Demo
  const handleLoginAdminDemo = () => {
    const adminData = {
      name: 'Admin SNG',
      email: 'admin@sngagency.id',
      role: 'admin'
    };
    updateUser(adminData);
    setIsAuthModalOpen(false);
    showToast('Berhasil masuk sebagai Admin Console Demo.');
    navigateTo('admin-dashboard');
  };

  // 1-Click Login as User / Klien Demo
  const handleLoginUserDemo = () => {
    const userData = {
      name: 'Budi Santoso (Klien Demo)',
      email: 'budi@tokoberkah.com',
      role: 'user'
    };
    updateUser(userData);
    setIsAuthModalOpen(false);
    showToast('Berhasil masuk sebagai Akun User / Klien Demo.');
    navigateTo('user-dashboard');
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast('Mohon isi nama dan email Anda.');
      return;
    }

    const userData = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role
    };

    updateUser(userData);
    setIsAuthModalOpen(false);
    showToast(`Berhasil masuk sebagai ${form.role === 'admin' ? 'Admin' : 'Klien'}.`);
    navigateTo(form.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <small>SNG / Account</small>
            <h2>Masuk ke SNG Portal</h2>
          </div>
          <button
            className="modal-close"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: '16px' }}>
            Masuk ke Client Space atau buka Admin Console untuk menguji alur pemesanan, pengelolaan layanan, artikel, pesan masuk, dan integrasi database MongoDB.
          </p>

          {/* Quick Demo Accounts Buttons */}
          <div className="demo-accounts-box">
            <small>⚡ PILIH AKUN DEMO CEPAT (1-KLIK)</small>
            <div className="demo-buttons-grid">
              <button
                type="button"
                className="btn-demo"
                onClick={handleLoginAdminDemo}
                id="btnDemoAdmin"
              >
                <strong>⚡ Admin Console Demo</strong>
                <span>admin@sngagency.id</span>
                <span style={{ fontSize: '9px', color: '#7a4de2', fontWeight: 700, marginTop: '2px' }}>
                  Akses Penuh CRUD Database ↗
                </span>
              </button>

              <button
                type="button"
                className="btn-demo"
                onClick={handleLoginUserDemo}
                id="btnDemoUser"
              >
                <strong>👤 Akun User Demo</strong>
                <span>budi@tokoberkah.com</span>
                <span style={{ fontSize: '9px', color: '#276a4d', fontWeight: 700, marginTop: '2px' }}>
                  Client Space & Pantau Order ↗
                </span>
              </button>
            </div>
          </div>

          <div className="divider-with-text">ATAU MASUK DENGAN IDENTITAS LAIN</div>

          <form id="customLoginForm" onSubmit={handleCustomSubmit}>
            <div className="field">
              <label htmlFor="authName">Nama</label>
              <input
                id="authName"
                required
                placeholder="Nama Anda"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="authEmail">Email</label>
              <input
                id="authEmail"
                type="email"
                required
                placeholder="nama@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="authRole">Masuk sebagai</label>
              <select
                id="authRole"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User / Klien (Client Space)</option>
                <option value="admin">Admin (Admin Console)</option>
              </select>
            </div>

            <p className="form-note">
              Akun demo dapat langsung digunakan tanpa kata sandi untuk pengujian frontend dan manajemen data backend MongoDB.
            </p>
          </form>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            style={{ color: '#343540', borderColor: 'rgba(20,20,30,.2)' }}
            onClick={() => setIsAuthModalOpen(false)}
          >
            Batal
          </button>
          <button type="submit" form="customLoginForm" className="btn btn-dark">
            Masuk ↗
          </button>
        </div>
      </div>
    </div>
  );
}
