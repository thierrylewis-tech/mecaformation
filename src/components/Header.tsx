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
      <header className="bg-white shadow-lg sticky top-0 z-50" role="banner">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2" itemScope itemType="https://schema.org/Organization">
              <div className="bg-blue-700 p-2 rounded-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800" itemProp="name">MécaFormation</h1>
                <p className="text-sm text-slate-600" itemProp="description">Centre de formation automobile certifié</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navigation principale">
              <a href="#accueil" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Aller à la section Accueil">Accueil</a>
              <a href="#formations" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Découvrir nos formations">Formations</a>
              <a href="#programme" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Voir nos programmes spécialisés">Programmes</a>
              <a href="#ressources" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Accéder aux ressources pédagogiques">Ressources</a>
              <a href="#temoignages" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Lire les témoignages d'étudiants">Témoignages</a>
              <a href="#actualites" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Consulter les actualités">Actualités</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-700 font-medium transition-colors" aria-label="Nous contacter">Contact</a>
              <div className="flex items-center space-x-3">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium hover:scale-105 transform" aria-label="S'inscrire maintenant">
                  Inscription Maintenant
                </button>
                <button className="border border-blue-700 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors font-medium" aria-label="Nous contacter">
                  Contactez-Nous
                </button>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-4" role="navigation" aria-label="Navigation mobile">
                <a href="#accueil" className="text-slate-700 hover:text-blue-700 font-medium">Accueil</a>
                <a href="#formations" className="text-slate-700 hover:text-blue-700 font-medium">Formations</a>
                <a href="#programme" className="text-slate-700 hover:text-blue-700 font-medium">Programmes</a>
               <a href="#ressources" className="text-slate-700 hover:text-blue-700 font-medium">Ressources</a>
                <a href="#temoignages" className="text-slate-700 hover:text-blue-700 font-medium">Témoignages</a>
                <a href="#actualites" className="text-slate-700 hover:text-blue-700 font-medium">Actualités</a>
                <a href="#contact" className="text-slate-700 hover:text-blue-700 font-medium">Contact</a>
                <div className="flex flex-col space-y-2">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium" aria-label="S'inscrire maintenant">
                    Inscription Maintenant
                  </button>
                  <button className="border border-blue-700 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors font-medium" aria-label="Nous contacter">
                    Contactez-Nous
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;