import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';
import { useAppStore } from '../context/Store';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 w-full z-50 transition-all duration-500 ${
    scrolled ? 'bg-coffee-950/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
  }`;

  const linkClass = (path: string) => `text-sm uppercase tracking-widest transition-colors hover:text-gold-400 ${
    location.pathname === path ? 'text-gold-500 font-semibold' : 'text-coffee-200'
  }`;

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to={AppRoutes.HOME} className="text-2xl font-serif italic font-bold text-white tracking-tighter relative z-50">
          Brew <span className="text-gold-500">&</span> Bliss
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to={AppRoutes.HOME} className={linkClass(AppRoutes.HOME)}>Home</Link>
          <Link to={AppRoutes.MENU} className={linkClass(AppRoutes.MENU)}>Menu</Link>
          <Link to={AppRoutes.ABOUT} className={linkClass(AppRoutes.ABOUT)}>Our Story</Link>
          <Link to={AppRoutes.CONTACT} className={linkClass(AppRoutes.CONTACT)}>Contact</Link>
          {user && <Link to={AppRoutes.ADMIN} className="bg-coffee-800 px-4 py-2 rounded text-xs uppercase hover:bg-gold-600 transition-colors">Admin</Link>}
          <Link to={AppRoutes.CONTACT} className="border border-gold-500 text-gold-400 px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all">
            Reserve
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden relative z-50 text-white">
           {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-coffee-950 flex flex-col items-center justify-center space-y-8 z-40 animate-fade-in">
             <Link onClick={() => setMobileOpen(false)} to={AppRoutes.HOME} className="text-3xl font-serif text-white">Home</Link>
             <Link onClick={() => setMobileOpen(false)} to={AppRoutes.MENU} className="text-3xl font-serif text-white">Menu</Link>
             <Link onClick={() => setMobileOpen(false)} to={AppRoutes.ABOUT} className="text-3xl font-serif text-white">Our Story</Link>
             <Link onClick={() => setMobileOpen(false)} to={AppRoutes.CONTACT} className="text-3xl font-serif text-white">Contact</Link>
             {user && <Link onClick={() => setMobileOpen(false)} to={AppRoutes.ADMIN} className="text-xl text-gold-500">Admin Panel</Link>}
          </div>
        )}
      </div>
    </nav>
  );
};