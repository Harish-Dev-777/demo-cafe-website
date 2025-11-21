import React from 'react';

export const About = () => {
  return (
    <div className="min-h-screen bg-coffee-950 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <p className="text-gold-500 uppercase tracking-widest mb-6">Since 2024</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-12">The Art of Slow Living</h1>
        
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-16">
           <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Cafe interior" />
        </div>

        <div className="prose prose-invert prose-lg mx-auto text-coffee-200">
          <p>
            Brew & Bliss began with a simple idea: that coffee should be an experience, not just a routine. 
            We traveled the world, from the misty mountains of Ethiopia to the bustling cafes of Melbourne, 
            in search of the perfect cup.
          </p>
          <p>
            Our philosophy is rooted in sustainability and craftsmanship. We work directly with farmers 
            who share our passion for quality, ensuring that every bean is treated with respect from 
            crop to cup.
          </p>
        </div>
      </div>
    </div>
  );
};