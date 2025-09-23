import React from 'react';
import { Award, Shield, CheckCircle, Star, Users, Trophy, Target, Zap } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      icon: Award,
      title: "Certification Qualiopi",
      description: "Centre de formation certifié Qualiopi pour la qualité de nos formations",
      badge: "Officiel",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: Shield,
      title: "Formations Éligibles CPF",
      description: "Toutes nos formations sont éligibles au Compte Personnel de Formation",
      badge: "CPF",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Trophy,
      title: "Partenaire Constructeurs",
      description: "Partenariats officiels avec PSA, Renault, Volkswagen, BMW",
      badge: "Premium",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: Target,
      title: "Habilitations Électriques",
      description: "Formations habilitantes B0L, B1VL, B2VL pour véhicules électriques",
      badge: "Sécurité",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const achievements = [
    {
      icon: Users,
      number: "3000+",
      label: "Étudiants Diplômés",
      description: "Depuis notre création en 2008"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Taux de Réussite",
      description: "Aux examens officiels CAP/Bac Pro"
    },
    {
      icon: Target,
      number: "87%",
      label: "Insertion Professionnelle",
      description: "Dans les 6 mois après diplôme"
    },
    {
      icon: Star,
      number: "4.8/5",
      label: "Satisfaction Étudiants",
      description: "Note moyenne sur Google Reviews"
    }
  ];

  const recognitions = [
    {
      title: "Meilleur Centre de Formation Automobile 2023",
      organization: "Fédération Française de l'Automobile",
      year: "2023"
    },
    {
      title: "Prix de l'Innovation Pédagogique",
      organization: "Ministère de l'Éducation Nationale",
      year: "2022"
    },
    {
      title: "Label Excellence Formation",
      organization: "Région Île-de-France",
      year: "2023"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2" />
            Certifications & Reconnaissances
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Une Formation
            <span className="text-orange-500"> Certifiée et Reconnue</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Notre excellence reconnue par les institutions officielles et nos partenaires industriels. 
            Des certifications qui garantissent la qualité et la reconnaissance de votre formation.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${cert.color.replace('text-', 'bg-').replace('-700', '-100')}`}>
                    <IconComponent className={`h-6 w-6 ${cert.color}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.color}`}>
                    {cert.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievements Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Nos Résultats Exceptionnels</h3>
            <p className="text-slate-600">Des chiffres qui témoignent de notre excellence pédagogique</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-orange-500 group-hover:text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">{achievement.number}</div>
                  <div className="text-lg font-semibold text-slate-700 mb-2">{achievement.label}</div>
                  <div className="text-sm text-slate-500">{achievement.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recognition Awards */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Récompenses et Distinctions</h3>
            <p className="text-blue-100">Notre excellence reconnue par les institutions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recognitions.map((recognition, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-4">
                  <Trophy className="h-6 w-6 text-yellow-800" />
                </div>
                <h4 className="font-bold mb-2">{recognition.title}</h4>
                <p className="text-blue-100 text-sm mb-1">{recognition.organization}</p>
                <p className="text-blue-200 text-xs">{recognition.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Certifié Qualiopi</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Éligible CPF</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Partenaire Officiel</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Insertion Garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;