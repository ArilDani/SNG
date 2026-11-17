import React from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

export default function ServicesPreview() {
  const { services, navigateTo, setOrderModalService } = useApp();
  const displayServices = services.slice(0, 4);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section className="services-preview section" id="servicesSection">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">04 / Services</span>
            <h2>
              <SplitText text="Solusi digital yang" speed={0.025} baseDelay={0.05} />{' '}
              <SplitText text="terhubung." speed={0.025} baseDelay={0.45} className="purple-accent-text" />
            </h2>
          </div>
          <p>
            Pilih layanan yang sesuai kebutuhan bisnis. Setiap proyek dapat dikembangkan melalui konsultasi dan penawaran khusus.
          </p>
        </div>

        <div className="service-grid" id="homeServiceGrid">
          {displayServices.map((s, idx) => (
            <article
              key={s.id || s._id}
              className={`service-card interactive-service-card reveal delay-${(idx % 3) + 1}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="service-icon">{s.icon || '✧'}</span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="service-bottom">
                <small>{s.label || 'SNG Service'}</small>
                <button
                  aria-label={`Pesan ${s.name}`}
                  onClick={() => setOrderModalService(s)}
                  className="service-order-btn"
                >
                  ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <button className="btn btn-dark" onClick={() => navigateTo('services')}>
            Jelajahi semua layanan ↗
          </button>
        </div>
      </div>
    </section>
  );
}
