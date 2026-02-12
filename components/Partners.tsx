import React from 'react';

export const Partners = () => {
  return (
    <section className="py-16 bg-hd-base border-t border-hd-primary/5">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-sm font-bold tracking-[0.2em] text-hd-accent uppercase mb-12">Strategic Partners</h3>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text representations styled to look like logos since we don't have SVGs */}
            
            <div className="text-2xl font-bold font-sans tracking-tight text-hd-primary">
                Cenomi
            </div>

            <div className="flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-blue-900">IMC</span>
                <span className="text-[0.6rem] uppercase tracking-wider text-blue-900">International Medical Center</span>
            </div>

            <div className="flex flex-col items-start">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 border-2 border-green-700 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-green-700">AP</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-green-800 leading-none">Alandalus</span>
                        <span className="text-sm text-green-700 leading-none">Property</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};
