import React from 'react';
import { Sparkles, Camera, Fingerprint, Award, MonitorSmartphone, Gift } from 'lucide-react';

export const Unique = () => {
  const features = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-hd-gold" />,
      title: "Fully Digital Experience",
      description: "Enjoy a seamless process with online booking, payment, and delivery of memories."
    },
    {
      icon: <Camera className="w-8 h-8 text-hd-gold" />,
      title: "Luxury Photography",
      description: "High-quality portraits and keepsakes designed to evoke deep emotional connections."
    },
    {
      icon: <Fingerprint className="w-8 h-8 text-hd-gold" />,
      title: "3D Hand & Feet Casts",
      description: "Preserve cherished moments with unique, personalized keepsakes for all ages."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-hd-gold" />,
      title: "Interactive Memory Booths",
      description: "Experience quick, touch-free imprint creation at convenient locations for instant memories."
    },
    {
      icon: <Award className="w-8 h-8 text-hd-gold" />,
      title: "Female-Led Brand",
      description: "Our brand champions creativity and authenticity through the vision of talented women."
    },
    {
      icon: <Gift className="w-8 h-8 text-hd-gold" />,
      title: "Attraction for Tourists",
      description: "Unique keepsakes delivered internationally & locally as Saudi made souvenirs."
    }
  ];

  return (
    <section className="py-20 bg-hd-primary text-hd-base">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="font-serif text-4xl md:text-5xl mb-6">What Makes Us Unique</h2>
           <p className="text-hd-base/70 font-light text-lg">Combining traditional artistry with cutting-edge technology to preserve your legacy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start p-6 hover:bg-white/5 transition-colors rounded-sm border border-white/10 group">
              <div className="mb-4 p-3 bg-white/10 rounded-full group-hover:bg-hd-gold group-hover:text-hd-primary transition-colors">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-xl font-serif mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-hd-base/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
