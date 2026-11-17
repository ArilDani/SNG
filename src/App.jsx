import React, { useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function TopProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      barRef.current.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="top-progress" id="topProgress" ref={barRef}></div>;
}

function MainContent() {
  const { route, services, articles } = useApp();

  useEffect(() => {
    // Scroll to top immediately when route changes so new page starts clean
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Set up continuous repeating IntersectionObserver for scroll & section animations
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      const sections = document.querySelectorAll('section, .section, .closing, .intro-strip, .principles');

      if (!('IntersectionObserver' in window)) {
        reveals.forEach((e) => e.classList.add('visible'));
        sections.forEach((s) => s.classList.add('section-in-view'));
        return;
      }

      // Continuous reveal observer: adds 'visible' on enter, removes on exit
      // Re-triggers animations repeatedly whenever scrolling up and down without refresh
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.remove('visible');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      reveals.forEach((el) => revealObserver.observe(el));

      // Continuous section observer: adds 'section-in-view' when scrolling into each section
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('section-in-view');
            } else {
              entry.target.classList.remove('section-in-view');
            }
          });
        },
        { threshold: 0.12 }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));

      return () => {
        reveals.forEach((el) => revealObserver.unobserve(el));
        sections.forEach((sec) => sectionObserver.unobserve(sec));
        revealObserver.disconnect();
        sectionObserver.disconnect();
      };
    }, 60);

    return () => clearTimeout(timer);
  }, [route, services, articles]);

  return (
    <main>
      {route === 'home' && <HomePage />}
      {route === 'about' && <AboutPage />}
      {route === 'services' && <ServicesPage />}
      {route === 'articles' && <ArticlesPage />}
      {route === 'article-detail' && <ArticleDetailPage />}
      {route === 'contact' && <ContactPage />}
      {route === 'user-dashboard' && <UserDashboardPage />}
      {route === 'admin-dashboard' && <AdminDashboardPage />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="sng-app">
        <TopProgress />
        <Navbar />
        <MainContent />
        <Footer />
        <OrderModal />
        <AuthModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
