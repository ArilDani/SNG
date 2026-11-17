import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0];
    return hash || 'home';
  });
  const [routeParam, setRouteParam] = useState(() => {
    const parts = window.location.hash.replace(/^#\/?/, '').split('/');
    return parts[1] || '';
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sng_user_v2');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [services, setServices] = useState([]);
  const [articles, setArticles] = useState([]);
  const [settings, setSettings] = useState({
    heroKicker: 'A NEW POINT OF GROWTH — SNG / 001',
    heroTitleLine1: 'Masih bertumbuh',
    heroTitleLine2: 'dengan cara lama?',
    heroQuestion: 'Saat dunia digital terus berubah, mungkin yang dibutuhkan bisnis Anda bukan sekadar lebih banyak konten—tetapi arah yang lebih tepat.',
    location: 'Makassar · Indonesia',
    email: 'halo@sngagency.id',
    phone: '+62 812 3456 7890',
    brandTagline: 'STRATEGY. NEXUS. GROWTH.',
    aboutVision: 'Menjadi agensi digital berbasis data yang inovatif dan adaptif dalam membantu UMKM mengembangkan bisnis melalui pemasaran digital yang terintegrasi, terukur, dan sesuai dengan kebutuhan mitra.'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [orderModalService, setOrderModalService] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  }, []);

  const navigateTo = useCallback((newRoute, param = '') => {
    const hashStr = param ? `#/${newRoute}/${param}` : `#/${newRoute}`;
    window.location.hash = hashStr;
    setRoute(newRoute);
    setRouteParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const parts = window.location.hash.replace(/^#\/?/, '').split('/');
      let r = parts[0] || 'home';
      const p = parts[1] || '';

      if (r === 'user') r = 'user-dashboard';
      if (r === 'admin') r = 'admin-dashboard';
      if (r === 'dashboard') {
        r = user?.role === 'admin' ? 'admin-dashboard' : 'user-dashboard';
      }

      setRoute(r);
      setRouteParam(p);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  // Save user to localStorage
  const updateUser = useCallback((userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('sng_user_v2', JSON.stringify(userData));
    } else {
      localStorage.removeItem('sng_user_v2');
    }
  }, []);

  const logout = useCallback(() => {
    updateUser(null);
    showToast('Anda telah keluar dari portal.');
    navigateTo('home');
  }, [updateUser, showToast, navigateTo]);

  // Fetch initial data
  const refreshServices = useCallback(async () => {
    try {
      const data = await api.getServices();
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
      }
    } catch (e) {
      console.warn('Using local fallback for services:', e);
    }
  }, []);

  const refreshArticles = useCallback(async () => {
    try {
      const data = await api.getArticles();
      if (Array.isArray(data) && data.length > 0) {
        setArticles(data);
      }
    } catch (e) {
      console.warn('Using local fallback for articles:', e);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      if (data && data.key) {
        setSettings(data);
      }
    } catch (e) {
      console.warn('Using local fallback for settings:', e);
    }
  }, []);

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true);
      await Promise.allSettled([
        refreshServices(),
        refreshArticles(),
        refreshSettings()
      ]);
      setIsLoading(false);
    }
    loadAll();
  }, [refreshServices, refreshArticles, refreshSettings]);

  return (
    <AppContext.Provider
      value={{
        route,
        routeParam,
        navigateTo,
        user,
        updateUser,
        logout,
        services,
        setServices,
        refreshServices,
        articles,
        setArticles,
        refreshArticles,
        settings,
        setSettings,
        refreshSettings,
        isLoading,
        orderModalService,
        setOrderModalService,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toastMessage,
        toastVisible,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

