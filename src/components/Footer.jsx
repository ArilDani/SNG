import React from 'react';
import { useApp } from '../context/AppContext';
import sngLogo from '../assets/sng-logo-clean.png';

export default function Footer() {
  const { navigateTo, settings } = useApp();
  const currentYear = 2026;

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" onClick={() => navigateTo('home')}>
              <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
              <span>
                SNG AGENCY
                <small>{settings.brandTagline || 'STRATEGY. NEXUS. GROWTH.'}</small>
              </span>
            </div>
            <p style={{ marginTop: '16px' }}>
              Agensi digital berbasis data yang membantu UMKM tumbuh melalui strategi pemasaran yang inovatif, adaptif, dan terintegrasi.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <button onClick={() => navigateTo('about')}>About SNG</button>
            <button onClick={() => navigateTo('services')}>Layanan</button>
            <button onClick={() => navigateTo('articles')}>Artikel</button>
          </div>

          <div className="footer-col">
            <h4>Portal</h4>
            <button onClick={() => navigateTo('user-dashboard')}>Client dashboard</button>
            <button onClick={() => navigateTo('admin-dashboard')}>Admin console</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
          </div>

          <div className="footer-col">
            <h4>Location</h4>
            <p style={{ fontSize: '11px', color: '#656874', marginBottom: '8px' }}>
              {settings.location || 'Makassar, Indonesia'}
            </p>
            <button onClick={() => navigateTo('contact')} style={{ color: '#7047bd' }}>
              Start a project ↗
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} SNG Agency. All rights reserved.</span>
          <span>{settings.brandTagline || 'STRATEGY. NEXUS. GROWTH.'}</span>
        </div>
      </div>
    </footer>
  );
}
