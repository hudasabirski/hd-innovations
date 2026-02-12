import React from 'react';

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-hd-base">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-hd-primary/10 pb-8">
            <div className="max-w-2xl">
                <span className="text-hd-gold text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Our Offerings</span>
                <h2 className="font-serif text-4xl md:text-5xl text-hd-primary">Channels of Delivery</h2>
            </div>
            <div className="mt-4 md:mt-0">
                <p className="text-hd-primary/70 italic">Integrating digital platforms with physical artistry.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1: Website & Digital */}
            <div className="group relative overflow-hidden bg-white shadow-lg">
                <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Digital Platform" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                    <h3 className="font-serif text-2xl text-hd-primary mb-4">Integrated Digital Platform</h3>
                    <p className="text-hd-primary/70 mb-6">
                        Seamless booking, gallery viewing, and ordering via HDinnovations.com. A fully digital experience designed for modern families.
                    </p>
                    <ul className="space-y-2 text-sm text-hd-accent">
                        <li className="flex items-center gap-2">• Online Booking System</li>
                        <li className="flex items-center gap-2">• Digital Milestone Reminders</li>
                        <li className="flex items-center gap-2">• Secure Photo Galleries</li>
                    </ul>
                </div>
            </div>

            {/* Service 2: Memory Booths */}
            <div className="group relative overflow-hidden bg-white shadow-lg">
                <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" alt="Memory Booth Concept" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                    <h3 className="font-serif text-2xl text-hd-primary mb-4">Memory Booths</h3>
                    <p className="text-hd-primary/70 mb-6">
                        Strategically placed interactive kiosks providing seamless access to our photography services and products in malls and family centers.
                    </p>
                    <ul className="space-y-2 text-sm text-hd-accent">
                        <li className="flex items-center gap-2">• Touch-free imprint creation</li>
                        <li className="flex items-center gap-2">• Instant memories</li>
                        <li className="flex items-center gap-2">• Accessible Locations</li>
                    </ul>
                </div>
            </div>

             {/* Service 3: Trade Shows & Events */}
             <div className="group relative overflow-hidden bg-white shadow-lg">
                <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop" alt="Event Photography" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                    <h3 className="font-serif text-2xl text-hd-primary mb-4">Art & Technology Events</h3>
                    <p className="text-hd-primary/70 mb-6">
                        We participate in major trade shows and art exhibitions, showcasing our fusion of traditional casting and modern imaging technology.
                    </p>
                </div>
            </div>

             {/* Service 4: 3D Casts & Frames */}
             <div className="group relative overflow-hidden bg-white shadow-lg">
                <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" alt="Framed Memories" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                    <h3 className="font-serif text-2xl text-hd-primary mb-4">Customized Heirlooms</h3>
                    <p className="text-hd-primary/70 mb-6">
                        From dermatology-certified 3D hand & feet casts to customized frames and luxury photo albums delivered to your doorstep.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};