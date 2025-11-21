import React, { useState } from 'react';
import { useAppStore } from '../context/Store';
import { motion, AnimatePresence } from 'framer-motion'; // Adding framer motion for filter animations if environment allows, otherwise simplified

export const Menu = () => {
  const { menuItems } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'coffee' | 'bakery' | 'specials'>('all');

  const filteredItems = filter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  const categories = ['all', 'coffee', 'bakery', 'specials'];

  return (
    <div className="min-h-screen bg-coffee-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our Menu</h1>
          <p className="text-coffee-300 max-w-xl mx-auto">
            Curated selections prepared with passion.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-full uppercase text-xs tracking-widest transition-all duration-300 ${
                filter === cat 
                  ? 'bg-gold-500 text-coffee-950' 
                  : 'border border-coffee-800 text-coffee-400 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex items-start gap-6 animate-fade-in">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-coffee-900">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 border-b border-coffee-800 pb-6 group-hover:border-gold-500/30 transition-colors">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold-400 transition-colors">{item.name}</h3>
                  <span className="text-gold-500 font-mono">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-coffee-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-coffee-500">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};