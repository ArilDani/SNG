import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BlackHoleCanvas from './BlackHoleCanvas';

export default function Hero() {
  const { navigateTo, settings } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroContent = document.getElementById('heroContent');
      if (y < window.innerHeight * 1.2 && heroContent) {
        heroContent.style.setProperty('--hero-shift', `${y * 0.08}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="homeHero">
      {/* 3D Black Hole Animation with Gravitational Lensing following the Cursor */}
      <BlackHoleCanvas />

      {/* Cybernetic overlay grid & cinematic vignette */}
      <div className="hero-grid" style={{ pointerEvents: 'none', zIndex: 2 }}></div>
      <div className="hero-vignette" style={{ zIndex: 2 }}></div>

      <div className="hero-content" id="heroContent" style={{ zIndex: 3 }}>
        <div className="hero-kicker">
          <i className="pulse"></i> {settings.heroKicker || 'A NEW POINT OF GROWTH — SNG / 001'}
        </div>
        <h1 className="hero-fade-up">
          <span className="hero-line hero-line-1">{settings.heroTitleLine1 || 'The Singularity'}</span>
          <span className="hero-line hero-line-2 gradient-text">{settings.heroTitleLine2 || 'of Growth.'}</span>
        </h1>
        <p className="hero-question">
          {settings.heroQuestion ||
            'Saat dunia digital terus berubah, mungkin yang dibutuhkan bisnis Anda bukan sekadar lebih banyak konten—tetapi arah yang lebih tepat.'}
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('services')}>
            Temukan solusi Anda <b>↗</b>
          </button>
          <button className="btn btn-hero-secondary" onClick={() => navigateTo('about')}>
            Kenali cara pikir SNG <b>↗</b>
          </button>
        </div>
      </div>

      <div className="container hero-foot" style={{ zIndex: 4 }}>
        <span>Strategy / Nexus / Growth</span>
        <span className="scroll-cue">
          Scroll to explore <i className="scroll-line"></i>
        </span>
        <span>{settings.location || 'Makassar · Indonesia'}</span>
      </div>
    </section>
  );
}
