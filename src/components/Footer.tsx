import React from 'react';
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: "Nos formations", href: "#formations" },
    { name: "Programme détaillé", href: "#programme" },
    { name: "Témoignages", href: "#temoignages" },
    { name: "Actualités", href: "#actualites" },
    { name: "Contact", href: "#contact" }
  ];

  const formations = [
    { name: "CAP Maintenance Véhicules", href: "#" },
    { name: "Bac Pro Automobile", href: "#" },
    { name: "Diagnostic Électronique", href: "#" },
    { name: "Véhicules Électriques", href: "#" },
    { name: "Formation Continue", href: "#" }
  ];

  const resources = [
    { name: "Guide d'orientation", href: "#" },
    { name: "Financement formation", href: "#" },
    { name: "Stages entreprises", href: "#" },
    { name: "Insertion professionnelle", href: "#" },
    { name: "Partenaires", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Logo and description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">MécaFormation</h3>
                  <p className="text-slate-400 text-sm">Centre de formation automobile</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Leader de la formation en mécanique automobile depuis plus de 15 ans. 
                Nous accompagnons vos projets professionnels avec des formations certifiantes 
                et un suivi personnalisé.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <Phone className="h-4 w-4 mr-3 text-orange-500" />
                  +33 6 89 45 72 31
                </div>
                <div className="flex items-center text-slate-300">
                  <Mail className="h-4 w-4 mr-3 text-orange-500" />
                  contact@mecaformation.fr
                </div>
                <div className="flex items-center text-slate-300">
                  <MapPin className="h-4 w-4 mr-3 text-orange-500" />
                  45 Avenue de la République, 75011 Paris • Formation à distance
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formations */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Formations</h4>
              <ul className="space-y-3">
                {formations.map((formation, index) => (
                  <li key={index}>
                    <a 
                      href={formation.href} 
                      className="text-slate-300 hover:text-orange-400 transition-colors flex items-center"
                    >
                      {formation.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Ressources</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.href} 
                      className="text-slate-300 hover:text-orange-400 transition-colors"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="py-8 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Restez informés</h4>
              <p className="text-slate-300">
                Recevez nos actualités et conseils pour réussir votre formation automobile.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium whitespace-nowrap">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social links */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">Suivez-nous :</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="bg-slate-800 p-2 rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            {/* Copyright and links */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
              <div>
                © 2024 MécaFormation. Tous droits réservés.
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">CGV</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications badge */}
      <div className="bg-slate-800 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-400 text-sm">
            <span className="inline-flex items-center">
              🏆 Formations éligibles CPF • Partenaire officiel des constructeurs automobiles • Excellence pédagogique reconnue
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;