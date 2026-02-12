import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

export const CEO = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/3">
                 <div className="relative">
                    {/* Placeholder for Huda Sabir */}
                    <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                        alt="Huda Sabir, CEO" 
                        className="w-full h-auto aspect-[3/4] object-cover shadow-2xl rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-hd-base -z-10"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-hd-gold -z-10"></div>
                 </div>
            </div>
            
            <div className="w-full md:w-2/3">
                <h2 className="font-serif text-4xl md:text-5xl text-hd-primary mb-2">Meet the CEO</h2>
                <h3 className="text-2xl text-hd-gold font-serif italic mb-8">Huda Sabir</h3>
                
                <div className="space-y-6 text-hd-primary/80 leading-relaxed font-light text-lg mb-8">
                    <p>
                        Huda Sabir, CEO of HD Innovations, is a leader driven by passion for creativity, storytelling, and innovation. With a Bachelor's in Photography (Hons) from the United Kingdom, research, and extensive international experience in building purpose-led brands, she has successfully transformed meaningful moments into timeless products that blend artistry with emotional value.
                    </p>
                    <p>
                        Her hands-on leadership, eye for detail, and commitment to innovation continue to shape HD Innovations as a brand that turns memories into lasting legacies.
                    </p>
                </div>

                <div className="flex gap-4">
                    <a href="#" className="p-3 bg-hd-primary text-white hover:bg-hd-gold transition-colors rounded-full">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className="p-3 bg-hd-primary text-white hover:bg-hd-gold transition-colors rounded-full">
                        <Instagram size={20} />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
