import React from 'react';
import { Mail, Phone, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-hd-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div>
                <div className="mb-6">
                    <span className="font-serif text-2xl font-bold tracking-widest block">HIGH DEFINITION</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-hd-gold">Innovations</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Redefining how memories are created, experienced, and passed down. We don’t just take photographs; we turn moments into heirlooms.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-white/60 hover:text-hd-gold"><Instagram size={20} /></a>
                    <a href="#" className="text-white/60 hover:text-hd-gold"><Facebook size={20} /></a>
                    <a href="#" className="text-white/60 hover:text-hd-gold"><Twitter size={20} /></a>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="font-serif text-lg mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm text-white/70">
                    <li><a href="#" className="hover:text-hd-gold transition-colors">Home</a></li>
                    <li><a href="#about" className="hover:text-hd-gold transition-colors">About Us</a></li>
                    <li><a href="#services" className="hover:text-hd-gold transition-colors">Services</a></li>
                    <li><a href="#segments" className="hover:text-hd-gold transition-colors">Customer Segments</a></li>
                </ul>
            </div>

            {/* Contact Info - Data from PDF */}
            <div>
                <h4 className="font-serif text-lg mb-6">Contact Us</h4>
                <ul className="space-y-4 text-sm text-white/70">
                    <li className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-hd-gold shrink-0" />
                        <div>
                            <span className="block text-xs uppercase text-white/40 mb-1">Visit Us Online</span>
                            <a href="https://hdinnov.tech" className="hover:text-white transition-colors">hdinnov.tech</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-hd-gold shrink-0" />
                         <div>
                            <span className="block text-xs uppercase text-white/40 mb-1">Call Us Today</span>
                            <a href="tel:+966500654100" className="hover:text-white transition-colors">+966 50 065 4100</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-hd-gold shrink-0" />
                        <div>
                            <span className="block text-xs uppercase text-white/40 mb-1">Email Inquiries</span>
                            <a href="mailto:hudasphotographer@gmail.com" className="hover:text-white transition-colors">hudasphotographer@gmail.com</a>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h4 className="font-serif text-lg mb-6">Stay Updated</h4>
                <p className="text-white/60 text-sm mb-4">Subscribe to receive updates on new booth locations and seasonal packages.</p>
                <form className="flex flex-col gap-2">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-hd-gold"
                    />
                    <button type="submit" className="bg-hd-gold text-hd-primary px-4 py-3 text-sm font-bold tracking-widest hover:bg-white transition-colors">
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} HD Innovations. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};
