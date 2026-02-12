import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, Fingerprint, Heart, Globe, ArrowRight, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Segments } from './components/Segments';
import { Unique } from './components/Unique';
import { Partners } from './components/Partners';
import { CEO } from './components/CEO';
import { Footer } from './components/Footer';

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '#' },
    { name: 'About', path: '#about' },
    { name: 'Services', path: '#services' },
    { name: 'Segments', path: '#segments' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
           {/* Logo Icon Placeholder */}
           <div className="w-10 h-10 bg-hd-primary text-hd-base flex items-center justify-center rounded-sm">
             <span className="font-serif font-bold text-xl">HD</span>
           </div>
           <div className="flex flex-col">
             <span className={`font-serif text-xl font-bold tracking-widest ${scrolled ? 'text-hd-primary' : 'text-hd-primary'}`}>HIGH DEFINITION</span>
             <span className="text-[0.6rem] uppercase tracking-[0.2em] text-hd-accent">Innovations</span>
           </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path} 
              className={`text-sm font-medium tracking-wide hover:text-hd-gold transition-colors ${scrolled ? 'text-hd-primary' : 'text-hd-primary'}`}
            >
              {link.name.toUpperCase()}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 bg-hd-primary text-white text-sm tracking-widest hover:bg-hd-gold transition-colors duration-300">
            BOOK NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-hd-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-hd-base border-t border-hd-accent/20 py-8 px-6 shadow-lg flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path} 
              className="text-lg font-serif text-hd-primary"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="block w-full text-center py-3 bg-hd-primary text-white mt-4">
            BOOK NOW
          </a>
        </div>
      )}
    </nav>
  );
};

// Main Layout
const Layout = () => {
  return (
    <div className="min-h-screen font-sans text-hd-primary selection:bg-hd-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Unique />
        <Services />
        <Segments />
        <Partners />
        <CEO />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
