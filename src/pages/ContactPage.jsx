import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';

export default function ContactPage() {
  const { settings, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    need: 'Konsultasi umum',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Mohon lengkapi Nama, Email, dan Pesan Anda.');
      return;
    }

    setLoading(true);
    try {
      await api.createMessage(formData);
      showToast('Pesan tersimpan di database. Tim SNG akan segera menghubungi Anda!');
      setFormData({
        name: '',
        email: '',
        business: '',
        need: 'Konsultasi umum',
        message: ''
      });
    } catch (err) {
      console.error('Failed to submit message:', err);
      showToast('Gagal mengirim pesan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">SNG / Contact</span>
          <h1 className="hero-fade-up">
            <span>Let's make your</span><br />
            <span className="gradient-text">next move meaningful.</span>
          </h1>
          <p>
            Ceritakan tantangan dan tujuan bisnis Anda. Kami akan membantu mengidentifikasi kebutuhan dan kemungkinan solusi yang tepat.
          </p>
        </div>
      </div>

      <div className="page-content" style={{ background: '#0d0c14' }}>
        <div className="container contact-layout">
          <div className="contact-info">
            <span className="eyebrow">Start a conversation</span>
            <h2>Setiap solusi dimulai dari percakapan.</h2>
            <p>
              Isi formulir singkat di samping. Tim SNG dapat meninjau kebutuhan Anda sebelum menentukan layanan dan ruang lingkup proyek.
            </p>
            <div className="contact-card">
              <small>LOCATION</small>
              <b>{settings.location || 'Makassar, Indonesia'}</b>
            </div>
            <div className="contact-card">
              <small>WORKING PRINCIPLE</small>
              <b>Strategy. Nexus. Growth.</b>
            </div>
          </div>

          <form className="form-panel" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="contactName">Nama</label>
                <input
                  id="contactName"
                  name="name"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="contactEmail">Email</label>
                <input
                  id="contactEmail"
                  name="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="contactBusiness">Nama bisnis</label>
                <input
                  id="contactBusiness"
                  name="business"
                  placeholder="Nama brand / usaha"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="contactNeed">Kebutuhan utama</label>
                <select
                  id="contactNeed"
                  name="need"
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                >
                  <option value="Konsultasi umum">Konsultasi umum</option>
                  <option>Social Media Management</option>
                  <option>Content & Campaign Strategy</option>
                  <option>Data & Social Media Analytics</option>
                  <option>Website & Digital Presence</option>
                  <option>Integrated Digital Marketing</option>
                </select>
              </div>

              <div className="field full">
                <label htmlFor="contactMessage">Ceritakan kebutuhan Anda</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  required
                  placeholder="Apa tantangan atau target yang ingin dicapai bisnis Anda?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
            </div>

            <button className="btn btn-dark" type="submit" disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim pesan ↗'}
            </button>
            <p className="form-note">
              Formulir ini langsung menyimpan pesan ke database MongoDB secara real-time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
