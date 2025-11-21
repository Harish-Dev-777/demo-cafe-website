import React, { useState } from 'react';
import { useAppStore } from '../context/Store';
import { analyzeContactMessage } from '../services/gemini';

export const Contact = () => {
  const { addMessage } = useAppStore();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Simulate Gemini Analysis for priority (in a real app, this would flag the email sent to admin)
    await analyzeContactMessage(message);

    // Simulate API delay
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        name,
        email,
        message,
        date: new Date().toISOString()
      });
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-coffee-950 pt-32 pb-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* Left: Info */}
        <div>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">Let's Start a <br/>Conversation</h1>
          <p className="text-coffee-300 text-lg mb-12 leading-relaxed">
            Whether you want to reserve a table, inquire about our beans, or just say hello, we are always brewing something new.
          </p>

          <div className="space-y-8">
            <div>
              <h4 className="text-gold-500 uppercase tracking-widest text-xs mb-2">Visit Us</h4>
              <p className="text-white font-serif text-2xl">123 Artisan Avenue</p>
              <p className="text-white font-serif text-2xl">New York, NY 10012</p>
            </div>
            
            <div>
              <h4 className="text-gold-500 uppercase tracking-widest text-xs mb-2">Hours</h4>
              <p className="text-coffee-200">Mon - Fri: 7am - 7pm</p>
              <p className="text-coffee-200">Sat - Sun: 8am - 8pm</p>
            </div>

            <div>
              <h4 className="text-gold-500 uppercase tracking-widest text-xs mb-2">Contact</h4>
              <p className="text-coffee-200">hello@brewandbliss.com</p>
              <p className="text-coffee-200">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-coffee-900 p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden">
          
          {status === 'success' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-coffee-900 z-10 animate-fade-in">
              <div className="w-16 h-16 border-2 border-gold-500 rounded-full flex items-center justify-center mb-4 text-gold-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl text-white font-serif mb-2">Message Sent</h3>
              <p className="text-coffee-400">We'll get back to you over a cup of coffee.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-gold-500 underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gold-500 uppercase mb-2">Name</label>
                  <input name="name" type="text" required className="w-full bg-coffee-950 border-b border-coffee-700 focus:border-gold-500 px-0 py-3 text-white outline-none transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs text-gold-500 uppercase mb-2">Email</label>
                  <input name="email" type="email" required className="w-full bg-coffee-950 border-b border-coffee-700 focus:border-gold-500 px-0 py-3 text-white outline-none transition-colors" placeholder="jane@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gold-500 uppercase mb-2">Message</label>
                <textarea name="message" required rows={4} className="w-full bg-coffee-950 border-b border-coffee-700 focus:border-gold-500 px-0 py-3 text-white outline-none transition-colors resize-none" placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-white text-coffee-950 font-bold py-4 mt-4 hover:bg-gold-500 transition-colors uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};