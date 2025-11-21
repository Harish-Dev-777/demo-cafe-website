import React, { useState } from 'react';
import { useAppStore } from '../context/Store';
import { generateMenuDescription } from '../services/gemini';
import { MenuItem } from '../types';

export const Admin = () => {
  const { user, menuItems, addMenuItem, deleteMenuItem, messages } = useAppStore();
  const [activeTab, setActiveTab] = useState<'menu' | 'messages'>('menu');
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MenuItem['category']>('coffee');
  const [ingredients, setIngredients] = useState(''); // Used for AI generation
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-coffee-950 flex items-center justify-center">
        <div className="text-white">Access Denied. Please Login.</div>
      </div>
    );
  }

  const handleGenerateAI = async () => {
    if (!name || !ingredients) {
      alert("Please enter a name and ingredients/notes to generate a description.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateMenuDescription(name, ingredients);
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      description,
      image: 'https://picsum.photos/600/800?random=' + Math.floor(Math.random() * 100),
      featured: false
    };
    addMenuItem(newItem);
    // Reset
    setName('');
    setPrice('');
    setDescription('');
    setIngredients('');
  };

  return (
    <div className="min-h-screen bg-coffee-900 pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif text-white">Dashboard</h1>
            <div className="space-x-4">
                <button 
                    onClick={() => setActiveTab('menu')}
                    className={`px-4 py-2 rounded text-sm ${activeTab === 'menu' ? 'bg-gold-500 text-black' : 'text-coffee-300 hover:text-white'}`}
                >
                    Menu Items
                </button>
                <button 
                    onClick={() => setActiveTab('messages')}
                    className={`px-4 py-2 rounded text-sm ${activeTab === 'messages' ? 'bg-gold-500 text-black' : 'text-coffee-300 hover:text-white'}`}
                >
                    Messages ({messages.length})
                </button>
            </div>
        </div>

        {activeTab === 'menu' && (
            <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Form */}
            <div className="bg-coffee-950 p-8 rounded-xl border border-white/5 h-fit">
                <h2 className="text-xl text-gold-500 mb-6 font-serif">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-coffee-400 uppercase mb-1">Item Name</label>
                    <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-coffee-900 border border-coffee-800 rounded p-2 text-white focus:border-gold-500 outline-none"
                    required
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-xs text-coffee-400 uppercase mb-1">Price ($)</label>
                    <input 
                        type="number" 
                        step="0.01"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full bg-coffee-900 border border-coffee-800 rounded p-2 text-white focus:border-gold-500 outline-none"
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-xs text-coffee-400 uppercase mb-1">Category</label>
                    <select 
                        value={category}
                        onChange={e => setCategory(e.target.value as any)}
                        className="w-full bg-coffee-900 border border-coffee-800 rounded p-2 text-white focus:border-gold-500 outline-none"
                    >
                        <option value="coffee">Coffee</option>
                        <option value="bakery">Bakery</option>
                        <option value="specials">Specials</option>
                    </select>
                    </div>
                </div>

                {/* AI Generator Section */}
                <div className="bg-coffee-900/50 p-4 rounded border border-gold-500/20">
                    <label className="block text-xs text-gold-500 uppercase mb-1">Gemini AI Description Generator</label>
                    <input 
                    type="text" 
                    placeholder="e.g., roasted beans, oat milk, cinnamon" 
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    className="w-full bg-coffee-950 border border-coffee-800 rounded p-2 text-xs text-white mb-2"
                    />
                    <button 
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded transition-colors flex items-center justify-center gap-2"
                    >
                    {isGenerating ? (
                        <span className="animate-pulse">Dreaming up description...</span>
                    ) : (
                        <>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                        Generate Magic
                        </>
                    )}
                    </button>
                </div>

                <div>
                    <label className="block text-xs text-coffee-400 uppercase mb-1">Description</label>
                    <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-coffee-900 border border-coffee-800 rounded p-2 text-white focus:border-gold-500 outline-none h-24"
                    required
                    />
                </div>

                <button type="submit" className="w-full bg-gold-500 text-coffee-950 font-bold py-3 rounded hover:bg-gold-400 transition-colors">
                    Add Item
                </button>
                </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 bg-coffee-950 p-8 rounded-xl border border-white/5">
                <h2 className="text-xl text-white mb-6 font-serif">Current Menu Items</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {menuItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-coffee-900 p-4 rounded border border-coffee-800">
                    <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded object-cover" alt={item.name} />
                        <div>
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <span className="text-gold-500 text-sm">${item.price.toFixed(2)}</span>
                        <span className="text-coffee-500 text-xs ml-2 px-2 py-0.5 border border-coffee-700 rounded-full uppercase">{item.category}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => deleteMenuItem(item.id)}
                        className="text-red-400 hover:text-red-300 px-3 py-1 rounded text-sm border border-red-900 hover:bg-red-900/30"
                    >
                        Delete
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}

        {activeTab === 'messages' && (
             <div className="bg-coffee-950 p-8 rounded-xl border border-white/5">
                <h2 className="text-xl text-white mb-6 font-serif">Inbox</h2>
                {messages.length === 0 ? (
                    <p className="text-coffee-400">No messages yet.</p>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-coffee-900 rounded border border-coffee-800">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gold-500 font-bold">{msg.name}</span>
                                    <span className="text-xs text-coffee-500">{new Date(msg.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs text-coffee-400 mb-2">{msg.email}</div>
                                <p className="text-white text-sm">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                )}
             </div>
        )}
      </div>
    </div>
  );
};