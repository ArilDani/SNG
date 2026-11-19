import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import sngLogo from '../assets/sng-logo-clean.png';

export default function Navbar() {
  const { route, navigateTo, user, setIsAuthModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolledPastTop, setScrolledPastTop] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Detect if user has scrolled down into sections
        if (currentScrollY > 75) {
          setScrolledPastTop(true);
          // While actively scrolling, morph into the centered logo-only pill
          setIsScrolling(true);

          // Reset the scroll stop detection timer
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // When scrolling stops for 3 seconds (3000ms), morph back into full floating navigation bar
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 3000);
        } else if (currentScrollY <= 25) {
          // At the very top: always full navigation
          setScrolledPastTop(false);
          setIsScrolling(false);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleAccountClick = () => {
    if (user) {
      navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    } else {
      navigateTo('login');
    }
  };

  const handleNav = (targetRoute) => {
    navigateTo(targetRoute);
    setMobileMenuOpen(false);
  };

  // When collapsed: clicking the logo immediately expands back to full navigation
  // When expanded: clicking the logo navigates to home (and scrolls smoothly to top if already past top)
  const handleLogoClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (isCollapsed) {
      // Cancel the 3-second timer and immediately expand the navigation bar
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      setIsScrolling(false);
      return;
    }

    if (scrolledPastTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    handleNav('home');
  };

  const isCollapsed = scrolledPastTop && isScrolling;

  return (
    <header className="header-floating-wrapper">
      <div
        className={`floating-nav-pill ${isCollapsed ? 'collapsed-logo-only' : ''} ${scrolledPastTop ? 'nav-scrolled' : ''}`}
        aria-label="Navigasi SNG Agency"
        onClick={isCollapsed ? handleLogoClick : undefined}
      >
        {/* Brand Logo & Title */}
        <div
          className="brand"
          onClick={handleLogoClick}
          title={isCollapsed ? "Klik untuk langsung menampilkan navigasi" : "SNG Agency"}
        >
          <img src={sngLogo} alt="SNG Agency" className="brand-logo-img" />
          <span className="brand-text">
            SNG AGENCY
            <small>STRATEGY. NEXUS. GROWTH.</small>
          </span>
        </div>

        {/* Center Nav Links */}
        <nav
          className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Navigasi utama"
        >
          <button
            className={route === 'home' ? 'active' : ''}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={route === 'about' ? 'active' : ''}
            onClick={() => handleNav('about')}
          >
            About
          </button>
          <button
            className={route === 'services' ? 'active' : ''}
            onClick={() => handleNav('services')}
          >
            Layanan
          </button>
          <button
            className={route === 'articles' || route === 'article-detail' ? 'active' : ''}
            onClick={() => handleNav('articles')}
          >
            Artikel
          </button>
          <button
            className={route === 'contact' ? 'active' : ''}
            onClick={() => handleNav('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right Nav Actions */}
        <div className="nav-actions">
          <button className="account-btn" onClick={handleAccountClick}>
            {user
              ? user.role === 'admin'
                ? 'Admin Console ↗'
                : 'Client Space ↗'
              : 'Masuk / Dashboard ↗'}
          </button>
          <button className="nav-order" onClick={() => handleNav('services')}>
            Mulai proyek ↗
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
