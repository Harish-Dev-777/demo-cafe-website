import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { useAppStore } from '../context/Store';
// We rely on window.gsap loaded via CDN or assume environment availability
// Standard practice for these types of sandboxes is referencing the global or generic import
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const { menuItems } = useAppStore();

  const featuredItems = menuItems.filter(i => i.featured).slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.hero-text-reveal', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo('.hero-image', 
        { scale: 1.2, opacity: 0 }, 
        { scale: 1, opacity: 0.4, duration: 2, ease: 'power2.out' }
      );

      // Philosophy Section Parallax
      gsap.fromTo('.philosophy-text',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 70%' },
          y: 0, opacity: 1, duration: 1
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-coffee-950">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center hero-image z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/60 via-coffee-950/40 to-coffee-950 z-10" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto" ref={textRef}>
          <p className="text-gold-500 text-sm md:text-base uppercase tracking-[0.3em] mb-6 hero-text-reveal">
            Established 2024
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight hero-text-reveal">
            Where Coffee Becomes <br/> <span className="italic text-coffee-200">An Experience</span>
          </h1>
          <div className="hero-text-reveal">
            <Link 
              to={AppRoutes.MENU}
              className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-gold-500 hover:text-coffee-950 hover:border-gold-500 transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 bg-coffee-900 philosophy-section relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full overflow-hidden rounded-xl group">
            <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e7385a861?q=80&w=2070&auto=format&fit=crop" 
              alt="Pour over coffee" 
              className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="philosophy-text">
            <h3 className="text-gold-500 text-sm uppercase tracking-widest mb-4">Our Philosophy</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Brewing Perfection, <br/>Cup by Cup.</h2>
            <p className="text-coffee-300 text-lg leading-relaxed mb-8">
              We believe that coffee is more than just a beverage; it's a ritual, a moment of pause, and a catalyst for connection. 
              Our beans are ethically sourced from the finest high-altitude micro-lots, ensuring that every sip tells the story of its origin.
            </p>
            <Link to={AppRoutes.ABOUT} className="text-white border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors">Read Our Story &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-coffee-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif text-white">Signature Selections</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8" ref={featureRef}>
            {featuredItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg mb-6 relative aspect-[3/4]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">{item.name}</h3>
                <p className="text-coffee-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                <span className="text-gold-400 font-mono text-lg">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to={AppRoutes.MENU} className="inline-block px-10 py-3 border border-coffee-700 text-coffee-200 rounded-full hover:bg-gold-500 hover:text-coffee-950 hover:border-gold-500 transition-all uppercase tracking-widest text-xs">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Map Section */}
      <section className="py-24 bg-coffee-900 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif text-white mb-8">Visit Our Sanctuary</h2>
          <p className="text-coffee-300 mb-12 max-w-2xl mx-auto">
            Located in the heart of the design district. Come for the coffee, stay for the atmosphere.
          </p>
          <div className="w-full h-[400px] bg-coffee-800 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative flex items-center justify-center group">
            {/* Emulating Map */}
             <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
              alt="Map location artistic"
             />
             <div className="relative z-10 bg-coffee-950/90 p-8 rounded-lg border border-gold-500/30 backdrop-blur-md">
                <p className="text-gold-500 uppercase text-xs tracking-widest mb-2">Address</p>
                <p className="text-white text-xl font-serif mb-4">123 Artisan Avenue, NY</p>
                <Link to={AppRoutes.CONTACT} className="text-white underline decoration-gold-500 underline-offset-4">Get Directions</Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};