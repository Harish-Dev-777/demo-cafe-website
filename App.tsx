import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { AppProvider, useAppStore } from './context/Store';
import { AppRoutes } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AdminLoginOverlay = () => {
  // Simple overlay to simulate login for demo purposes since we don't have real auth backend
  const { user, login } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Ctrl + Shift + L to toggle admin login
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            setIsOpen(prev => !prev);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (user || !isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center">
          <div className="bg-coffee-900 p-8 rounded border border-gold-500/30 text-center">
              <h3 className="text-white font-serif mb-4">Admin Simulation</h3>
              <button onClick={() => { login('admin@brew.com'); setIsOpen(false); }} className="bg-gold-500 px-6 py-2 rounded font-bold">Login as Admin</button>
              <button onClick={() => setIsOpen(false)} className="block mt-4 text-coffee-400 text-sm w-full">Cancel</button>
          </div>
      </div>
  )
}

const AppContent = () => {
    return (
      <div className="min-h-screen bg-coffee-950 text-white font-sans selection:bg-gold-500 selection:text-black">
        <Router>
          <ScrollToTop />
          <Navbar />
          <AdminLoginOverlay />
          <Routes>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.MENU} element={<Menu />} />
            <Route path={AppRoutes.CONTACT} element={<Contact />} />
            <Route path={AppRoutes.ABOUT} element={<About />} />
            <Route path={AppRoutes.ADMIN} element={<Admin />} />
          </Routes>
          
          {/* Footer */}
          <footer className="bg-coffee-950 py-12 border-t border-white/5 text-center">
             <p className="text-coffee-500 text-sm">© 2024 Brew & Bliss. Crafted with React & Tailwind.</p>
             <p className="text-coffee-700 text-xs mt-2">Press Ctrl+Shift+L to toggle Admin Login Simulation</p>
          </footer>
        </Router>
      </div>
    );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;