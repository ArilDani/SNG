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
  IconExternal
} from './Icons';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, updateUser, showToast, navigateTo, user } = useApp();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    if (!isAuthModalOpen) {
      setErrorMessage('');
      setIsLoading(false);
      return;
    }

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

  // Submit Login
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
      setIsAuthModalOpen(false);
      showToast(`Berhasil masuk sebagai ${res.user.name}.`);
      navigateTo(res.user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Register
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
      setIsAuthModalOpen(false);
      showToast(`Selamat datang, ${res.user.name}! Akun klien Anda berhasil dibuat.`);
      navigateTo('user-dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Pendaftaran gagal. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFullPage = () => {
    setIsAuthModalOpen(false);
    navigateTo('login');
  };

  return (
    <div
      className="cosmic-modal-overlay open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      <div className="cosmic-auth-card">
        {/* Glow accent decor */}
        <div className="cosmic-card-glow"></div>

        {/* Modal Header */}
        <div className="cosmic-modal-head">
          <div className="cosmic-brand-row">
            <img src={sngLogo} alt="SNG Agency" className="cosmic-auth-logo" />
            <div>
              <span className="cosmic-badge-kicker">SNG / PORTAL AKSES</span>
              <h2 className="cosmic-auth-title">
                {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
              </h2>
            </div>
          </div>
          <button
            className="cosmic-modal-close-btn"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="cosmic-auth-tabs">
          <button
            type="button"
            className={`cosmic-auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
          >
            Masuk (Login)
          </button>
          <button
            type="button"
            className={`cosmic-auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
          >
            Daftar Baru (Register)
          </button>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="cosmic-auth-error">
            <IconShield size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <div className="cosmic-tab-content">
            <form onSubmit={handleLoginSubmit} className="cosmic-auth-form">
              <div className="cosmic-form-group">
                <label htmlFor="modalLoginEmail">Alamat Email Terdaftar</label>
                <div className="cosmic-input-wrap">
                  <span className="input-icon">
                    <IconMail size={15} />
                  </span>
                  <input
                    id="modalLoginEmail"
                    type="email"
                    required
                    placeholder="contoh: arildani60@gmail.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="cosmic-form-group">
                <div className="label-with-action">
                  <label htmlFor="modalLoginPassword">Kata Sandi</label>
                  <button
                    type="button"
                    className="btn-toggle-pwd"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <>
                        <IconEyeOff size={12} />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <IconEye size={12} />
                        <span>Tampilkan</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="cosmic-input-wrap">
                  <span className="input-icon">
                    <IconLock size={15} />
                  </span>
                  <input
                    id="modalLoginPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi akun"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="cosmic-form-actions">
                <button
                  type="button"
                  className="cosmic-btn-ghost"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cosmic-btn-primary"
                >
                  <span>{isLoading ? 'Memverifikasi...' : 'Masuk Sekarang'}</span>
                  <IconExternal size={13} />
                </button>
              </div>
            </form>

            <div className="cosmic-auth-footer-switch">
              <div style={{ marginBottom: '8px' }}>
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  className="link-switch"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                  }}
                >
                  Daftar akun klien di sini
                </button>
              </div>
              <button
                type="button"
                className="btn-open-fullscreen"
                onClick={handleOpenFullPage}
              >
                <span>Buka di Halaman Penuh</span>
                <IconExternal size={11} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTER */}
        {activeTab === 'register' && (
          <div className="cosmic-tab-content">
            <form onSubmit={handleRegisterSubmit} className="cosmic-auth-form">
              <div className="cosmic-form-group">
                <label htmlFor="modalRegName">Nama Lengkap</label>
                <div className="cosmic-input-wrap">
                  <span className="input-icon">
                    <IconUser size={15} />
                  </span>
                  <input
                    id="modalRegName"
                    type="text"
                    required
                    placeholder="Nama lengkap Anda atau brand"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="cosmic-form-group">
                <label htmlFor="modalRegEmail">Alamat Email</label>
                <div className="cosmic-input-wrap">
                  <span className="input-icon">
                    <IconMail size={15} />
                  </span>
                  <input
                    id="modalRegEmail"
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="cosmic-form-group">
                <label htmlFor="modalRegPhone">Nomor WhatsApp / HP</label>
                <div className="cosmic-input-wrap">
                  <span className="input-icon">
                    <IconPhone size={15} />
                  </span>
                  <input
                    id="modalRegPhone"
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="cosmic-form-row">
                <div className="cosmic-form-group">
                  <div className="label-with-action">
                    <label htmlFor="modalRegPassword">Kata Sandi</label>
                    <button
                      type="button"
                      className="btn-toggle-pwd"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IconEyeOff size={11} /> : <IconEye size={11} />}
                    </button>
                  </div>
                  <div className="cosmic-input-wrap">
                    <span className="input-icon">
                      <IconLock size={15} />
                    </span>
                    <input
                      id="modalRegPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min. 6 karakter"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="cosmic-form-group">
                  <div className="label-with-action">
                    <label htmlFor="modalRegConfirm">Konfirmasi</label>
                    <button
                      type="button"
                      className="btn-toggle-pwd"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <IconEyeOff size={11} /> : <IconEye size={11} />}
                    </button>
                  </div>
                  <div className="cosmic-input-wrap">
                    <span className="input-icon">
                      <IconShield size={15} />
                    </span>
                    <input
                      id="modalRegConfirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Ulangi sandi"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="cosmic-form-actions">
                <button
                  type="button"
                  className="cosmic-btn-ghost"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cosmic-btn-primary"
                >
                  <span>{isLoading ? 'Mendaftarkan...' : 'Daftar Akun Klien'}</span>
                  <IconExternal size={13} />
                </button>
              </div>
            </form>

            <div className="cosmic-auth-footer-switch">
              <div style={{ marginBottom: '8px' }}>
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  className="link-switch"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage('');
                  }}
                >
                  Masuk di sini
                </button>
              </div>
              <button
                type="button"
                className="btn-open-fullscreen"
                onClick={handleOpenFullPage}
              >
                <span>Buka di Halaman Penuh</span>
                <IconExternal size={11} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
