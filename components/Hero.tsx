import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image - Split design similar to PDF */}
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row">
         {/* Left Side (Image on Mobile, Left on Desktop) */}
         <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1977&auto=format&fit=crop" 
              alt="Newborn baby sleeping peacefully" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
         </div>
         
         {/* Right Side (Color Block) */}
         <div className="w-full md:w-1/2 h-1/2 md:h-full bg-hd-base order-2 md:order-2 flex items-center justify-center p-8 md:p-16 lg:p-24">
            <div className="max-w-xl animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6 text-hd-accent">
                    <span className="w-8 h-[1px] bg-hd-accent"></span>
                    <span className="text-sm font-medium tracking-widest uppercase">High Definition</span>
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-hd-primary">
                  Where memories <br/>
                  <span className="italic">become heirlooms.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-hd-primary/80 font-light mb-10 border-l-2 border-hd-gold pl-6">
                  Crafted and digitalized.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-hd-primary text-white tracking-widest hover:bg-hd-primary/90 transition-all duration-300 group">
                    START YOUR JOURNEY
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#services" className="inline-flex items-center justify-center px-8 py-4 border border-hd-primary text-hd-primary tracking-widest hover:bg-hd-primary hover:text-white transition-all duration-300">
                    OUR SERVICES
                  </a>
                </div>
            </div>
         </div>
      </div>
      
      {/* Presenter Tag from PDF */}
      <div className="absolute bottom-8 right-8 md:right-auto md:left-[55%] z-10 text-hd-primary hidden md:block">
        <p className="text-xs font-bold uppercase tracking-widest mb-1">Presented By</p>
        <p className="text-sm font-serif italic">High Definition Team</p>
      </div>
    </section>
  );
};
