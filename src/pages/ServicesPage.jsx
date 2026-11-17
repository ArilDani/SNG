import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ServicesPage() {
  const { services, setOrderModalService } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((s) => {
    const matchesFilter = activeFilter === 'all' || s.category === activeFilter;
    const searchTarget = `${s.name} ${s.desc} ${s.label || ''}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">SNG / Service marketplace</span>
          <h1 className="hero-fade-up">
            <span>Find the right</span><br />
            <span className="gradient-text">solution for your business.</span>
          </h1>
          <p>
            Jelajahi layanan SNG Agency, pilih kebutuhan bisnis, lalu kirim permintaan pemesanan. Tim SNG akan meninjau brief dan menyiapkan konsultasi serta penawaran yang sesuai.
          </p>
        </div>
      </div>

      <div className="page-content silver-section">
        <div className="container">
          <div className="catalog-toolbar">
            <div className="catalog-filter" id="serviceFilters">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Semua layanan
              </button>
              <button
                className={`filter-btn ${activeFilter === 'strategy' ? 'active' : ''}`}
                onClick={() => setActiveFilter('strategy')}
              >
                Strategy & Data
              </button>
              <button
                className={`filter-btn ${activeFilter === 'content' ? 'active' : ''}`}
                onClick={() => setActiveFilter('content')}
              >
                Content & Social
              </button>
              <button
                className={`filter-btn ${activeFilter === 'digital' ? 'active' : ''}`}
                onClick={() => setActiveFilter('digital')}
              >
                Digital Channel
              </button>
              <button
                className={`filter-btn ${activeFilter === 'integration' ? 'active' : ''}`}
                onClick={() => setActiveFilter('integration')}
              >
                Integration
              </button>
            </div>

            <input
              className="search-field"
              id="serviceSearch"
              type="search"
              placeholder="Cari layanan..."
              aria-label="Cari layanan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="catalog-grid" id="catalogGrid">
            {filteredServices.length > 0 ? (
              filteredServices.map((s) => (
                <article key={s.id || s._id} className="catalog-card">
                  <span className="service-icon">{s.icon || '✧'}</span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="catalog-foot">
                    <span className="catalog-price">Penawaran khusus</span>
                    <button
                      className="btn btn-dark"
                      onClick={() => setOrderModalService(s)}
                    >
                      Pesan layanan ↗
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <b>Layanan tidak ditemukan</b>
                Coba kata kunci atau kategori yang lain.
              </div>
            )}
          </div>

          <p className="form-note">
            Harga tidak ditampilkan sebagai angka tetap karena ruang lingkup setiap proyek disesuaikan dengan kondisi, target, dan kebutuhan mitra. Pemesanan di website ini merupakan permintaan konsultasi/penawaran, bukan pembayaran otomatis.
          </p>
        </div>
      </div>
    </div>
  );
}
