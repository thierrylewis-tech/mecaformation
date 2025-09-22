import React, { useState } from 'react';
import { Menu, X, Wrench, Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-slate-800 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+33 6 89 45 72 31</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>contact@mecaformation.fr</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Formation à distance • Toute la France</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 p-2 rounded-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">MécaFormation</h1>
                <p className="text-sm text-slate-600">Centre de formation automobile</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Accueil</a>
              <a href="#formations" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Formations</a>
              <a href="#programme" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Programme</a>
              <a href="#ressources" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Ressources</a>
              <a href="#temoignages" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Témoignages</a>
              <a href="#actualites" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Actualités</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-700 font-medium transition-colors">Contact</a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Demander une info
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-4">
                <a href="#accueil" className="text-slate-700 hover:text-blue-700 font-medium">Accueil</a>
                <a href="#formations" className="text-slate-700 hover:text-blue-700 font-medium">Formations</a>
                <a href="#programme" className="text-slate-700 hover:text-blue-700 font-medium">Programme</a>
               <a href="#ressources" className="text-slate-700 hover:text-blue-700 font-medium">Ressources</a>
                <a href="#temoignages" className="text-slate-700 hover:text-blue-700 font-medium">Témoignages</a>
                <a href="#actualites" className="text-slate-700 hover:text-blue-700 font-medium">Actualités</a>
                <a href="#contact" className="text-slate-700 hover:text-blue-700 font-medium">Contact</a>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium w-fit">
                  Demander une info
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;