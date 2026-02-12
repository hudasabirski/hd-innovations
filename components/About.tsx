import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
             <div className="relative">
               <img 
                 src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?q=80&w=2000&auto=format&fit=crop" 
                 alt="Mother holding newborn baby in nature" 
                 className="w-full h-[600px] object-cover rounded-sm shadow-xl"
               />
               {/* Decorative border */}
               <div className="absolute top-8 left-8 w-full h-full border border-hd-primary/10 -z-10 rounded-sm"></div>
             </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-hd-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl text-hd-primary mb-8 leading-tight">
              Introduction to <br/><span className="italic text-hd-accent">High Definition</span>
            </h2>
            
            <div className="space-y-6 text-hd-primary/80 leading-relaxed font-light text-lg">
              <p>
                High Definition is a female-led photography and memory preservation brand specializing in capturing life’s most precious moments through refined digital artistry. We focus on newborns and family portraits, transforming fleeting moments into timeless memory kits, thoughtfully curated collections that preserve every detail forever, from images to imprints.
              </p>
              <p>
                Blending human emotion, originality, and modern technology, High Definition pioneers <strong className="text-hd-primary font-medium">AI-enabled memory booths</strong> that allow families to effortlessly capture, personalize, and preserve their stories through intelligent design and precision.
              </p>
              <p>
                With a vision toward 2030, we aim to bring art and technology together at scale; redefining how memories are created, experienced, and passed down. We don’t just take photographs; we turn moments into heirlooms for generations to come.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-hd-primary/10 pt-8">
               <div>
                  <h4 className="font-serif text-3xl text-hd-primary mb-2">2030</h4>
                  <p className="text-sm uppercase tracking-wider text-hd-accent">Vision Aligned</p>
               </div>
               <div>
                  <h4 className="font-serif text-3xl text-hd-primary mb-2">100%</h4>
                  <p className="text-sm uppercase tracking-wider text-hd-accent">Saudi Made</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};