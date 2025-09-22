import React from 'react';
import { Play, CheckCircle, Users, Award } from 'lucide-react';
import AnimatedAvatar3D from './AnimatedAvatar3D';

const Hero = () => {
  return (
    <section id="accueil" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white overflow-hidden">
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
                Formations certifiantes reconnues par l'État
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Devenez Expert en
                <span className="text-orange-400 block">Mécanique Automobile</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Formez-vous aux métiers d'avenir de l'automobile avec nos programmes complets : 
                CAP, Bac Pro, et formations spécialisées. Plus de 3000 apprenants formés avec succès.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[
                'Formation 100% à distance',
                'Accompagnement personnalisé par des experts',
                'Matériel professionnel mis à disposition',
                'Stages en entreprise garantis'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold text-lg hover:scale-105 shadow-lg">
                Découvrir nos formations
              </button>
              <button className="flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg">
                <Play className="h-5 w-5 mr-2" />
                Voir la vidéo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">95%</div>
                <div className="text-sm text-blue-200">Taux de réussite</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">3000+</div>
                <div className="text-sm text-blue-200">Diplômés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">85%</div>
                <div className="text-sm text-blue-200">Insertion pro</div>
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