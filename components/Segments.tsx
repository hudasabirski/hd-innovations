import React from 'react';

export const Segments = () => {
  const segments = [
    {
        title: "New Parents",
        subtitle: "Cherishing milestones",
        image: "https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Families",
        subtitle: "Creating memories",
        image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Couples",
        subtitle: "Valuing unique gifts",
        image: "https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2072&auto=format&fit=crop"
    },
    {
        title: "Tourists",
        subtitle: "Collecting Saudi Made Souvenirs",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Elderly Loved Ones",
        subtitle: "Preserving legacies",
        image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="segments" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-hd-primary mb-4">Customer Segments</h2>
            <p className="text-lg text-hd-accent font-light">Who we serve with our artistry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {segments.map((segment, index) => (
                <div key={index} className="group relative h-96 overflow-hidden cursor-pointer">
                    <img 
                        src={segment.image} 
                        alt={segment.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-serif text-xl md:text-2xl mb-1">{segment.title}</h3>
                        <p className="text-white/80 text-xs tracking-widest uppercase">{segment.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};