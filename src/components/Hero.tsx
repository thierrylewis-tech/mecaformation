import React from 'react';
import { Play, CheckCircle, Users, Award } from 'lucide-react';
import AnimatedAvatar3D from './AnimatedAvatar3D';

const Hero = () => {
  return (
    <section id="accueil" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white overflow-hidden" itemScope itemType="https://schema.org/EducationalOrganization">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                <span itemProp="accreditation">Formations certifiantes reconnues par l'État</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-responsive" itemProp="name">
                Devenez Expert en
                <span className="text-orange-400 block">Mécanique Automobile</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed" itemProp="description">
                <strong>Formez-vous aux métiers d'avenir de l'automobile</strong> avec nos programmes complets : 
                <em>CAP Maintenance Véhicules, Bac Pro, formations véhicules électriques et hybrides</em>. 
                Plus de <strong>3000 apprenants formés avec succès</strong>, <strong>95% de taux de réussite</strong> 
                et <strong>87% d'insertion professionnelle</strong>.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[
                'Formation 100% à distance - Accessible partout en France',
                'Accompagnement personnalisé 24h/7j par des experts certifiés',
                'Matériel professionnel dernière génération mis à disposition',
                'Stages en entreprise garantis dans notre réseau de 500+ partenaires'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold text-lg hover:scale-105 shadow-lg will-change-transform"
                aria-label="Découvrir toutes nos formations certifiantes"
                onClick={() => document.getElementById('formations')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir nos formations
              </button>
              <button 
                className="flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg will-change-transform"
                aria-label="Regarder la vidéo de présentation"
              >
                <Play className="h-5 w-5 mr-2" />
                Voir la vidéo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8" itemScope itemType="https://schema.org/EducationalOrganization">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="successRate">95%</div>
                <div className="text-sm text-blue-200">Taux de réussite aux examens</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="alumniCount">3000+</div>
                <div className="text-sm text-blue-200">Étudiants diplômés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="employmentRate">87%</div>
                <div className="text-sm text-blue-200">Insertion professionnelle</div>
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            {/* Avatar animé 3D */}
            <AnimatedAvatar3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;