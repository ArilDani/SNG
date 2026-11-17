import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const CHAPTERS = [
  { id: 'homeHero', num: '00', title: 'Singularity' },
  { id: 'principlesSection', num: '01', title: 'Principles' },
  { id: 'philosophySection', num: '02', title: 'Philosophy' },
  { id: 'approachSection', num: '03', title: 'Approach' },
  { id: 'servicesSection', num: '04', title: 'Services' },
  { id: 'ecosystemSection', num: '05', title: 'Nexus' },
  { id: 'insightsSection', num: '06', title: 'Insights' },
  { id: 'closingSection', num: '07', title: 'Closing' }
];

export default function ScrollyHUD() {
  const { route } = useApp();
  const [activeChapter, setActiveChapter] = useState('homeHero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (route !== 'home') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Find current active section
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route]);

  if (route !== 'home') return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="scrolly-hud" aria-label="Navigasi Cerita Kosmik">
      <div className="scrolly-line-bg">
        <div className="scrolly-line-fill" style={{ height: `${scrollProgress}%` }}></div>
      </div>
      <div className="scrolly-chapters">
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              className={`scrolly-node ${isActive ? 'active' : ''}`}
              onClick={() => scrollTo(ch.id)}
              aria-label={`Buka bagian ${ch.num} ${ch.title}`}
            >
              <span className="scrolly-label">{ch.title}</span>
              <span className="scrolly-num">{ch.num}</span>
              <span className="scrolly-dot"></span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

