import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';
import sngLogo from '../assets/sng-logo-clean.png';
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconUser,
  IconPhone,
  IconShield,
  IconExternal,
  IconDatabase,
  IconCheck,
  IconGlobe
} from '../components/Icons';

export default function AuthPage({ defaultTab = 'login' }) {
  const { user, updateUser, showToast, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState(defaultTab); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    }
  }, [user, navigateTo]);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginForm.email.trim()) {
      setErrorMessage('Alamat email wajib diisi.');
      return;
    }
    if (!loginForm.password) {
      setErrorMessage('Kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.loginUser({
        email: loginForm.email.trim(),
        password: loginForm.password
      });

      updateUser(res.user);
      showToast(`Selamat datang, ${res.user.name}!`);
      navigateTo(res.user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!registerForm.name.trim()) {
      setErrorMessage('Nama lengkap wajib diisi.');
      return;
    }
    if (!registerForm.email.trim()) {
      setErrorMessage('Alamat email wajib diisi.');
      return;
    }
    if (!registerForm.password) {
      setErrorMessage('Kata sandi wajib diisi.');
      return;
    }
    if (registerForm.password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.registerUser({
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        phone: registerForm.phone.trim(),
        password: registerForm.password
      });

      updateUser(res.user);
      showToast(`Selamat datang, ${res.user.name}! Akun klien Anda berhasil dibuat.`);
      navigateTo('user-dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Pendaftaran gagal. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background ambient lighting */}
      <div className="auth-ambient-glow glow-1"></div>
      <div className="auth-ambient-glow glow-2"></div>

      <div className="auth-page-container">
        {/* Left Side: Brand & Visual Identity */}
        <div className="auth-brand-side">
          <div className="auth-brand-header" onClick={() => navigateTo('home')}>
            <img src={sngLogo} alt="SNG Agency" className="auth-logo-img" />
            <div className="auth-brand-meta">
              <span className="auth-kicker">SNG / DIGITAL AGENCY</span>
              <strong className="auth-title">SNG PORTAL</strong>
            </div>
          </div>

          <div className="auth-hero-copy">
            <span className="auth-pill-tag">
              <IconDatabase size={13} />
              <span>MONGODB ATLAS VERIFIED</span>
            </span>
            <h1 className="auth-headline">
              The Singularity <br />
              <span className="text-gradient">of Growth.</span>
            </h1>
            <p className="auth-desc">
              Portal terintegrasi untuk mengelola seluruh ekosistem pemasaran digital, analitik data, pesanan layanan, dan interaksi bisnis Anda.
            </p>
          </div>

          <div className="auth-features-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <IconCheck size={14} />
              </div>
              <div>
                <strong>Sinkronisasi Realtime MongoDB</strong>
                <p>Data akun, pesanan, dan hak akses tersimpan persisten secara langsung di cloud database.</p>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <IconShield size={14} />
              </div>
              <div>
                <strong>Akses Terstruktur & Aman</strong>
                <p>Hak akses terkelola (Klien & Administrator) dengan autentikasi kredensial terlindungi.</p>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <IconGlobe size={14} />
              </div>
              <div>
                <strong>Ekosistem Digital Terpadu</strong>
                <p>Pantau perjalanan proyek mulai dari pengajuan brief hingga eksekusi kampanye multi-kanal.</p>
              </div>
            </div>
          </div>

          <div className="auth-brand-foot">
            <span>© 2026 SNG Agency · Makassar, Indonesia</span>
            <button type="button" className="auth-back-link" onClick={() => navigateTo('home')}>
              <span>Kembali ke Website Utama</span>
              <IconExternal size={12} />
            </button>
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <div className="auth-form-side">
          <div className="auth-card-panel">
            {/* Top decorative line */}
            <div className="auth-card-top-glow"></div>

            {/* Tab Switcher */}
            <div className="auth-tab-switch">
              <button
                type="button"
                className={`auth-tab-item ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
              >
                Masuk ke Akun
              </button>
              <button
                type="button"
                className={`auth-tab-item ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                }}
              >
                Daftar Akun Baru
              </button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="auth-alert-error">
                <IconShield size={14} className="alert-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* TAB: LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="auth-form-content">
                <div className="auth-form-intro">
                  <h2>Selamat Datang Kembali</h2>
                  <p>Masukkan email dan kata sandi akun Anda untuk mengakses portal.</p>
                </div>

                <div className="auth-input-field">
                  <label htmlFor="authPageEmail">Alamat Email</label>
                  <div className="auth-input-box">
                    <span className="input-svg-icon">
                      <IconMail size={16} />
                    </span>
                    <input
                      id="authPageEmail"
                      type="email"
                      required
                      placeholder="contoh: arildani60@gmail.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="auth-input-field">
                  <div className="field-label-row">
                    <label htmlFor="authPagePassword">Kata Sandi</label>
                    <button
                      type="button"
                      className="btn-text-action"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <>
                          <IconEyeOff size={13} />
                          <span>Sembunyikan</span>
                        </>
                      ) : (
                        <>
                          <IconEye size={13} />
                          <span>Tampilkan</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="auth-input-box">
                    <span className="input-svg-icon">
                      <IconLock size={16} />
                    </span>
                    <input
                      id="authPagePassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Masukkan kata sandi akun"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="auth-btn-primary"
                >
                  <span>{isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Portal'}</span>
                  <IconExternal size={14} />
                </button>

                <div className="auth-card-footer">
                  <span>Belum memiliki akun terdaftar?</span>
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => {
                      setActiveTab('register');
                      setErrorMessage('');
                    }}
                  >
                    Daftar akun klien baru sekarang
                  </button>
                </div>
              </form>
            )}

            {/* TAB: REGISTER */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="auth-form-content">
                <div className="auth-form-intro">
                  <h2>Registrasi Akun Baru</h2>
                  <p>Daftarkan profil Anda untuk mengelola brief dan memantau pesanan layanan.</p>
                </div>

                <div className="auth-input-field">
                  <label htmlFor="authRegName">Nama Lengkap</label>
                  <div className="auth-input-box">
                    <span className="input-svg-icon">
                      <IconUser size={16} />
                    </span>
                    <input
                      id="authRegName"
                      type="text"
                      required
                      placeholder="Nama lengkap Anda atau perwakilan bisnis"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="auth-input-field">
                  <label htmlFor="authRegEmail">Alamat Email</label>
                  <div className="auth-input-box">
                    <span className="input-svg-icon">
                      <IconMail size={16} />
                    </span>
                    <input
                      id="authRegEmail"
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="auth-input-field">
                  <label htmlFor="authRegPhone">Nomor WhatsApp / Telepon</label>
                  <div className="auth-input-box">
                    <span className="input-svg-icon">
                      <IconPhone size={16} />
                    </span>
                    <input
                      id="authRegPhone"
                      type="tel"
                      placeholder="+62 812 3456 7890"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="auth-input-grid">
                  <div className="auth-input-field">
                    <div className="field-label-row">
                      <label htmlFor="authRegPassword">Kata Sandi</label>
                      <button
                        type="button"
                        className="btn-text-action"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <IconEyeOff size={12} /> : <IconEye size={12} />}
                      </button>
                    </div>
                    <div className="auth-input-box">
                      <span className="input-svg-icon">
                        <IconLock size={15} />
                      </span>
                      <input
                        id="authRegPassword"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min. 6 karakter"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="auth-input-field">
                    <div className="field-label-row">
                      <label htmlFor="authRegConfirm">Konfirmasi</label>
                      <button
                        type="button"
                        className="btn-text-action"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <IconEyeOff size={12} /> : <IconEye size={12} />}
                      </button>
                    </div>
                    <div className="auth-input-box">
                      <span className="input-svg-icon">
                        <IconShield size={15} />
                      </span>
                      <input
                        id="authRegConfirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Ulangi sandi"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="auth-btn-primary"
                >
                  <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Akun Klien'}</span>
                  <IconExternal size={14} />
                </button>

                <div className="auth-card-footer">
                  <span>Sudah memiliki akun?</span>
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => {
                      setActiveTab('login');
                      setErrorMessage('');
                    }}
                  >
                    Masuk di sini
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

